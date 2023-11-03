import { Text, IIconProps, PrimaryButton, useTheme } from '@fluentui/react';
import { bold, semibold } from '../../services/Fonts';
import { Container } from 'react-bootstrap';
import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LocalizationService from "../../services/LocalizationService";

const UnimiaStudentiUnimi = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    const buttonStyle = { maxWidth: '230px', boxShadow: theme.effects.elevation8 };
    const buttonIconProps: IIconProps = { iconName: 'GoChevronRight', styles: { root: { fontSize: 14 } } };

    return (
        <div className="pb-5 pt-5">
            <Container>

                <Row>
                    <Col lg={8} className="mb-4 mb-lg-0">
                        <div className="mb-2"><Text variant="xLarge" styles={bold}>{locale?.homepage.unimiaSection.text1}</Text></div>
                        <div>
                            <div className="mb-2">
                                <Text variant="large" styles={semibold}>{locale?.homepage.unimiaSection.text2}</Text>
                            </div>
                            <div className="mb-3">
                                <Text variant="medium">
                                    {locale?.homepage.unimiaSection.text3}
                                </Text>
                            </div>
                            <PrimaryButton
                                text={locale?.homepage.unimiaSection.buttonText}
                                style={buttonStyle}
                                iconProps={buttonIconProps}
                                theme={theme}
                                href="https://unimia.studentiunimi.it/"
                            />
                        </div>
                    </Col>

                    <Col lg={4} className="text-center">
                        <Image 
                            src={'/images/home/3.png'} 
                            alt="Unimia redirects"
                            width={256}
                            height={192} 
                        />
                    </Col>

                </Row>

            </Container>
        </div>
    )
};

export default UnimiaStudentiUnimi;