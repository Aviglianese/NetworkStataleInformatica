import { Text, IIconProps, PrimaryButton, useTheme } from '@fluentui/react';
import { useContext } from 'react';
import { bold, semibold } from '../../services/Fonts';
import { Container } from 'react-bootstrap';
import { preventDefault, preventVisibleHref } from 'services/Utils';
import Image from 'next/image';
import GlobalContext from 'services/GlobalContext';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LocalizationService from "../../services/LocalizationService";

const Wiki = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    const { isPolicyAccepted, togglePolicyDialog } = useContext(GlobalContext);
    
    const buttonStyle = { maxWidth: '230px', boxShadow: theme.effects.elevation8 };
    const buttonIconProps: IIconProps = { iconName: 'GoChevronRight', styles: { root: { fontSize: 14 } } };

    return (
        <div className="pb-5 pt-5" style={{ backgroundColor: theme.palette.neutralLighterAlt }}>
            <Container>

                <Row>
                    <Col lg={4} className="text-center mb-4 mb-lg-0">
                        <Image 
                            src={'/images/home/4.png'} 
                            alt="StudentiUniMi Wikipedia"  
                            width={250}
                            height={187} 
                        />
                    </Col>

                    <Col lg={8}>
                        <div className="mb-2"><Text variant="xLarge" styles={bold}>{locale?.homepage.wikipediaSection.text1}</Text></div>
                        <div>
                            <div className="mb-2">
                                <Text variant="large" styles={semibold}>{locale?.homepage.wikipediaSection.text2}</Text>
                            </div>

                            <div className="mb-3">
                                <Text variant="medium">
                                    {locale?.homepage.wikipediaSection.text3}
                                </Text>
                            </div>
                            
                            <PrimaryButton
                                href={preventVisibleHref(isPolicyAccepted, "https://wiki.studentiunimi.it/start")} onClick={(e) => preventDefault(e, isPolicyAccepted) && togglePolicyDialog()}
                                text={locale?.homepage.wikipediaSection.buttonText}
                                style={buttonStyle}
                                iconProps={buttonIconProps}
                                theme={theme}
                            />
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )
};

export default Wiki;