/**
 * This component is used to show an error.
 *
 * @author Giuseppe Del Campo
 */

import React from 'react';
import LocalizationService from "../../services/LocalizationService";
import JsxParser from 'react-jsx-parser';
import Image from 'next/image';
import { semibold } from '../../services/Fonts';
import { Text, Icon, Link, useTheme } from '@fluentui/react';
import { Container } from 'react-bootstrap';

interface Props { error: boolean };

interface IExampleProps { resetChoice?: () => void; };

const ErrorMessage = (props: Props) => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    const [showError, setShowError] = React.useState<boolean>(false);

    const updateError = React.useCallback(() => {
        setShowError(props.error);
    }, [setShowError, props.error]);

    React.useEffect(() => {
        updateError();
    }, [updateError]);

    const messageBarStyles = { backgroundColor: 'rgb(253, 231, 233)', color: theme.palette.redDark, padding: 20 };

    const ErrorExample = (_: IExampleProps) => (
        <div style={messageBarStyles} className="text-center">
            <Text variant="medium" styles={semibold} style={{ color: theme.palette.redDark }}>
                <Icon iconName="ErrorBadge" style={{ fontSize: 12, marginRight: 10 }} />
                {locale?.errorOccured}
            </Text>
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Image 
                    id="not-found" 
                    alt="Not found" 
                    src={'/images/message/error.png'} 
                    width={250}
                    height={250} 
                />
            </div>
            <JsxParser bindings={{ theme: theme, semibold: semibold }} components={{ Text, Link, Icon }} jsx={locale?.errorContactAdmin} />
        </div>
    );

    return (
        <>
            {
                props.error && 
                <Container style={{ display: showError ? 'block' : 'none', marginLeft: 'auto', marginRight: 'auto', maxWidth: 400 }}>
                    <ErrorExample />
                </Container>
            }
        </>
    )
}

export default ErrorMessage;