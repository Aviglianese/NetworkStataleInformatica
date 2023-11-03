import { Text, useTheme, Separator, Link } from '@fluentui/react';
import { Container } from 'react-bootstrap';
import { bold, semibold } from '../services/Fonts';
import { NextSeo } from 'next-seo';
import { useContext } from 'react';
import { preventDefault, preventVisibleHref } from 'services/Utils';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getExtraGroups } from 'services/Requests';
import { ExtraGroup, ExtraGroups } from 'models/Models';
import GroupsList, { GroupsType } from '../components/Groups/Groups';
import LocalizationService from "../services/LocalizationService";
import GlobalContext from 'services/GlobalContext';
import JsxParser from 'react-jsx-parser';
import GroupTypes from 'components/Atoms/GroupTypes';
import FiveHundred from './500';

interface Props {
    extraGroups: ExtraGroups,
    extraGrousError: boolean
};

const Groups = (props: Props): InferGetServerSidePropsType<typeof getServerSideProps> => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string = LocalizationService.getLanguage() as string;
    
    const { isPolicyAccepted, togglePolicyDialog } = useContext(GlobalContext);

    const universityGroups: Array<ExtraGroup> = props.extraGroups?.university_groups ?? [];
    const announcementsGroups: Array<ExtraGroup> = props.extraGroups?.announcement_groups ?? [];
    const studentsAssociations: Array<ExtraGroup> = props.extraGroups?.student_associations ?? [];

    if (props.extraGrousError) return <FiveHundred />;

    return (
        <>
            <NextSeo
                title={locale?.helmet.groups.title}
                description={locale?.helmet.groups.description}
                canonical={"https://studentiunimi.it/groups"}
                openGraph={{
                    url: "https://studentiunimi.it/groups",
                    title: locale?.helmet.groups.title,
                    description: locale?.helmet.groups.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/groups.png',
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

            <section className="groups">
                <div className="d-flex flex-column">

                    <div style={{ backgroundColor: theme.palette.neutralLighter }} className="pt-5 pb-5">
                        <Container> 
                            <div className="text-center">
                                <div className='mb-2'>
                                    <h1>
                                        <Text variant="xLargePlus" styles={bold}>{locale?.groups.title}</Text>
                                    </h1>
                                </div>

                                <div className="mb-4">
                                    <Text variant="medium">{locale?.groups.universityGroups.description2}</Text>{' '}
                                    <Text variant="medium" style={{ fontStyle: 'italic', color: theme.palette.neutralPrimary }}>
                                        <Link href={preventVisibleHref(isPolicyAccepted, "https://t.me/unimichat")} onClick={(e) => preventDefault(e, isPolicyAccepted) && togglePolicyDialog()}>
                                            {locale?.services.text4}
                                        </Link>
                                    </Text>
                                </div>

                                <GroupTypes page="groups" />
                            </div>
                        </Container>
                    </div>

                    <Container id="university" className="pt-5 pb-5">  
                        <div className="mb-4 text-center">
                            <div className="mb-1 text-mega">
                                <h2>
                                    <Text variant="xxLargePlus" styles={bold}>
                                        <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.groups.universityGroups.label} />
                                    </Text>
                                </h2>
                            </div>
                            <div className="mb-4">
                                <Text variant="large">{locale?.groups.universityGroups.description}</Text>
                            </div>
                        </div>

                        <GroupsList 
                            groups={universityGroups}
                            groupsType={GroupsType.UNIVERSITY} 
                        />
                    </Container>

                    <Separator />

                    <Container id="announcements" className="pt-5 pb-5">  
                        <div className="mb-4 text-center">
                            <div className="mb-1 text-mega">
                                <h2>
                                    <Text variant="xxLargePlus" styles={bold}>
                                        <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.groups.announcementsGroups.label} />
                                    </Text>
                                </h2>
                            </div>
                            <div className="mb-1">
                                <Text variant="large">{locale?.groups.announcementsGroups.title}</Text>
                            </div>
                            <div>
                                <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.groups.announcementsGroups.description2} />
                            </div>
                        </div>

                        <GroupsList
                            groups={announcementsGroups}
                            groupsType={GroupsType.ANNOUNCEMENTS} 
                        />
                    </Container>

                    <Separator />

                    <Container id="students-associations" className="pt-5 pb-5">  
                        <div className="mb-4 text-center">
                            <div className="mb-1">
                                <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.groups.studentsAssociations.title} />
                            </div>
                            <div className="mb-2">
                                <Text variant="large">{locale?.groups.studentsAssociations.description}</Text>
                            </div>
                            <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.groups.studentsAssociations.description2} />
                        </div>

                        <GroupsList 
                            groups={studentsAssociations}
                            groupsType={GroupsType.ASSOCIATION} 
                        />
                    </Container>

                </div>
            </section>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const extraGroupsResult = await getExtraGroups();
    let extraGroupsError = false;

    if (extraGroupsResult.error) extraGroupsError = true;

    return { 
        props: { 
            extraGroups: extraGroupsResult.value ?? null,
            extraGrousError: extraGroupsError
        } 
    };
};

export default Groups;