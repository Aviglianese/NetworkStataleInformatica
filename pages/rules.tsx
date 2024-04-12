import { CSSProperties, useContext } from "react";
import { Text, Link, Icon, useTheme } from '@fluentui/react';
import { Container } from 'react-bootstrap';
import { bold, semibold } from '../services/Fonts';
import { NextSeo } from 'next-seo';
import { NextPage } from "next";
import LocalizationService from "../services/LocalizationService";
import JsxParser from 'react-jsx-parser';
import GlobalContext from "services/GlobalContext";

const Rules: NextPage = () => {
    const theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();

    const { isHeaderPinned } = useContext(GlobalContext);

    const subHeader: CSSProperties = { 
        backgroundColor: theme.palette.neutralLighter, 
        borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
        borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
        padding: '10px 0px', 
        position: 'sticky',
        top: isHeaderPinned ? 44 : 0,
        transition: 'top 0.2s ease-in-out 0s'
    };

    const finalBox: CSSProperties = { 
        backgroundColor: theme.palette.neutralLighter 
    };

    const iconStyle: CSSProperties = {
        color: theme.palette.white,
        fontSize: 18,
        display: 'flex'
    };

    const iconWrap: CSSProperties = {
        padding: 6,
        backgroundColor: theme.palette.themePrimary,
        borderRadius: 20
    };

    return (
        <>
            <NextSeo
                title={locale?.helmet.rules.title}
                description={locale?.helmet.rules.description}
                canonical={"https://studentiunimi.it/rules"}
                openGraph={{
                    url: "https://studentiunimi.it/rules",
                    title: locale?.helmet.rules.title,
                    description: locale?.helmet.rules.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/rules.png',
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

            <section className="rules">
                <div className="pt-5 pb-5 text-center">
                    <Container>
                        <div className="text-mega mb-2">
                            <h1>
                                <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.rules.title} />
                            </h1>
                        </div>
                    </Container>
                </div>

                <div className="pb-4">

                    <div className="mb-4">
                        <div style={subHeader}>
                            <Container className="d-flex flex-row align-items-center" style={{ gap: 8 }}>
                                <span style={iconWrap}>
                                    <Icon iconName="AiOutlineFileText" style={iconStyle} />
                                </span>
                                <Text variant="xLarge" styles={semibold}>{locale?.rules.rules.title}</Text>
                            </Container>
                        </div>
                        <Container>
                            <div className="d-flex flex-column mt-4" style={{ gap: 20 }}>
                                <div>
                                    <div className="mb-2">
                                        <Text variant="mediumPlus" styles={semibold}>{locale?.rules.rules.toxicBehaviour.title}</Text>
                                    </div>
                                    <div>
                                        <Text variant="medium">
                                            {locale?.rules.rules.toxicBehaviour.description}
                                        </Text>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2">
                                        <Text variant="mediumPlus" styles={semibold}>{locale?.rules.rules.chatInteraction.title}</Text>
                                    </div>
                                    <div>
                                        <Text variant="medium">
                                            {locale?.rules.rules.chatInteraction.description}
                                            <ul>
                                                {locale?.rules.rules.chatInteraction.list.map(x => <li>{x}</li> ) }
                                            </ul>
                                        </Text>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2">
                                        <Text variant="mediumPlus" styles={semibold}>{locale?.rules.rules.spam.title}</Text>
                                    </div>
                                    <div className="mb-3">
                                        <Text variant="medium">
                                            {locale?.rules.rules.spam.description1}
                                            <ul>
                                                {locale?.rules.rules.spam.list1.map(x => <li>{x}</li>)}
                                            </ul>
                                        </Text>
                                    </div>
                                    <div className="mb-3">
                                        <Text variant="medium">
                                            {locale?.rules.rules.spam.description2}
                                            <ul>
                                                {locale?.rules.rules.spam.list2.map(x => <li>{x}</li>)}
                                            </ul>
                                        </Text>
                                    </div>
                                    <div>
                                        <Text variant="medium">
                                            {locale?.rules.rules.spam.description3}
                                        </Text>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2">
                                        <Text variant="mediumPlus" styles={semibold}>{locale?.rules.rules.sharedContent.title}</Text>
                                    </div>
                                    <div>
                                        <Text variant="medium">
                                            <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.rules.rules.sharedContent.description} />
                                        </Text>
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2">
                                        <Text variant="mediumPlus" styles={semibold}>{locale?.rules.rules.offTopic.title}</Text>
                                    </div>
                                    <div>
                                        <Text variant="medium">
                                            <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.rules.rules.offTopic.description} />
                                        </Text>
                                    </div>
                                </div>


                            </div>
                        </Container>
                    </div>

                    <div className="mb-4">
                        <div style={subHeader}>
                            <Container className="d-flex flex-row align-items-center" style={{ gap: 5 }}>
                                <span style={iconWrap}>
                                    <Icon iconName="AiOutlineEdit" style={iconStyle} />
                                </span>
                                <Text variant="xLarge" styles={semibold}>{locale?.rules.measures.title}</Text>
                            </Container>
                        </div>
                        <Container>
                            <div className="d-flex flex-column mb-3 mt-4" style={{ gap: 20 }}>
                                <Text variant="medium">
                                    {locale?.rules.measures.description1}
                                </Text>
                                <Text variant="medium">
                                    {locale?.rules.measures.description2}
                                </Text>
                                <Text variant="medium">
                                    <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.rules.measures.description3} />
                                </Text>
                            </div>
                            <div className="mb-2">
                                <Text variant="mediumPlus" styles={semibold}>{locale?.rules.measures.countermeasures.title}</Text>
                                <Text variant="medium">
                                    <ul>
                                        {locale?.rules.measures.countermeasures.list.map(x => <li><JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={x} /></li>)}
                                    </ul>
                                </Text>
                            </div>
                        </Container>
                    </div>

                    <div>
                        <div style={subHeader}>
                            <Container className="d-flex flex-row align-items-center" style={{ gap: 5 }}>
                                <span style={iconWrap}>
                                    <Icon iconName="AiOutlineStar" style={iconStyle} />
                                </span>
                                <Text variant="xLarge" styles={semibold}>{locale?.rules.advices.title}</Text>
                            </Container>
                        </div>
                        <Container>
                            <div className="mb-3 mt-4">
                                <Text variant="medium">
                                    <ul>
                                        {locale?.rules.advices.list1.map(x => <li>{x}</li>)}
                                            <ul className="mb-3">
                                                {locale?.rules.advices.subList.map(x => <li>{x}</li>)}
                                            </ul>
                                        {locale?.rules.advices.list2.map(x => <li>{x}</li>)}
                                    </ul>
                                </Text>
                            </div>
                        </Container>
                    </div>

                    <div style={finalBox} className="pt-5 pb-5">
                        <Container className="d-flex flex-column text-center" style={{ gap: 10 }}>
                            <div className="d-flex flex-column" style={{ gap: 5 }}>
                                <Text variant="xLargePlus" styles={bold}>
                                    {locale?.rules.lastSection.title1}
                                </Text>
                                <Text variant="large" style={{ maxWidth: 700, margin: '0 auto' }}>
                                    {locale?.rules.lastSection.title2}
                                </Text>
                            </div>
                            <Text variant="medium">
                                <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={locale?.rules.lastSection.description} />
                            </Text>
                        </Container>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Rules;

