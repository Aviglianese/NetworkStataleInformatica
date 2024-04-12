import { CSSProperties, useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LocalizationService from "../services/LocalizationService";
import GlobalContext from 'services/GlobalContext';
import { Text, DocumentCardPreview, IDocumentCardPreviewProps, Link, Pivot, PivotItem, FontSizes, useTheme, mergeStyleSets } from '@fluentui/react';
import { NextSeo } from 'next-seo';
import { Container } from 'react-bootstrap';
import { Card, ICardTokens } from '@fluentui/react-cards';
import { bold, semibold } from '../services/Fonts';
import { getRedirects, getGuides, getTools } from '../services/Requests';
import { preventDefault, preventVisibleHref } from 'services/Utils';
import { NextPage } from 'next';
import JsxParser from 'react-jsx-parser';

const Services: NextPage = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();

    const { isPolicyAccepted, togglePolicyDialog, isHeaderPinned } = useContext(GlobalContext);

    const redirects = getRedirects();
    const guides = getGuides();
    const tools = getTools();

    const subHeader: CSSProperties = { 
        backgroundColor: theme.palette.white, 
        border: `1px solid ${theme.palette.neutralQuaternary}`,
        borderRadius: 3,
        position: 'sticky',
        top: isHeaderPinned ? 44 : 0,
        transition: 'top 0.2s ease-in-out 0s',
        zIndex: 1,
        maxWidth: 1340,
        margin: '0 auto'
    };
    
    const [selectedSubSection, setSelectedSubSection] = useState<string>("redirects");
    
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    
    const handleSubSectionChange = (item?: PivotItem) => {
        if (item) {
            setSelectedSubSection(item.props.itemKey!);
        }
    };

    const cardProps = (iconName?: string): IDocumentCardPreviewProps => {
        return {
            previewImages: [ 
                {
                    previewIconProps: {
                        iconName: iconName,
                        styles: { root: { fontSize: FontSizes.size32, color: theme.palette.themeDark } },
                    },
                    width: 100, height: 110
                },
            ],
            styles: { previewIcon: { backgroundColor: theme.palette.neutralLighter }, root: { borderBottom: '0px' } },
        }
    };

    const hoverStyle = mergeStyleSets({
        root: {
            display: 'inline-block',
            width: '100%',
            transition: '0.1s all ease',
            border: `1px solid rgba(255, 255, 255, 0)`,
            selectors: {
                ':hover': {
                    backgroundColor: theme.palette.neutralLight,
                    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`
                }
            },
        },
    });
    
    return (
        <>
            <NextSeo
                title={locale?.helmet.services.title}
                description={locale?.helmet.services.description}
                canonical={"https://studentiunimi.it/services"}
                openGraph={{
                    url: "https://studentiunimi.it/services",
                    title: locale?.helmet.services.title,
                    description: locale?.helmet.services.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/services.png',
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

            <section className="services pb-3">
                <div className="pt-5 text-center">
                    <Container>
                        <div className="mb-4 text-mega">
                            <h1>
                                <JsxParser bindings={{ theme: theme, semibold: semibold, bold: bold }} components={{ Text, Link }} jsx={locale?.services.text1} />
                            </h1>
                        </div>

                        <div className="mb-2">
                            <Text variant="large">{locale?.services.text2}</Text>
                        </div>

                        <div className="mb-4">
                            <Text variant="medium" style={{ fontStyle: 'italic', color: theme.palette.neutralPrimary }}>
                                {locale?.services.text3} <Link href={preventVisibleHref(isPolicyAccepted, "https://t.me/unimichat")} onClick={(e) => preventDefault(e, isPolicyAccepted) && togglePolicyDialog()}>
                                    {locale?.services.text4}
                                </Link>
                            </Text>
                        </div>
                    </Container>
                </div>

                <div className="mb-2 text-center">
                    <Text variant="medium" styles={semibold}>{locale?.services.selectSubSection}</Text>
                </div>

                <div className="text-center mb-4" style={subHeader}>
                    <Pivot
                        selectedKey={selectedSubSection}
                        onLinkClick={handleSubSectionChange}
                        headersOnly={true}
                        linkSize={'normal'}
                        linkFormat={'tabs'}
                    >
                        <PivotItem headerText={locale?.services.tabs.redirects} itemKey="redirects" />
                        <PivotItem headerText={locale?.services.tabs.guides} itemKey="guides" />
                        <PivotItem headerText={locale?.services.tabs.tools} itemKey="tools" />
                    </Pivot>
                </div>

                <Container>
                    {
                        selectedSubSection === "redirects" &&
                        <>
                            <div className="mb-4 text-center">
                                <Text variant="xLarge">{locale?.services.tabsTitle.redirects}</Text>
                            </div>

                            <Row>
                                {redirects.map((x, i) =>
                                    <Col xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3" key={i}>
                                        <Link href={x.link ?? ""} className="text-decoration-none" styles={hoverStyle}>
                                            <Card label={x.name?.it} horizontal tokens={cardTokens} style={{ border: '0px', maxWidth: 'none', cursor: 'pointer' }}>
                                                <Card.Item fill>
                                                    <DocumentCardPreview {...cardProps(x.icon)} />
                                                </Card.Item>
                                                <Card.Section>
                                                    <Text variant="medium" style={{ color: theme.palette.themeDark, marginBottom: 5 }} styles={semibold}>{x.name![language!]}</Text>
                                                    <Text variant="small" style={{ marginTop: 0, color: theme.palette.black }}>{x.description![language!]}</Text>
                                                </Card.Section>
                                            </Card>
                                        </Link>
                                    </Col>
                                    )
                                }
                            </Row>
                        </>
                    }

                    {
                        selectedSubSection === "guides" &&
                        <>
                            <div className="mb-4 text-center">
                                <Text variant="xLarge">{locale?.services.tabsTitle.guides}</Text>
                            </div>

                            <Row>
                                {guides.map((x, i) =>
                                    <Col xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3" key={i}>
                                        <Link href={x.link ?? ""} className="text-decoration-none" styles={hoverStyle}>
                                            <Card label={x.name?.it} horizontal tokens={cardTokens} style={{ border: '0px', maxWidth: 'none', cursor: 'pointer' }}>
                                                <Card.Item fill>
                                                    <DocumentCardPreview {...cardProps(x.icon)} />
                                                </Card.Item>
                                                <Card.Section>
                                                    <Text variant="medium" style={{ color: theme.palette.themeDark, marginBottom: 5 }} styles={semibold}>{x.name![language!]}</Text>
                                                    <Text variant="small" style={{ marginTop: 0, color: theme.palette.black }}>{x.description![language!]}</Text>
                                                </Card.Section>
                                            </Card>
                                        </Link>
                                    </Col>
                                    )
                                }
                            </Row>
                        </>
                    }

                    {
                        selectedSubSection === "tools" &&
                        <>
                            <div className="mb-4 text-center">
                                <Text variant="xLarge">{locale?.services.tabsTitle.tools}</Text>
                            </div>

                            <Row>
                                {tools.map((x, i) =>
                                    <Col xl={4} lg={6} md={6} sm={12} xs={12} className="mb-3" key={i}>
                                        <Link 
                                            styles={hoverStyle} 
                                            href={preventVisibleHref(isPolicyAccepted, x.link ?? "")} 
                                            onClick={(e) => preventDefault(e, isPolicyAccepted) && togglePolicyDialog()} 
                                            className="text-decoration-none"
                                        >
                                            <Card label={x.name?.it} horizontal tokens={cardTokens} style={{ border: '0px', maxWidth: 'none', cursor: 'pointer' }}>
                                                <Card.Item fill>
                                                    <DocumentCardPreview {...cardProps(x.icon)} />
                                                </Card.Item>
                                                <Card.Section>
                                                    <Text variant="medium" style={{ color: theme.palette.themeDark, marginBottom: 5 }} styles={semibold}>{x.name![language!]}</Text>
                                                    <Text variant="small" style={{ marginTop: 0, color: theme.palette.black }}>{x.description![language!]}</Text>
                                                </Card.Section>
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                                }
                            </Row>
                        </>
                    }

                </Container>
            </section>
        </>
    )
}

export default Services;