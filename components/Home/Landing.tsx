import { Text } from '@fluentui/react';
import { Container } from 'react-bootstrap';
import { bold } from 'services/Fonts';
import DegreesMarquee from './DegreesMarquee';
import React from 'react';
import LocalizationService from "../../services/LocalizationService";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'next/image';

interface Props {
    isLoadingDegrees: boolean,
    degrees: Array<string>
};

const Landing = (props: Props) => {
    const locale = LocalizationService.strings();

    return (
        <div className="pb-5 pt-5">
            <Container>
                <Row>
                    <Col lg={4}>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 200 }} className="mb-2 mb-lg-0">
                            <Image 
                                id="logo" 
                                src={'/logo/unimi500.png'} 
                                alt='Network logo'
                                width={200}
                                height={200} 
                            />
                        </div>
                    </Col>

                    <Col lg={8}>
                        <div className="mb-2">
                            <h1>
                                <Text variant="xLargePlus" styles={bold}>
                                    {locale?.homepage.section1.text1}
                                </Text>
                            </h1>
                        </div>

                        <div className="mb-3">
                            <h2>
                                <Text variant="large">
                                    {locale?.homepage.section1.text2}
                                </Text>
                            </h2>
                        </div>

                        <DegreesMarquee 
                            isLoadingDegrees={props.isLoadingDegrees}
                            degrees={props.degrees} 
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Landing;