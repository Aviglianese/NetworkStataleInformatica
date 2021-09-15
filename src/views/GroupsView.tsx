import React from "react";
import { Text } from 'office-ui-fabric-react';
import { initializeIcons } from "@uifabric/icons";
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@fluentui/react-theme-provider';
import { getCourses, getVerboseDegreeBySlug, getVerboseDegreeByID, getDegreesForSearchBox } from '../services/Requests';
import { Separator } from '@fluentui/react/lib/Separator';
import { semibold } from '../services/fonts';
import { VerboseDegree, CourseDegree } from "../models/Models";
import GroupList from "../components/Groups/GroupList";
import LocalizationService from "../services/LocalizationService";
import DegreeInformations from "../components/Groups/DegreeInformations";
import AdminsList from '../components/Groups/AdminsList';
import AdditionalGroupsView from '../components/Groups/AdditionalGroups';
import { Autocomplete } from '../components/Groups/Autocomplete';
import { ISuggestionItem } from '../components/Groups/Autocomplete_types';
import { Helmet } from "react-helmet";

initializeIcons();

interface reactHelmetContent {
    title: string,
    description: string,
    href: string
}

/* Returns degree type (name) */
const getDegreeTypeName = (type: string): string => {
    switch (type) {
        case 'B':
            return 'triennale';
        case 'M':
            return 'magistrale';
        case 'C':
            return 'magistrale a ciclo unico';
    }
    return '';
}

