import { Container } from 'react-bootstrap';
import { DefaultButton, PrimaryButton, Text, useTheme } from '@fluentui/react';
import LocalizationService from 'services/LocalizationService';
import Image from 'next/image';

const FourOhFour = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();

    const buttonStyle = { maxWidth: '160px', boxShadow: theme.effects.elevation8, padding: '10px 20px' };
    
    return (
        <section className="groups">
            <div className="pt-5 pb-5 text-center">
                <Container>
                    <div className="d-flex flex-column justify-content-center" style={{ gap: 10}}>
                        <Text variant="xLargePlus">{locale?.notFound.title}</Text>

                        <div style={{ margin: '0 auto', maxWidth: 400 }}>
                            <Text variant="medium">{locale?.notFound.description}</Text>
                        </div>

                        <div className="d-flex justify-content-center">
                            <Image 
                                id="not-found" 
                                alt="Not found" 
                                src={'/images/message/not-found.png'} 
                                width={250}
                                height={250} 
                            />
                        </div>

                        <div className="d-flex flex-row justify-content-center" style={{ gap: 10 }}>
                            <PrimaryButton
                                text={locale?.notFound.buttonHomepage}
                                style={buttonStyle}
                                theme={theme}
                                href="/"
                            />
                            <DefaultButton
                                text={locale?.notFound.buttonGroups}
                                style={buttonStyle}
                                theme={theme}
                                href={'/courses'}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </section>
    );
};

export default FourOhFour;