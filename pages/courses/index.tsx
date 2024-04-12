import { useCallback, useEffect, useState } from "react";
import { Text, Dialog, DialogType, DialogFooter, SearchBox, ISearchBoxStyles } from '@fluentui/react';
import { IconButton, IIconProps, ITooltipHostStyles, Link, PrimaryButton, TooltipHost, useTheme } from '@fluentui/react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getDegreesForSearchBox } from '../../services/Requests';
import { bold, semibold } from '../../services/Fonts';
import { ISuggestionItem } from '../../components/Courses/Autocomplete_types';
import { useBoolean } from "@fluentui/react-hooks";
import { NextSeo } from 'next-seo';
import { LocalizedField } from "models/Models";
import { NextPage } from "next";
import * as Scroll from 'react-scroll';
import * as animationData from '../../components/Courses/Lottie/128040-searching.json';
import Lottie from 'lottie-react';
import LocalizationService from "../../services/LocalizationService";
import JsxParser from "react-jsx-parser";
import Marquee from "react-fast-marquee";
import Chip from "components/Atoms/Chip";
import DegreesResult from "components/Courses/DegreesResult";
import GroupTypes from "components/Atoms/GroupTypes";
import Image from 'next/image';

const Courses: NextPage = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();
    let router = useRouter();

    const debouncingTime = 500;

    const resetIcon: IIconProps = { iconName: 'AiOutlineReload' };
    const calloutProps = { gapSpace: 10 };
    const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

    /* States */
    const [hideApiErrorDialog, { toggle: toggleApiErrorDialog }] = useBoolean(true);
    const [degreeTextSearch, setDegreeTextSearch] = useState<string>('');
    const [debouncedSearchText, setDebouncedSearchText] = useState(degreeTextSearch);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchData, setSearchData] = useState<ISuggestionItem[]>([]);
    const [errorLoadingDegrees, setErrorLoadingDegrees] = useState<boolean>(false);

    /* Scroll to search box after click on it */
    const [windowWidth, setWindowWidth] = useState<number>(0);

    useEffect(() => { setWindowWidth(window.innerWidth); }, []);

    var Element = Scroll.Element;
    var scroller = Scroll.scroller;

    const scrollToSearchBox = () => {
        scroller.scrollTo('searchBoxElement', {
            duration: 500,
            delay: 100,
            smooth: true,
            offset: -20
        });
    };

    /* Debouncing stuff */ 
    useEffect(() => {
        if (debouncedSearchText === '') setSearchData([]);
        setIsSearching(true);
        const timer = setTimeout(() => setDegreeTextSearch(debouncedSearchText), debouncingTime);
        return () => clearTimeout(timer);
    }, [debouncedSearchText]);

    useEffect(() => {
        if(degreeTextSearch !== '') {
            updateDegreesForSearchBox(degreeTextSearch);
        }
        else{
            setSearchData([]);
        }
    }, [degreeTextSearch]);

    /* Handlers */
    const entitySelectHandler = (item: ISuggestionItem): void => {
        router.push(`/courses/${item.degree?.slug}`);
    };
    
    const searchTextHandler = (): void => {
        if (searchData.length === 0) return;
        router.push(`/courses/${searchData[0]?.degree?.slug}`);
    };

    /* Degrees API call for the SearchBox result */
    const updateDegreesForSearchBox = useCallback(async (searchBoxText: string) => {
        setDegreeTextSearch(searchBoxText);
        
        if (searchBoxText === "" || !searchBoxText) {
            setSearchData([]);
            return;
        } 

        let degreesResult = await getDegreesForSearchBox(searchBoxText);

        if (degreesResult.error) {
            setErrorLoadingDegrees(true);
            toggleApiErrorDialog();
            return;
        }

        let tempSearchData : ISuggestionItem[] = [];

        (degreesResult.value ?? []).map(x => {
            return tempSearchData.push({degree: x, key: x.pk, displayValue: x.name!, searchValue: x.name!});
        });

        setSearchData(tempSearchData ?? []);
        setIsSearching(false);
    }, [toggleApiErrorDialog]);

    const resetSection = () => { 
        setDegreeTextSearch(''); 
        setDebouncedSearchText('');
        setErrorLoadingDegrees(false);
    };

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const iconProps: IIconProps = { iconName: 'GroupsSearch' };
    const searchBoxStyle = {
        padding: '15px 20px',
        borderRadius: 20,
        backgroundColor: theme.palette.neutralLighterAlt
    };
    const searchBoxStyles: ISearchBoxStyles = {
        root: {
            backgroundColor: theme.palette.neutralLighterAlt
        }
    };

    const modelProps = { isBlocking: false };
    const dialogContentProps = {
        type: DialogType.largeHeader,
        title: locale?.serverError
    };

    const chips: Array<{label: LocalizedField}> = [
        { label: { it: "Gruppi dei corsi di laurea", en: "Degree groups" } },
        { label: { it: "Gruppi dei corsi didattici", en: "Teaching course groups" } },
        { label: { it: "Siti web dei corsi", en: "Course websites" } },
        { label: { it: "Informazioni sui docenti", en: "Informations on professors" } },
        { label: { it: "Collegamenti del corso di laurea", en: "Degree redirects and connections" } },
        { label: { it: "Amministratori del network", en: "Network administrators" } },
        { label: { it: "Le nostre pagine wiki", en: "Our wiki pages" } },
    ];

    return (
        <>
            <NextSeo
                title={locale?.helmet.courses.title}
                description={locale?.helmet.courses.description}
                canonical={"https://studentiunimi.it/courses"}
                openGraph={{
                    url: "https://studentiunimi.it/courses",
                    title: locale?.helmet.courses.title,
                    description: locale?.helmet.courses.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/courses.png',
                            type: 'image/png',
                        }
                    ],
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
            />

            <section className="courses">
                <div className="pt-5">
                    <Container>
                        <div className="mb-4">
                            <div className="mb-2 text-center text-mega">
                                <h1>
                                    <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.courses.title} />
                                </h1>
                            </div>

                            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                                <Marquee direction={"right"} gradient={false} speed={15}>
                                    {chips.map((x:any,i:number) =>(
                                        <Text styles={semibold} key={i}>
                                            <Chip 
                                                label={x.label[language!]} 
                                                theme={theme}
                                                size="small" 
                                                outlined 
                                                textColor={theme.palette.neutralPrimary} 
                                                className="mr-1" 
                                            />
                                        </Text>
                                    ))}
                                </Marquee>
                            </div>
                        </div>

                        {/* @ts-ignore */}
                        <Element name="searchBoxElement">
                            <div className="search-box" style={searchBoxStyle}>
                                <SearchBox 
                                    placeholder={locale?.courses.findDegreeByName} 
                                    underlined={true} 
                                    iconProps={iconProps}
                                    theme={theme}
                                    styles={searchBoxStyles}
                                    value={debouncedSearchText ?? ""}
                                    onSearch={searchTextHandler}
                                    onChange={(ev) => setDebouncedSearchText(ev?.target.value!)}
                                    onClear={() => { setDegreeTextSearch(""); setSearchData([]); }}
                                    onClick={() => { if (windowWidth <= 768) scrollToSearchBox() }}
                                    disabled={errorLoadingDegrees}
                                />
                            </div>
                        </Element>

                        {debouncedSearchText &&
                            isSearching ? 
                                <div className="text-center mt-4 mb-4">
                                    {/* @ts-ignore */} 
                                    <Lottie options={defaultOptions}
                                        height={200}
                                        width={200}
                                        isClickToPauseDisabled={true}
                                        style={{ cursor: 'default' }}
                                    />
                                    <Text styles={semibold}>{locale?.courses.searchingDegrees}</Text>
                                </div>
                            :
                            <DegreesResult 
                                degrees={searchData}
                                searchText={debouncedSearchText}
                                error={errorLoadingDegrees}
                                onElementClick={(item) => entitySelectHandler(item)}
                            />
                        }

                        {errorLoadingDegrees && 
                            <div className="mt-2 text-center d-flex flex-row align-items-center justify-content-center" style={{ gap: 10 }}>
                                <Text variant="medium" styles={semibold} style={{ color: theme.palette.red }}>{locale?.errorDataLoading}</Text>
                                <TooltipHost
                                    content={locale?.courses.resetSection}
                                    calloutProps={calloutProps}
                                    styles={hostStyles}
                                >
                                    <IconButton iconProps={resetIcon} onClick={resetSection} />
                                </TooltipHost>
                            </div> 
                        }

                    </Container>
                </div>

                <div className="pt-1 pb-5">
                        <Container> 
                            <div className="text-center">
                                <div className="mb-4">
                                    <Text variant="xLargePlus">{locale?.courses.otherGroups}</Text>
                                </div>

                                <GroupTypes page="courses" />
                            </div>
                        </Container>
                    </div>

                {/* APIs Error dialog */}
                <Dialog
                    hidden={hideApiErrorDialog}
                    onDismiss={toggleApiErrorDialog}
                    dialogContentProps={dialogContentProps}
                    modalProps={modelProps}
                >
                    <div className="mb-3">
                        {locale?.errorDataLoading}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
                        <Image 
                            src={'/images/message/error.png'} 
                            alt="Server error" 
                            width={250}
                            height={250} 
                        />
                    </div>

                    <div>
                        <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.additionalInformations} />
                    </div>

                    <DialogFooter>
                        <PrimaryButton onClick={toggleApiErrorDialog} text="Ok" />
                    </DialogFooter>
                </Dialog>
            </section>
        </>
    );
};

export default Courses;