const GroupsView = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    let history = useHistory();
    let didMount = React.useRef(false);

    /* States */
    let [degreeTextSearch, setDegreeTextSearch] = React.useState(''); // Testo nel campo di ricerca
    let [loadedDegree, setLoadedDegree] = React.useState<VerboseDegree | null>(null); // Degree da passare ai vari componenti (DegreeInformations e AdminsList)
    let [selectedDegree, setSelectedDegree] = React.useState<string>(''); // PK del Degree
    let [searchData, setSearchData] = React.useState<ISuggestionItem[]>([]); // Array di ISuggestionItem (contenente anche Degree per ogni elemento)
    let [courses, setCourses] = React.useState<CourseDegree[]>([]); // Corsi di insegnamento
    let [reactHelmetContent, setReactHelmetContent] = React.useState<reactHelmetContent>(
        { title: locale.helmet.courses.title, description: locale.helmet.courses.description, href: 'https://studentiunimi.it/courses/'}
    );

    const [loadingCourses, setLoadingCourses] = React.useState<boolean>(false);
    //const [errorLoadingDegrees, setErrorLoadingDegrees] = React.useState<boolean>(false);
    const [errorLoadingCourses, setErrorLoadingCourses] = React.useState<boolean>(false);

    /* Handlers */
    const entitySelectHandler = (item: ISuggestionItem): void => { // Questo viene triggerato quando selezioni qualcosa dal menù
        setDegreeTextSearch(item.displayValue);
        setSelectedDegree(item.key as unknown as string);
        //setLoadedDegree(searchData.filter(x => x.degree?.pk === selectedDegree as unknown as number)[0]?.degree!);
        history.push(`/courses/${item.degree?.slug}`);
    };
    
    const searchTextHandler = (): void => { // Triggerato quando premi per la ricerca (si è deciso di selezionare il primo risultato)
        if (searchData.length === 0) return;
        setDegreeTextSearch(searchData[0]?.displayValue);
        setSelectedDegree(searchData[0]?.key as unknown as string);
        //setLoadedDegree(searchData.filter(x => x.degree?.pk === selectedDegree as unknown as number)[0]?.degree!);
        history.push(`/courses/${searchData[0]?.degree?.slug}`);
    };


    /* Degrees for the SearchBox */
    const updateDegreesForSearchBox = React.useCallback(async (searchBoxText: string) => {
        console.log("Stai cercando: ", searchBoxText)
        setDegreeTextSearch(searchBoxText)
        if (searchBoxText === undefined || searchBoxText === "") return;
        let degreesResult = await getDegreesForSearchBox(searchBoxText);

        if (degreesResult.status !== 200) {
            console.error("error on degrees result by searchbox text");
            return;
        }

        let tempSearchData : ISuggestionItem[] = [];
        //console.log("degrees result searchbox: ", degreesResult.value ?? []);

        (degreesResult.value ?? []).map(x => {
            return tempSearchData.push({degree: x, key: x.pk, displayValue: x.name!, searchValue: x.name!});
        });

        setSearchData(tempSearchData ?? []);
    }, []);

    /* Courses callBack */
    const updateCourses = React.useCallback(async () => {
        if (selectedDegree === '' || selectedDegree === undefined) return;
        setErrorLoadingCourses(false);
        setLoadingCourses(true);
        let coursesResult = await getCourses(selectedDegree);

        if (coursesResult.status !== 200) {
            setLoadingCourses(false);
            setErrorLoadingCourses(true);
            return;
        }
        
        console.log("Courses result: ", coursesResult.value ?? []);
        console.log("Gruppo principale da aggiungere: ", loadedDegree, loadedDegree?.group)
        if (loadedDegree !== undefined && loadedDegree?.group?.invite_link !== '' && loadedDegree?.group?.invite_link !== null && loadedDegree?.group?.invite_link !== undefined) {
            let mainDegreeGroup: CourseDegree = {
                "course": {
                    pk: undefined,
                    name: "Gruppo principale",
                    cfu: 0,
                    wiki_link: "",
                    links: [],
                    group: { 
                        id: loadedDegree?.group?.id!,
                        title: loadedDegree?.group?.title,
                        profile_picture: loadedDegree?.group?.profile_picture,
                        invite_link: loadedDegree?.group?.invite_link
                    },
                },
                year: -1,
                semester: 0
            };
            coursesResult.value?.unshift(mainDegreeGroup);
        }

        setCourses(coursesResult.value ?? []);
        setLoadingCourses(false);
        setReactHelmetContent({
            title: locale.helmet.degreeLoaded.title1 + `${loadedDegree?.name} (${getDegreeTypeName(loadedDegree?.type!)})` + locale.helmet.degreeLoaded.title2, 
            description: locale.helmet.degreeLoaded.description1 + `${loadedDegree?.name} (${getDegreeTypeName(loadedDegree?.type!)})` + locale.helmet.degreeLoaded.description2, 
            href: `https://studentiunimi.it/courses/${loadedDegree?.slug}`
        });
    }, [selectedDegree, loadedDegree, locale.helmet.degreeLoaded.description1, locale.helmet.degreeLoaded.description2, locale.helmet.degreeLoaded.title1, locale.helmet.degreeLoaded.title2]);

    
    /* This function initializes the VerboseDegree (retrieves degree based on url initialization) */
    const initializeDegreeByUrl = React.useCallback(async () => {
        if (!didMount.current) {
            didMount.current = true;
            console.log("MOUNTING")
            var states = history.location.pathname.substring(1).split('/').filter(x => x !== '');
            var degreeSlug = states.length >= 2 ? states[1] : '';
            
            console.log("Degree slug: ", degreeSlug)
            
            if (degreeSlug === '') {
                return;
            }

            let verboseDegreeResult = await getVerboseDegreeBySlug(degreeSlug);
            
            if (verboseDegreeResult.status !== 200) {
                // Do we need to show an apposite error? Probably not
                return;
            }

            const verboseDeg = verboseDegreeResult.value ?? undefined;
            if (verboseDeg === undefined || verboseDeg === null) return;
            //console.log("VerboseDegree result: ", verboseDeg, " I'm setting selectedDegree key .. (" + verboseDeg.pk! + ").");
            setSelectedDegree(verboseDeg.pk! as unknown as string);
            //setDegreeTextSearch(verboseDeg.name!)

            setReactHelmetContent({
                title: locale.helmet.degreeLoaded.title1 + `${verboseDeg?.name} (${getDegreeTypeName(verboseDeg?.type!)})` + locale.helmet.degreeLoaded.title2, 
                description: locale.helmet.degreeLoaded.description1 + `${verboseDeg?.name} (${getDegreeTypeName(verboseDeg?.type!)})` + locale.helmet.degreeLoaded.description2, 
                href: `https://studentiunimi.it/courses/${verboseDeg?.slug}`
            });
        }
    }, [history.location.pathname, locale.helmet.degreeLoaded.description1, locale.helmet.degreeLoaded.description2, locale.helmet.degreeLoaded.title1, locale.helmet.degreeLoaded.title2]);

    const updateLoadedDegree = React.useCallback(async () => {
        if (selectedDegree === null || selectedDegree === undefined || selectedDegree === "") return;
        let degreeResult = await getVerboseDegreeByID(selectedDegree);
        if (degreeResult.status !== 200) return;

        const degree = degreeResult.value ?? undefined;
        if (degree === undefined || degree === null) return;
        console.log("Degree loaded: ", degree);

        setLoadedDegree(degree);
    }, [selectedDegree]);
    
    React.useEffect(() => {
        if (!didMount.current) initializeDegreeByUrl();      
    }, [searchData, loadedDegree, selectedDegree, initializeDegreeByUrl]);

    React.useEffect(() => {
        updateCourses();
    }, [selectedDegree, loadedDegree, updateCourses]);

    React.useEffect(() => {
        updateLoadedDegree();
    }, [selectedDegree, updateLoadedDegree])

    return (
        <>
        <Helmet>
            <meta charSet="utf-8" />
            <title>{reactHelmetContent.title}</title>
            <meta name="description" content={reactHelmetContent.description} />
            <link rel="canonical" href={reactHelmetContent.href} />
        </Helmet>
        <div className="pt-5 courses">
            <Container>
                <div className="mb-3">
                    <div className="mb-1"><Text variant="medium" styles={semibold} style={{textTransform: 'uppercase', color: theme.palette.themePrimary}}>{locale.groups.groupsSection.text1}</Text></div>
                    <Text variant="xLarge">{locale.groups.groupsSection.text2}</Text>
                </div>

                <div className="search-box mb-4">
                    <Autocomplete
                        items={searchData}
                        searchTitle={locale.groups.findDegreeByName}
                        suggestionCallback={(item) => entitySelectHandler(item)}
                        searchCallback={searchTextHandler}
                        changeCallback={(text) => updateDegreesForSearchBox(text)}
                        value={degreeTextSearch}
                    />
                </div>

            </Container>

            <div style={{ display: selectedDegree !== '' ? 'block' : 'none' }}>
                <GroupList degree={loadedDegree!} courses={courses} loadingCourses={loadingCourses} errorLoadingCourses={errorLoadingCourses} />
                <DegreeInformations degree={loadedDegree!} />
                <AdminsList degree={loadedDegree!} />       
            </div>

            <Container className="pb-4">
                <Separator className="mb-3" />
                <div className="mb-3">
                    <div className="mb-1"><Text variant="medium" styles={semibold} style={{ textTransform: 'uppercase', color: theme.palette.themePrimary }}>{locale.groups.extraGroupsSection.text1}</Text></div>
                    <Text variant="xLarge">{locale.groups.extraGroupsSection.text2}</Text>
                </div>

                <AdditionalGroupsView />

            </Container>
        </div>
        </>
    );
};

export default GroupsView;