import { useRef, useEffect, useState, useCallback } from "react";
import { NextSeo } from 'next-seo';
import { Container } from 'react-bootstrap';
import { Text, Icon, Dropdown, IDropdownOption, useTheme, PrimaryButton, Separator, Link } from '@fluentui/react';
import { getRepresentatives, getDepartments, getUniversityLinks } from '../services/Requests'
import { Department, LocalizedField, Representative } from '../models/Models';
import { bold, semibold } from "../services/Fonts";
import Lottie from 'lottie-react';
import * as lottieMap from '../components/University/Lottie/47956-area-map.json';
import * as lottieGraduations from '../components/University/Lottie/45535-girl-meditating.json';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LocalizationService from "../services/LocalizationService";
import RepresentativesList from '../components/University/RepresentativesList';
import Marquee from "react-fast-marquee";
import Chip from "components/Atoms/Chip";
import ItemsGroup, { Item } from "components/Atoms/ItemsGroup";
import JsxParser from "react-jsx-parser";
import UniversityLink from "models/UniversityLink";

const University = () => {
    var theme = useTheme();
    let didMount = useRef(false);
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();
    
    const universityLinks: Array<UniversityLink> = getUniversityLinks();

    const items: Item[] = universityLinks.map((x) => ({
        name: x.name,
        href: x.link,
        iconName: x.icon
    }));

    const mapOptions = {
      loop: true,
      autoplay: true, 
      animationData: lottieMap,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const graduationsOptions = {
      loop: true,
      autoplay: true, 
      animationData: lottieGraduations,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const buttonStyle = { boxShadow: theme.effects.elevation8 };

    const chips: Array<{label: LocalizedField}> = [
        { label: { it: "Collegamenti legati all'ateneo", en: "University-related links" } },
        { label: { it: "Mense", en: "Dining halls" } },
        { label: { it: "Biblioteche", en: "Libraries" } },
        { label: { it: "Dipartimenti", en: "Departments" } },
        { label: { it: "Centri sportivi", en: "Sports centers" } },
        { label: { it: "Giardini e cortili", en: "Gardens and courtyards" } },
        { label: { it: "Rappresentanti degli studenti", en: "Student representatives" } }
    ];
    
    /* States */
    const [departments, setDepartments] = useState<Department[]>([]);
    const [representatives, setRepresentatives] = useState<Representative[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');

    const [loadingRepresentatives, setLoadingRepresentatives] = useState<boolean>(false);
    const [errorLoadingRepresentatives, setErrorLoadingRepresentatives] = useState<boolean>(false);
    const [errorLoadingDepartments, setErrorLoadingDepartments] = useState<boolean>(false);

    const departmentSelectionChanged = (_?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IDropdownOption): void => {
        setSelectedDepartment(option?.key as string ?? '');
    };

    /* Departments callBack */
    const updateDepartments = useCallback(async () => {
        setErrorLoadingDepartments(false);
        let departmentsResult = await getDepartments();

        if (departmentsResult.error) {
            setErrorLoadingDepartments(true);
            return;
        }

        setDepartments(departmentsResult.value ?? []);
    }, []);

    /* Representatives callBack */
    const updateRepresentatives = useCallback(async () => {
        if (selectedDepartment === '' || selectedDepartment === undefined) return;
        setLoadingRepresentatives(true);
        setErrorLoadingRepresentatives(false);
        let representativesResult = await getRepresentatives(selectedDepartment);

        if (representativesResult.error) {
            setLoadingRepresentatives(false);
            setErrorLoadingRepresentatives(true);
        }

        setLoadingRepresentatives(false);
        setRepresentatives(representativesResult.value ?? []);
    }, [setRepresentatives, selectedDepartment]);

    useEffect(() => {
        if (!didMount.current) {
            updateDepartments();
        }
    }, [updateDepartments]);

    useEffect(() => {
        updateRepresentatives();
    }, [selectedDepartment, updateRepresentatives]);

    let departmentOptions: IDropdownOption[] = [];
    
    departments.forEach(x => {
        if (x.representative_count !== 0) departmentOptions.push({ key: x.pk, text: x.name ?? "", data: { icon: x.icon, slug: x.slug }, disabled: x.representative_count === 0 });
    });

    return (
        <>
            <NextSeo
                title={locale?.helmet.university.title}
                description={locale?.helmet.university.description}
                canonical={"https://studentiunimi.it/university"}
                openGraph={{
                    url: "https://studentiunimi.it/university",
                    title: locale?.helmet.university.title,
                    description: locale?.helmet.university.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/university.png',
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
            
            <section className="university">

                <div className="pt-5 pb-5 text-center" style={{ backgroundColor: theme.palette.neutralLighter }}>
                    <Container>
                        <div className="text-mega mb-2">
                            <h1>
                                <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.university.title} />
                            </h1>
                        </div>

                        <div style={{ maxWidth: 600, margin: '0 auto' }}>
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
                    </Container>
                </div>

                <div className="pt-5 pb-5" id={'graduations'}>
                    <Container>  
                        <Row>
                            <Col xl={9} lg={9} md={8} className="mb-3 mb-lg-0">
                                <div className="mb-2">
                                    <Text variant="xLargePlus">{locale?.university.graduations.title}</Text>
                                </div>

                                <div className="mb-3">
                                    <Text variant="large">{locale?.university.graduations.description}</Text>
                                </div>

                                <PrimaryButton 
                                    text={locale?.university.graduations.button} 
                                    style={buttonStyle} 
                                    href={'https://t.me/graduatorieUniMi'} 
                                />
                            </Col>

                            <Col xl={3} lg={3} md={4} className="text-center">
                                {/* @ts-ignore */} 
                                <Lottie options={graduationsOptions}
                                    height={200}
                                    width={200}
                                    isClickToPauseDisabled={true}
                                    style={{ cursor: 'default' }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Separator />

                <div className="pt-5 pb-5" id={'map'}>
                    <Container>  
                        <Row>
                            <Col xl={3} lg={3} md={4} className="text-center mb-3 mb-lg-0">
                                {/* @ts-ignore */} 
                                <Lottie options={mapOptions}
                                    height={150}
                                    width={150}
                                    isClickToPauseDisabled={true}
                                    style={{ cursor: 'default' }}
                                />
                            </Col>

                            <Col xl={9} lg={9} md={8}>
                                <div className="mb-2">
                                    <Text variant="xLargePlus">{locale?.university.map.title}</Text>
                                </div>

                                <div className="mb-3">
                                    <Text variant="large">{locale?.university.map.description}</Text>
                                </div>

                                <PrimaryButton 
                                    text={locale?.university.map.button} 
                                    style={buttonStyle} 
                                    href={'https://www.google.com/maps/d/viewer?mid=1601q0wxFe22mtgotqZ7AJzrrWEOYfhs&ll=45.57712672502888%2C9.425802988620111&z=10'} 
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Separator />

                <div className="pt-5 pb-5 text-center" id={'redirects'}>
                    <Container>  
                        <div className="mb-1">
                            <Text variant="xLargePlus">{locale?.university.linksAndRedirects.text1}</Text>
                        </div>

                        <div className="mb-4">
                            <Text variant="large">{locale?.university.linksAndRedirects.text2}</Text>
                        </div>

                        <div className="university-links">
                            <ItemsGroup items={items} />
                        </div>
                    </Container>
                </div>

                <Separator />

                <div className="pt-5 pb-5 text-center" id={'representatives'}>
                    <Container>
                        <div className="mb-2">
                            <div className="mb-2">
                                <Text variant="xLargePlus">
                                    {locale?.university.representatives.title}
                                </Text>
                            </div>

                            <div className="mb-2">
                                <Text variant="medium">
                                    <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.university.representatives.description} />
                                </Text>
                            </div>

                            <div className="mb-2 text-center" style={{ maxWidth: 400, margin: '0 auto'}}>
                                <Dropdown
                                    placeholder={locale?.university.departmentSelect}
                                    label={locale?.university.departmentSelect}
                                    options={departmentOptions}
                                    onChange={departmentSelectionChanged}
                                    selectedKey={selectedDepartment}
                                    onRenderTitle={onRenderTitle}
                                    onRenderOption={onRenderOption}
                                    errorMessage={errorLoadingDepartments ? locale?.errorLoadingDepartments : undefined}
                                    disabled={errorLoadingDepartments || departments.length === 0}
                                />
                            </div>
                        </div>
                    </Container>
                </div>

                {
                    selectedDepartment &&
                    <Container>
                        <RepresentativesList 
                            data={representatives} 
                            loadingRepresentatives={loadingRepresentatives} 
                            errorLoadingRepresentatives={errorLoadingRepresentatives}
                        />
                    </Container>
                }

            </section>
        </>
    )
};

export default University;

const iconStyles = { marginRight: '8px' };

const onRenderOption = (option?: IDropdownOption): JSX.Element => {
    return (
        <div>
            {option?.data && option?.data.icon && (
                <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
            )}
            <span>{option?.text}</span>
        </div>
    );
};

const onRenderTitle = (options?: IDropdownOption[]): JSX.Element => {
    const option = options![0];

    return (
        <div>
            {option.data && option.data.icon && (
                <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
            )}
            <span>{option.text}</span>
        </div>
    );
};