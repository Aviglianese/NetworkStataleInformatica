import { Link, Text, Label, useTheme } from '@fluentui/react';
import { Container } from 'react-bootstrap';
import { bold, regular, semibold } from '../../services/Fonts';
import { Icon, IIconProps, PrimaryButton, Toggle, TooltipHost, SwatchColorPicker, ITooltipHostStyles, TooltipDelay } from '@fluentui/react';
import { palettes } from '../../services/Palettes';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Theme, preventDefault, preventVisibleHref } from 'services/Utils';
import { LocalizedField } from 'models/Models';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LocalizationService from "../../services/LocalizationService";
import GlobalContext from "../../services/GlobalContext";

interface FooterIcon {
    name: LocalizedField,
    link: string,
    iconName: string
};

const footerIcons: Array<FooterIcon> = [
    { name: { it: 'Canale Telegram', en: 'Telegram Channel' }, link: 'https://t.me/studenti_unimi', iconName: 'FaTelegram' },
    { name: { it: 'Canale Discord', en: 'Discord Channel' }, link: 'https://discord.gg/SwPzAkv4A4', iconName: 'FaDiscord' },
    { name: { it: 'Organizzazione GitHub', en: 'GitHub Organization' }, link: 'https://github.com/StudentiUnimi', iconName: 'FaGithub' },
    { name: { it: 'Pagina Facebook', en: 'Facebook Page' }, link: 'https://www.facebook.com/networkstudentiunimi', iconName: 'FaFacebook' },
    { name: { it: 'Pagina Instagram', en: 'Instagram Page' }, link: 'https://www.instagram.com/studentiunimi.it/', iconName: 'FaInstagram' },
];

