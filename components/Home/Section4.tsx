import { Text, IIconProps, PrimaryButton, useTheme } from '@fluentui/react';
import { bold, semibold } from '../../services/Fonts';
import { Container } from 'react-bootstrap';
import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LocalizationService from "../../services/LocalizationService";

const FourthSection = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    const buttonStyle = { maxWidth: '200px', boxShadow: theme.effects.elevation8 };
    const buttonIconProps: IIconProps = { 
        iconName: 'GoChevronRight', 
        styles: { root: { fontSize: 14 } } 
    };

    return (
        <div className="pb-5 pt-5" style={{ backgroundColor: theme.palette.neutralLighterAlt }}>
            <Container>
                <div className="mb-4 text-center"><Text variant="xLarge" styles={bold}>{locale?.homepage.adminsRepresentativesSection.header}</Text></div>

                <Row className="justify-content-around">

                    <Col className="text-center mb-5 mb-md-0" md={4}>
                        <Image 
                            src={'/images/home/5_1.png'} 
                            alt="Representatives" 
                            width={170}
                            height={160} 
                        />
                        <div className="mb-2 mt-2">
                            <Text variant="medium" styles={semibold}>{locale?.homepage.adminsRepresentativesSection.col1.title}</Text>
                        </div>
                        <div className="mb-3">
                            <Text variant="medium">{locale?.homepage.adminsRepresentativesSection.col1.description}</Text>
                        </div>
                        <PrimaryButton
                            text={locale?.homepage.adminsRepresentativesSection.col1.buttonText}
                            style={buttonStyle}
                            iconProps={buttonIconProps}
                            theme={theme}
                            href={'/university'}
                        />
                    </Col>
                
                    <Col className="text-center" md={4}>
                        <Image 
                            src={'/images/home/5_2.png'} 
                            alt="Administrators" 
                            width={170}
                            height={160} 
                        />
                        <div className="mb-2 mt-2">
                            <Text variant="medium" styles={semibold}>{locale?.homepage.adminsRepresentativesSection.col2.title}</Text>
                        </div>
                        <div className="mb-3">
                            <Text variant="medium">{locale?.homepage.adminsRepresentativesSection.col2.description}</Text>
                        </div>
                        <PrimaryButton
                            text={locale?.homepage.adminsRepresentativesSection.col2.buttonText}
                            style={buttonStyle}
                            iconProps={buttonIconProps}
                            theme={theme}
                            href={'/courses'}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default FourthSection;