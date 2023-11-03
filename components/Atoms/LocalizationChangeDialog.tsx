import { Text, useTheme, DialogType, Dialog, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';
import { semibold } from '../../services/Fonts';
import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { addDays } from 'services/Utils';
import Lottie from 'lottie-react';
import * as lottieLocalization from './Lottie/PSa9MuR7v2.json';
import GlobalContext from 'services/GlobalContext';

const LocalizationChangeDialog = () => {
    var theme = useTheme();
    const [cookies, setCookie] = useCookies();
    const date: Date = addDays(new Date(), 90);
    
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    /* Dialog properties */
    const dialogContentProps = { 
        type: DialogType.largeHeader, 
        title: "You don't speak Italian?"
    };
    const modelProps = { isBlocking: false };

    const localizationLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: lottieLocalization,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const { changeLanguage } = useContext(GlobalContext);

    const setEnglishLocale = () => { 
        changeLanguage("en");
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const acceptLanguage = window.navigator.languages[0] ?? navigator.language;
        
        if (cookies.isFirstVisit === undefined && acceptLanguage !== "it") {
            setIsDialogOpen(true);
        }

        setCookie("isFirstVisit", false, { path: "/", expires: date });
    }, []);

    return (
        <Dialog
            hidden={!isDialogOpen}
            onDismiss={() => setIsDialogOpen(false)}
            dialogContentProps={dialogContentProps}
            modalProps={modelProps}
        >
            <div className="d-flex flex-column" style={{ gap: 20 }}>

                <Text variant="medium" styles={semibold}>
                    Looks like your browser is not set on italian. Would you like to switch to English language?
                </Text>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* @ts-ignore */}
                    <Lottie options={localizationLottieOptions}
                        height={130}
                        width={185}
                        isClickToPauseDisabled={true}
                        style={{ cursor: 'default' }}
                    />
                </div>

                <div className="p-3 d-flex flex-column text-center" style={{ backgroundColor: theme.palette.neutralLighter, borderRadius: 8, gap: 10 }}>
                    <Text variant="medium">
                        We'll remember your choice 😎
                    </Text>
                </div>
            </div>

            <DialogFooter>
                <DefaultButton onClick={() => setIsDialogOpen(false)} text="Rimani in italiano" style={{ padding: 20 }} />
                <PrimaryButton onClick={setEnglishLocale} text="Switch to english" style={{ padding: 20 }} />
            </DialogFooter>
        </Dialog>
    )
};

export default LocalizationChangeDialog;