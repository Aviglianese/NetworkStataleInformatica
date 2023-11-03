import { Text, useTheme, IIconProps, DialogType, Dialog, DialogFooter, PrimaryButton, Checkbox, DefaultButton } from '@fluentui/react';
import { semibold } from '../../services/Fonts';
import { useContext, useState } from 'react';
import Image from 'next/image';
import LocalizationService from 'services/LocalizationService';
import GlobalContext from 'services/GlobalContext';
import JsxParser from 'react-jsx-parser';

const PrivacyPolicyDialog = () => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    const { acceptPrivacyPolicy, isPolicyDialogOpen, togglePolicyDialog } = useContext(GlobalContext);

    /* Checkbox status */
    const [isChecked, setIsChecked] = useState(false);

    /* Dialog properties */
    const icon: IIconProps = { iconName: 'AiOutlineFilePdf' };
    const dialogContentProps = { type: DialogType.largeHeader, title: locale?.privacyPolicy.title };
    const modelProps = { isBlocking: false };

    return (
        <Dialog
            hidden={!isPolicyDialogOpen}
            onDismiss={togglePolicyDialog}
            dialogContentProps={dialogContentProps}
            modalProps={modelProps}
        >
            <div className="d-flex flex-column" style={{ gap: 10 }}>

                <Text variant="medium" styles={semibold}>
                    {locale?.privacyPolicy.subtitle}
                </Text>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image 
                        src={'/images/privacy_policy.png'} 
                        alt="Privacy policy" 
                        width={250}
                        height={176} 
                    />
                </div>

                <div className="p-3 d-flex flex-column" style={{ backgroundColor: theme.palette.neutralLighter, borderRadius: 8, gap: 10 }}>
                    <Text variant="medium">
                        <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text }} jsx={locale?.privacyPolicy.description} />
                    </Text>

                    <div className="d-flex flex-row" style={{ gap: 5 }}>
                        <DefaultButton className='flex-grow-1' theme={theme} text={locale?.privacyPolicy.privacyPolicy} href="https://cdn.studentiunimi.it/privacy-policy-IT.pdf" style={{ textDecoration: 'none', padding: '20px 10px' }} iconProps={icon} />
                        <DefaultButton className='flex-grow-1' theme={theme} text={locale?.privacyPolicy.regulation} href="/rules" style={{ textDecoration: 'none', padding: '20px 10px' }} iconProps={icon} />
                    </div>

                </div>

                <div className="d-flex justify-content-center">
                    <Checkbox label={locale?.privacyPolicy.checkboxDescription} checked={isChecked} onChange={(_,value?: boolean) => setIsChecked(!!value)} />
                </div>
            </div>

            <DialogFooter>
                <PrimaryButton onClick={togglePolicyDialog} text={locale?.privacyPolicy.refuse} style={{ padding: 20, backgroundColor: theme.palette.redDark, borderColor: theme.palette.redDark }} />
                <PrimaryButton onClick={acceptPrivacyPolicy} text={locale?.privacyPolicy.accept} disabled={!isChecked} style={{ padding: 20 }} />
            </DialogFooter>
        </Dialog>
    );
};

export default PrivacyPolicyDialog;