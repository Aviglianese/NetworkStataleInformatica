import { Text } from 'office-ui-fabric-react';
import { FontSizes } from '@fluentui/theme';
import { Persona, Link } from '@fluentui/react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { semibold } from '../fonts';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { useTheme } from '@fluentui/react-theme-provider';
import { Icon } from 'office-ui-fabric-react';
import { initializeIcons } from "@uifabric/icons";
import { Card, ICardTokens, CardSection } from "@uifabric/react-cards";
import { PrimaryButton } from 'office-ui-fabric-react';
import { Separator } from '@fluentui/react/lib/Separator';
import { ActionButton } from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { getFaqs } from '../services/Requests'; 
import { getGroupsLength, getCdlsLength } from '../services/Requests';
import LocalizationService from "../services/LocalizationService";
import JsxParser from 'react-jsx-parser';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

SwiperCore.use([Pagination, Navigation, Autoplay]);
initializeIcons();

const HomeView = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string = LocalizationService.getLanguage();
    const faqs = getFaqs();
    const iconStyle = { color: theme.palette.themePrimary };
    const homeIconStyle = { color: theme.palette.themePrimary, fontSize: FontSizes.size32 };
    const sectionCard = { minHeight: '160px', height: '100%', width: '100%', maxWidth: 'none', maxHeight: 'none', boxShadow: theme.effects.elevation8 };
    const buttonStyle = { maxWidth: '180px' };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const logoFileName = 'unimi500.png';
    const logoProperties = { width: '150px', height: '150px', display: 'inline-block' };
    const wikiPic = { width: '100px', height: '100px',  marginBottom: '5px', marginLeft: 'auto', marginRight: 'auto' };
    const logoImage = { marginLeft: 'auto', marginRight: 'auto', width: '50px', height: '50px' };

    const telegramGroupIcon: IIconProps = { iconName: 'Send', theme: theme };
    const wikiIcon: IIconProps = { iconName: 'Globe', theme: theme };

    const groupsNumber = getGroupsLength();
    const cdlsNumber = getCdlsLength();
    const numberStyle = { color: theme.palette.themePrimary };
    const mainCard = { minHeight: '160px', height: '100%', width: '100%', maxWidth: 'none', maxHeight: 'none', boxShadow: theme.effects.elevation8 };
    const infoCard = { minHeight: '130px' }

    return (
        <Container className="home text-center">
            <div className="info-section mb-4">
                <Image id="logo" className="mb-2" src={process.env.PUBLIC_URL + '/logo/' + logoFileName} alt='Network logo' style={logoProperties} />
                <div className="mb-2">
                    <Text variant="xLarge">
                        <JsxParser bindings={{ theme: theme }} components={{ Text }} jsx={locale.homepage.section1.text1} />
                    </Text>
                </div>
                <div><Text variant="large">{locale.homepage.section1.text2}</Text></div>
            </div>

            <div className="mb-3 justify-content-center">
                <Swiper pagination={true} navigation={true} autoplay={{ "delay": 4500, "disableOnInteraction": false }} className="mySwiper">

                    <SwiperSlide>
                        <Row className="justify-content-center">
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div >
                                    <div className="mb-1">
                                        <Text variant="medium">
                                            {locale.homepage.section1.sliders[0].text1} <Icon iconName="Help" style={{ color: theme.palette.themePrimary, fontSize: FontSizes.size12 }} />
                                        </Text>
                                    </div>
                                    <div>
                                        <Text styles={semibold}>{locale.homepage.section1.sliders[0].text2}</Text>
                                    </div>
                                </div>
                            </Col>
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                                <Card tokens={cardTokens} style={{ minHeight: '160px' }}>
                                    <Card.Item>
                                        <Persona onRenderPrimaryText={() => <div className="justify-content-center text-center mt-3" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}><Text styles={semibold}>{locale.homepage.section1.sliders[0].cardText}</Text></div>} text={locale.homepage.section1.sliders[0].cardText} imageUrl={process.env.PUBLIC_URL + '/extra_groups_images/matricole.jpg'} />
                                    </Card.Item>
                                    <Card.Section>
                                        <ActionButton
                                            href="https://t.me/joinchat/jjzrKAOF74s5ZmI0"
                                            target="_blank"
                                            className="text-decoration-none"
                                            iconProps={telegramGroupIcon}
                                            style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: 0 }}
                                            allowDisabledFocus>
                                            {locale.telegramGroup}
                                        </ActionButton>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Row>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Row className="justify-content-center">
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div >
                                    <div className="mb-1">
                                        <Text variant="medium">
                                            {locale.homepage.section1.sliders[1].text1} <Icon iconName="Help" style={{ color: theme.palette.themePrimary, fontSize: FontSizes.size12 }} />
                                        </Text>
                                    </div>
                                    <div>
                                        <Text styles={semibold}>{locale.homepage.section1.sliders[1].text2}</Text>
                                    </div>
                                </div>
                            </Col>
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                                <Card tokens={cardTokens} style={{ minHeight: '160px' }}>
                                    <Card.Item>
                                        <Persona onRenderPrimaryText={() => <div className="ml-2"><Text styles={semibold}>{locale.homepage.section1.sliders[1].cardText}</Text></div>} text={locale.homepage.section1.sliders[1].cardText} imageUrl={process.env.PUBLIC_URL + '/extra_groups_images/alloggi.jpg'} />
                                    </Card.Item>
                                    <Card.Section>
                                        <ActionButton
                                            href="https://t.me/joinchat/xJP5VPIBboxiNjI0"
                                            target="_blank"
                                            className="text-decoration-none"
                                            iconProps={telegramGroupIcon}
                                            style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: 0 }}
                                            allowDisabledFocus>
                                            {locale.telegramGroup}
                                        </ActionButton>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Row>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Row className="justify-content-center">
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div >
                                    <div className="mb-1">
                                        <Text variant="medium">
                                            {locale.homepage.section1.sliders[2].text1} <Icon iconName="Help" style={{ color: theme.palette.themePrimary, fontSize: FontSizes.size12 }} />
                                        </Text>
                                    </div>
                                    <div>
                                        <Text styles={semibold}>{locale.homepage.section1.sliders[2].text2}</Text>
                                    </div>
                                </div>
                            </Col>
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                                <Card tokens={cardTokens} style={{ minHeight: '160px' }}>
                                    <Card.Item>
                                        <Persona onRenderPrimaryText={() => <div className="ml-2"><Text styles={semibold}>{locale.homepage.section1.sliders[2].cardText}</Text></div>} text={locale.homepage.section1.sliders[2].cardText} imageUrl={process.env.PUBLIC_URL + '/extra_groups_images/materiali.jpg'} />
                                    </Card.Item>
                                    <Card.Section>
                                        <ActionButton
                                            href="https://t.me/joinchat/SyKyebINUEXQ969t"
                                            target="_blank"
                                            className="text-decoration-none"
                                            iconProps={telegramGroupIcon}
                                            style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: 0 }}
                                            allowDisabledFocus>
                                            {locale.telegramGroup}
                                        </ActionButton>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Row>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Row className="justify-content-center">
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div >
                                    <div className="mb-1">
                                        <Text variant="medium">
                                            {locale.homepage.section1.sliders[3].text1} <Icon iconName="Help" style={{ color: theme.palette.themePrimary, fontSize: FontSizes.size12 }} />
                                        </Text>
                                    </div>
                                    <div>
                                        <Text styles={semibold}>{locale.homepage.section1.sliders[3].text2}</Text>
                                    </div>
                                </div>
                            </Col>
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                                <Card tokens={cardTokens} style={{ minHeight: '160px' }}>
                                    <Card.Item>
                                        <Persona onRenderPrimaryText={() => <div className="ml-2"><Text styles={semibold}>{locale.homepage.section1.sliders[3].cardText}</Text></div>} text={locale.homepage.section1.sliders[3].cardText} imageUrl={process.env.PUBLIC_URL + '/extra_groups_images/ripetizioni.jpg'} />
                                    </Card.Item>
                                    <Card.Section>
                                        <ActionButton
                                            href="https://t.me/joinchat/a_aLt47Z8lAyMjBk"
                                            target="_blank"
                                            className="text-decoration-none"
                                            iconProps={telegramGroupIcon}
                                            style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: 0 }}
                                            allowDisabledFocus>
                                            {locale.telegramGroup}
                                        </ActionButton>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Row>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Row className="justify-content-center">
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div >
                                    <div className="mb-1">
                                        <Text variant="medium">
                                            <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text }} jsx={locale.homepage.section1.sliders[4].text1} />
                                        </Text>
                                    </div>
                                </div>
                            </Col>
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                                <Card tokens={cardTokens} style={{ minHeight: '160px' }}>
                                    <Card.Section>
                                        <Image id="logo"
                                            src={process.env.PUBLIC_URL + "/other/globe.png"}
                                            alt={"Wiki Studenti UniMi"}
                                            style={wikiPic}
                                        />
                                        <ActionButton
                                            href="https://wiki.studentiunimi.it/"
                                            target="_blank"
                                            className="text-decoration-none"
                                            iconProps={wikiIcon}
                                            style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 0, marginBottom: 0 }}
                                            allowDisabledFocus>
                                            {locale.homepage.section1.sliders[4].reachWiki}
                                        </ActionButton>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Row>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Row className="justify-content-center">
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                <div className="mb-1">
                                    <Text variant="medium">
                                        {locale.homepage.section1.sliders[5].text1}
                                    </Text>
                                </div>
                            </Col>
                            <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                                <Card tokens={cardTokens} style={{ minHeight: '160px' }}>
                                    <Card.Section>
                                        <Icon iconName="CoffeeScript" style={{ fontSize: '48px', color: theme.palette.themePrimary, marginTop: '15px' }} />
                                        <Text variant="medium">
                                            <Link href="https://unimia.studentiunimi.it">unimia.studentiunimi.it</Link>
                                        </Text>
                                    </Card.Section>
                                </Card>
                            </Col>
                        </Row>
                    </SwiperSlide>

                </Swiper>
            </div>

            <Icon iconName="ChevronDownMed" className="mb-3" style={iconStyle} />

            <div className="primary-section mb-4">
                <div className="mb-4">
                    <Separator><Text variant="large" styles={semibold}>{locale.homepage.section2.text}</Text></Separator>
                </div>

                <Row className="justify-content-center">
                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><i className="fab fa-telegram homeIcon" style={homeIconStyle}></i></div>
                                <Text variant="medium">
                                    {locale.homepage.section2.card1.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section2.card1.button} href="https://t.me/studenti_unimi" target="_blank" className="text-decoration-none" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><i className="fas fa-comment-dots homeIcon" style={homeIconStyle}></i></div>
                                <Text variant="medium">
                                    {locale.homepage.section2.card2.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section2.card2.button} href="https://t.me/unimichat" target="_blank" className="text-decoration-none" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><i className="fab fa-discord homeIcon" style={homeIconStyle}></i></div>
                                <Text variant="medium">
                                    {locale.homepage.section2.card3.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section2.card3.button} href="https://discord.gg/SwPzAkv4A4" target="_blank" className="text-decoration-none" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><i className="fab fa-github homeIcon" style={homeIconStyle}></i></div>
                                <Text variant="medium">
                                    {locale.homepage.section2.card4.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section2.card4.button} href="https://github.com/StudentiUnimi" target="_blank" className="text-decoration-none" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="secondary-section mb-4">
                <div className="mb-4"><Separator><Text variant="large" styles={semibold}>{locale.homepage.section3.text}</Text></Separator></div>

                <Row className="justify-content-center">
                    <Col className="mb-3" xl={4} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="Group" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section3.card1.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section3.card1.button} className="text-decoration-none" href="https://studentiunimi.it/courses/" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={4} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="AddGroup" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section3.card2.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section3.card2.button} className="text-decoration-none" href="https://studentiunimi.it/additional_groups/" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={4} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="JoinOnlineMeeting" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section3.card3.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section3.card3.button} className="text-decoration-none" href="https://studentiunimi.it/rules/" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="tertiary-section mb-4">
                <div className="mb-4"><Separator><Text variant="large" styles={semibold}>{locale.homepage.section4.text}</Text></Separator></div>

                <Row className="justify-content-center">
                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="Globe" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section4.card1.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section4.card1.button} href="https://wiki.studentiunimi.it/" className="text-decoration-none"  target="_blank" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="World" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section4.card2.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section4.card2.button} className="text-decoration-none" href="https://studentiunimi.it/services/" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="CloudDownload" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section4.card3.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section4.card3.button} href="https://hedgedoc.studentiunimi.it/" className="text-decoration-none"  target="_blank" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col className="mb-3" xl={3} lg={3} md={6} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="Code" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section4.card4.text}
                                </Text>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section4.card4.button} href="http://paste.studentiunimi.it/" className="text-decoration-none"  target="_blank" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="fourth-section mb-4">
                <div className="mb-4"><Separator><Text variant="large" styles={semibold}>{locale.homepage.section5.text}</Text></Separator></div>

                <Row className="justify-content-center">
                    <Col xl={3} lg={3} md={4} sm={6} xs={12} className="mb-3">
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="ContactHeart" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section5.card1.text}
                                </Text>
                                <Icon iconName="SortDown" style={iconStyle}></Icon>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section5.card1.button} className="text-decoration-none" href="https://studentiunimi.it/representatives/" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>

                    <Col xl={3} lg={3} md={4} sm={6} xs={12} className="mb-3">
                        <Card tokens={cardTokens} style={sectionCard} className="justify-content-center text-center">
                            <Card.Section>
                                <div><Icon iconName="Telemarketer" style={homeIconStyle} className="homeIcon" /></div>
                                <Text variant="medium">
                                    {locale.homepage.section5.card2.text}
                                </Text>
                                <Icon iconName="SortDown" style={iconStyle}></Icon>
                                <div className="justify-content-center">
                                    <PrimaryButton text={locale.homepage.section5.card2.button} className="text-decoration-none" href="https://studentiunimi.it/organization/" allowDisabledFocus style={buttonStyle} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Col>
                </Row>

            </div>

            <div className="faq-section mb-4">
                <div className="mb-4"><Separator><Text variant="large" styles={semibold}>{locale.homepage.section6.text}</Text></Separator></div>

                {
                    faqs.map( (x,i) => {
                        return (
                            <Accordion style={{ backgroundColor: theme.palette.white, color: theme.palette.black, boxShadow: theme.effects.elevation8, marginRight: 10, marginLeft: 10 }} key={i}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon style={{color: theme.palette.black}} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Text variant="medium" style={{ color: theme.palette.themePrimary }} styles={semibold}>
                                        <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={x.question![language]} />
                                    </Text>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Text variant="medium">
                                        <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link }} jsx={x.answer![language]} />
                                    </Text>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }

            </div>

            <div className="mb-4">
                <div className="mb-3"><Separator><Text variant="large" styles={semibold}>Perchè Telegram e non Whatsapp?</Text></Separator></div>

                <div className="mb-4">
                    <Text variant="medium">
                        Molti studenti potrebbero chiedersi come mai abbiamo scelto Telegram come piattaforma principale per tutte le nostre attività: in quanto informatici, siamo sempre alla ricerca
                        della soluzione migliore ad un problema, e in questo caso utilizzare Whatsapp come supporto a centinaia di gruppi (e si spera migliaia in futuro) sarebbe stato prima di tutto impraticabile
                        da un punto di vista puramente gestionale, e seconda cosa sarebbe stato un incubo per voi studenti cercare i vari materiali e comunicare in maniera efficace.
                    </Text>
                </div>

                <Row className="justify-content-center">
                    <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={mainCard} className="justify-content-center text-center">
                            <CardSection>
                                <div className="justify-content-center">
                                    <Image id="logo" src={process.env.PUBLIC_URL + "/other/telegram-icon-compress-min.png"} style={logoImage} />
                                </div>
                                <Text variant="medium" styles={semibold}>
                                    Vantaggi di <Link href="https://telegram.org/" target="_blank">Telegram</Link>
                                </Text>
                            </CardSection>
                        </Card>
                    </Col>
                    <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                        <div className="mt-3" style={{ textAlign: 'left', marginLeft: 50 }}>
                            <Text variant="small">
                                <Icon iconName="ChevronRightSmall" style={{ color: theme.palette.themePrimary }} /> Gestione della memoria<br />
                                <Icon iconName="ChevronRightSmall" style={{ color: theme.palette.themePrimary }} /> Sicurezza<br />
                                <Icon iconName="ChevronRightSmall" style={{ color: theme.palette.themePrimary }} /> Multi-piattaforma<br />
                                <Icon iconName="ChevronRightSmall" style={{ color: theme.palette.themePrimary }} /> Disponibilità dei canali<br />
                                <Icon iconName="ChevronRightSmall" style={{ color: theme.palette.themePrimary }} /> Uso degli username<br />
                                <Icon iconName="ChevronRightSmall" style={{ color: theme.palette.themePrimary }} /> Privacy<br />
                            </Text>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="mb-3">
                <div className="mb-4"><Separator><Text variant="large" styles={semibold}>{locale.homepage.section7.text}</Text></Separator></div>

                <Row className="justify-content-center">
                    <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={infoCard} className="justify-content-center text-center">
                            <CardSection>
                                
                                <Text variant="large" className="mt-0">
                                    <Icon iconName="UserOptional" style={iconStyle} /> {locale.homepage.section7.card1.text1}<br />
                                    <Text variant="xLarge" style={numberStyle}>2.000</Text> {locale.homepage.section7.card1.text2}
                                </Text>
                            </CardSection>
                        </Card>
                    </Col>
                    <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={infoCard} className="justify-content-center text-center">
                            <CardSection>
                                <Text variant="large" className="mt-0">
                                    <Icon iconName="PeopleAlert" style={iconStyle} /> {locale.homepage.section7.card2.text1}<br />
                                    <Text variant="xLarge" style={numberStyle}>{groupsNumber}</Text> {locale.homepage.section7.card2.text2}
                                </Text>
                            </CardSection>
                        </Card>
                    </Col>
                    <Col className="mb-3" xl={3} lg={4} md={4} sm={6} xs={12}>
                        <Card tokens={cardTokens} style={infoCard} className="justify-content-center text-center">
                            <CardSection>
                                <Text variant="large" className="mt-0">
                                    <Icon iconName="CityNext" style={iconStyle} /> {locale.homepage.section7.card3.text1}<br />
                                    <Text variant="xLarge" style={numberStyle}>{cdlsNumber}</Text> {locale.homepage.section7.card3.text2}
                                </Text>
                            </CardSection>
                        </Card>
                    </Col>
                </Row>
            </div>

        </Container >
    )
};

export default HomeView;