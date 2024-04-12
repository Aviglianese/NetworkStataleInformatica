import { Container } from 'react-bootstrap';
import { DefaultButton, DirectionalHint, IIconProps, Icon, Separator, Text, TooltipDelay, TooltipHost, useTheme } from '@fluentui/react';
import { NextSeo } from 'next-seo';
import { bold, semibold } from 'services/Fonts';
import { CSSProperties } from 'react';
import { NextPage } from 'next';
import LocalizationService from 'services/LocalizationService';
import router from 'next/router';
import GroupTypes from 'components/Atoms/GroupTypes';

const Telegram: NextPage = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();

    const goBackButtonIconProps: IIconProps = { iconName: 'AiOutlineArrowLeft', styles: { root: { fontSize: 14 } } };
    const numberStyle: CSSProperties = {
        display: 'inline-block',
        backgroundColor: theme.palette.red,
        padding: '5px 20px 5px 20px',
        borderRadius: '100%'
    };
    const elementStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        gap: 20
    };
    const quotesSectionStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
        gap: 60
    };
    const quotesStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    };

    return (
        <>
            <NextSeo
                title={locale?.helmet.telegram.title}
                description={locale?.helmet.telegram.description}
                canonical={'https://studentiunimi.it/telegram'}
                openGraph={{
                    url: 'https://studentiunimi.it/telegram',
                    title: locale?.helmet.telegram.title,
                    description: locale?.helmet.telegram.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/telegram.png',
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

            <section className="telegram">
                <div className="telegram-title pt-4 pb-4">
                    <Container className="mb-5">
                        <div className="d-flex flex-row courses-title-content align-items-center" style={{ gap: 20, marginBottom: 30 }}>

                            <TooltipHost
                                content={locale?.telegram.labelButton}
                                calloutProps={{ gapSpace: 6 }}
                                delay={TooltipDelay.zero}
                                id={'0'}
                                directionalHint={DirectionalHint.bottomCenter}
                            >
                                <DefaultButton onClick={() => { router.push("/"); }} iconProps={goBackButtonIconProps} style={{ minWidth: 40 }} />
                            </TooltipHost>
                            
                            <h1>
                                <Text variant='superLarge' styles={bold} style={{ lineHeight: 1.3 }}>{locale?.telegram.title}</Text><br/>
                            </h1>
                        </div>

                        <h2>
                            <Text variant="xLargePlus" styles={semibold} style={{ lineHeight: 1.3 }}>{locale?.telegram.subtitle}</Text>
                        </h2>

                        <div style={quotesSectionStyle} className='telegramDoubleQuote'>
                            <Icon iconName="RightDoubleQuote" style={{ fontSize: 48, color: theme.palette.redDark }}/>
                            <div style={quotesStyle}>
                                <Text variant="xLarge" styles={semibold} style={{ color: theme.palette.neutralSecondary, fontStyle: 'italic' }}>{locale?.telegram.doubleQuoteText1}</Text>
                                <Text variant="xLarge" styles={semibold} style={{ color: theme.palette.neutralSecondary, fontStyle: 'italic' }}>{locale?.telegram.doubleQuoteText2}</Text>
                                <Text variant="xLarge" styles={semibold} style={{ color: theme.palette.neutralSecondary, fontStyle: 'italic' }}>{locale?.telegram.doubleQuoteText3}</Text>
                            </div>
                        </div>

                        <div className="mb-4">
                            <Text variant="xLargePlus" styles={semibold} style={{ lineHeight: 1.3 }}>{locale?.telegram.text1}</Text>
                        </div>

                        <Text variant="xLargePlus" styles={bold} style={{ lineHeight: 1.3, color: theme.palette.themeDark }}>{locale?.telegram.text2}</Text>
                    </Container>

                    <div className="py-4 mb-5" style={{ backgroundColor: theme.palette.neutralLighter }}>
                        <Container>
                            <Text variant="xLargePlus" styles={bold} style={{ lineHeight: 1.3, color: theme.palette.redDark }}>{locale?.telegram.headerList}</Text>
                        </Container>
                    </div>

                    <Container className="mb-4">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

                            <div style={elementStyle}>
                                <div style={numberStyle}>
                                    <Text variant="xxLarge" styles={bold} style={{ color: theme.palette.white }}>1</Text>
                                </div>

                                <Text variant="xLarge" styles={semibold}>{locale?.telegram.listText1}</Text>
                            </div>

                            <div style={elementStyle}>
                                <div style={numberStyle}>
                                    <Text variant="xxLarge" styles={bold} style={{ color: theme.palette.white }}>2</Text>
                                </div>

                                <Text variant="xLarge" styles={semibold}>{locale?.telegram.listText2}</Text>
                            </div>

                            <div style={elementStyle}>
                                <div style={numberStyle}>
                                    <Text variant="xxLarge" styles={bold} style={{ color: theme.palette.white }}>3</Text>
                                </div>

                                <Text variant="xLarge" styles={semibold}>{locale?.telegram.listText3}</Text>
                            </div>

                            <div style={elementStyle}>
                                <div style={numberStyle}>
                                    <Text variant="xxLarge" styles={bold} style={{ color: theme.palette.white }}>4</Text>
                                </div>

                                <Text variant="xLarge" styles={semibold}>{locale?.telegram.listText4}</Text>
                            </div>

                            <div style={elementStyle}>
                                <div style={numberStyle}>
                                    <Text variant="xxLarge" styles={bold} style={{ color: theme.palette.white }}>5</Text>
                                </div>

                                <Text variant="xLarge" styles={semibold}>{locale?.telegram.listText5}</Text>
                            </div>

                            <div style={elementStyle}>
                                <div style={numberStyle}>
                                    <Text variant="xxLarge" styles={bold} style={{ color: theme.palette.white }}>6</Text>
                                </div>

                                <Text variant="xLarge" styles={semibold}>{locale?.telegram.listText6}</Text>
                            </div>

                        </div>
                    </Container>

                    <Separator />

                    <Container className="mt-4 mb-4 text-center">
                        <Text variant='superLarge' className='telegramText3' styles={bold} style={{ lineHeight: 1.3 }}>{locale?.telegram.text3}</Text><br/>
                    </Container>

                    <div className="mb-4">
                        <GroupTypes page="telegram" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Telegram;