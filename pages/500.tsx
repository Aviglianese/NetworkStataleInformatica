import { Container } from 'react-bootstrap';
import { DefaultButton, PrimaryButton, Text, useTheme } from '@fluentui/react';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import Image from 'next/image';
import LocalizationService from 'services/LocalizationService';

const FiveHundred: NextPage = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();

    const buttonStyle = { maxWidth: '160px', boxShadow: theme.effects.elevation8, padding: '10px 20px' };
    
    return (
        <>
            <NextSeo
                title={locale?.helmet.serverError.title}
                description={locale?.helmet.serverError.description}
                canonical={'https://studentiunimi.it/500'}
                openGraph={{
                    url: 'https://studentiunimi.it/500',
                    title: locale?.helmet.serverError.title,
                    description: locale?.helmet.serverError.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/seo/server-error.png',
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

            <section className="groups">
                <div className="pt-5 pb-5 text-center">
                    <Container>
                        <div className="d-flex flex-column justify-content-center" style={{ gap: 10}}>
                            <Text variant="xLargePlus">{locale?.serverErrorPage.title}</Text>

                            <div style={{ margin: '0 auto', maxWidth: 450 }}>
                                <Text variant="medium">{locale?.serverErrorPage.description}</Text>
                            </div>

                            <div className="d-flex justify-content-center">
                                <Image 
                                    id="not-found" 
                                    alt="Not found" 
                                    src={'/images/message/error.png'}
                                    width={250}
                                    height={250} 
                                />
                            </div>
                  
                            <div className="d-flex flex-row justify-content-center" style={{ gap: 10 }}>
                                <PrimaryButton
                                    text={locale?.serverErrorPage.buttonHomepage}
                                    style={buttonStyle}
                                    theme={theme}
                                    href="/"
                                />
                                <DefaultButton
                                    text={locale?.serverErrorPage.buttonGroups}
                                    style={buttonStyle}
                                    theme={theme}
                                    href={'/courses'}
                                />
                            </div>
                        </div>
                    </Container>
                </div>
            </section>
        </>
    );
};

export default FiveHundred;