const Footer = () => {
    const appTheme = useTheme();
    const locale = LocalizationService.strings();
    const lang: string | undefined = LocalizationService.getLanguage();
    const [clientRender, setClientRender] = useState<boolean>(false);

    const {
        theme,
        language,
        palette,
        isPolicyAccepted,
        changeTheme,
        changeLanguage,
        changePalette,
        togglePolicyDialog
    } = useContext(GlobalContext);

    const footerIconsStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'right',
        gap: 6
    };

    const wrapIconStyle: CSSProperties = {
        boxShadow: appTheme.effects.elevation8,
        borderRadius: 5,
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const iconStyle: CSSProperties = {
        color: appTheme.palette.black,
        fontSize: 16,
        margin: 0,
        display: 'flex'
    };

    const buttonStyle: CSSProperties = {
        maxWidth: '270px',
        boxShadow: appTheme.effects.elevation8
    };

    const buttonIconProps: IIconProps = {
        iconName: 'GoChevronRight',
        styles: {
            root: {
                fontSize: 14
            }
        }
    };

    const listElement: CSSProperties = { marginBottom: '.2rem' };

    /* Theme palette code */
    const colorCells: Array<{ id: string, label: string, color: string }> = palettes.map(x => ({ id: x.id, label: x.label, color: x.palette?.themePrimary }));
    const calloutPropsResetColor = { gapSpace: 10 };
    const hostStylesResetColor: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

    useEffect(() => { setClientRender(true); }, []); // TODO: Understand why the footer isn't updating properly using the global context

    return (
        <>
            <footer style={{ backgroundColor: appTheme.palette.neutralQuaternaryAlt, borderTop: '1px solid', borderColor: appTheme.palette.neutralLight }} className="pt-5 pb-5">
                <Container style={{ width: '100%', color: appTheme.palette.neutralSecondary }}>

                    <Row className="mb-4">
                        <Col xl={4} lg={4} md={6} sm={12} xs={12} className="mb-4 mb-md-0">
                            <div className="mb-2">
                                <Text styles={semibold} style={{ color: appTheme.palette.themePrimary }} variant="large">
                                    &copy; Network StudentiUniMi
                                </Text>
                            </div>

                            <div className="mb-2 text">
                                <PrimaryButton
                                    href={preventVisibleHref(isPolicyAccepted, "https://t.me/unimichat")} onClick={(e) => preventDefault(e, isPolicyAccepted) && togglePolicyDialog()}
                                    text={locale?.footer[0].buttonText}
                                    iconProps={buttonIconProps}
                                    allowDisabledFocus
                                    style={buttonStyle}
                                />
                            </div>
                        </Col>


                        <Col xl={2} lg={2} md={3} sm={12} xs={12} className="mb-2 mb-md-0">
                            <div>
                                <div className="mb-2">
                                    <Text styles={semibold} variant="medium">{locale?.footer[1].header}</Text>
                                </div>

                                <div>
                                    <Text variant="medium">
                                        <ul className="list-unstyled mb-3">
                                            <li style={listElement}>
                                                <Link href="http://www.quickunimi.it/">QuickUnimi</Link>
                                            </li>
                                            <li style={listElement}>
                                                <Link href="https://codeshare.tech">Codeshare.tech</Link>
                                            </li>
                                        </ul>
                                    </Text>
                                </div>
                            </div>
                        </Col>

                        <Col xl={3} lg={2} md={3} sm={12} xs={12}>
                            {clientRender && <div className="mb-2">
                                <Toggle
                                    label={locale?.settingsPanel.changeTheme}
                                    onText={locale?.settingsPanel.darkTheme}
                                    offText={locale?.settingsPanel.lightTheme}
                                    checked={theme === Theme.DARK}
                                    onChange={() => changeTheme(theme)}
                                    theme={appTheme}
                                />
                            </div>}

                            {clientRender && <div className="mb-2 language-selector">
                                <Label>{locale?.settingsPanel.selectLanguage}</Label>
                                <Text
                                    variant="medium"
                                    style={{ cursor: 'pointer' }}
                                    styles={language === "it" ? bold : regular} onClick={() => { if (language !== "it") changeLanguage("it"); }}
                                >
                                    ITA
                                </Text>

                                <Text variant="medium"> | </Text>

                                <Text
                                    variant="medium"
                                    style={{ cursor: 'pointer' }}
                                    styles={language === "en" ? bold : regular} onClick={() => { if (language !== "en") changeLanguage("en"); }}
                                >
                                    ENG
                                </Text>
                            </div>}
                        </Col>

                        <Col xl={3} lg={4} md={6} sm={12} xs={12}>
                            <div>
                                <Text variant="medium" styles={semibold}>{locale?.settingsPanel.selectColor}</Text>
                            </div>
                            <SwatchColorPicker selectedId={palette} columnCount={7} cellShape={'square'} colorCells={colorCells} onColorChanged={(id) => { changePalette(id!); }} />
                        </Col>

                    </Row>


                    <Row>
                        <Col lg={7} sm={12} style={{ display: 'table' }} className="center-mobile mb-2 mb-lg-0">
                            <Text variant="medium" style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                {locale?.footer[0].text} <Link href="https://cdn.studentiunimi.it/privacy-policy-IT.pdf" styles={semibold}>Privacy policy</Link>
                            </Text>
                        </Col>

                        <Col lg={5} sm={12}>
                            <div className="center-mobile footer-icons" style={footerIconsStyle}>
                                {footerIcons.map((x: any, i: number) => {
                                    return (
                                        <TooltipHost
                                            content={x.name[lang!]}
                                            calloutProps={calloutPropsResetColor}
                                            styles={hostStylesResetColor}
                                            key={i}
                                            delay={TooltipDelay.zero}
                                        >
                                            <Link href={x.link} name={x.name[lang!]}>
                                                <div style={wrapIconStyle} className="text-decoration">
                                                    <Icon iconName={x.iconName} style={iconStyle} />
                                                </div>
                                            </Link>
                                        </TooltipHost>
                                    )
                                }
                                )}
                            </div>
                        </Col>

                    </Row>

                </Container>
            </footer>
        </>
    );
};

export default Footer;