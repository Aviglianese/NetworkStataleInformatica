import { NextSeo } from 'next-seo';
import { getStringDegrees } from 'services/Requests';
import LocalizationService from "../services/LocalizationService";
import Faqs from '../components/Home/Faqs';
import Landing from '../components/Home/Landing';
import Section1 from '../components/Home/Section1';
import Section2 from '../components/Home/Section2';
import Section3 from '../components/Home/Section3';
import Section4 from '../components/Home/Section4';
import Telegram from '../components/Home/Telegram';
import Wikipedia from '../components/Home/Wikipedia';
import UnimiaStudentiUnimi from '../components/Home/UnimiaStudentiUnimi';
import { useCallback, useEffect, useState } from 'react';

const Homepage = () => {
    const locale = LocalizationService.strings();
    var language: string | undefined = LocalizationService.getLanguage();

    const [isLoadingDegrees, setIsLoadingDegrees] = useState<boolean>(false);
    const [degrees, setDegrees] = useState<Array<string>>([]);

    const getDegrees = useCallback(async () => {
        setDegrees(defaultDegrees);

        setIsLoadingDegrees(true);
        
        const stringDegreesResult = await getStringDegrees();

        if (stringDegreesResult.value)
            setDegrees(stringDegreesResult.value);
        
        setIsLoadingDegrees(false);
    }, [setDegrees]);

    useEffect(() => {
        getDegrees();
    }, []);

    return (
        <>
            <NextSeo
                title={locale?.helmet.homepage.title}
                description={locale?.helmet.homepage.description}
                canonical={"https://studentiunimi.it/"}
                openGraph={{
                    url: "https://studentiunimi.it/",
                    title: locale?.helmet.homepage.title,
                    description: locale?.helmet.homepage.description,
                    site_name: 'Network StudentiUniMi',
                    type: 'website',
                    locale: language,
                    images: [
                        {
                            url: '/images/preview.png',
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

            <section className="home">
                <Landing 
                    isLoadingDegrees={isLoadingDegrees}
                    degrees={degrees} 
                />

                <Telegram />

                <Section1 />

                <Section2 />

                <UnimiaStudentiUnimi />

                <Wikipedia />

                <Section3 />

                <Section4 />

                <Faqs />
            </section>
        </>
    )
};

export default Homepage;

const defaultDegrees = [
    'informatica',
    'fisica',
    'informatica musicale',
    'matematica',
    'informatica per la comunicazione digitale',
    'bioinformatics',
    'sicurezza informatica',
    "infermieristica",
    "scienze delle professioni sanitarie tecniche diagnostiche",
    "scienze chimiche",
    "scienze della produzione e protezione delle piante",
    "medical biotechnology and molecular medicine",
    "international politics, law and economics",
    "finance and economics (mef)",
    "infermieristica pediatrica",
    "scienza, tecnica e didattica dello sport",
    "scienze internazionali e istituzioni europee (sie)",
    "scienze dei servizi giuridici",
    "international politics, law and economics"
];
