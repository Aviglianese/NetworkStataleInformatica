/**
 * This component is used to show an info message (example: when there are no data available).
 *
 * @author Giuseppe Del Campo
 */

import { Text, Icon, useTheme } from '@fluentui/react';
import { semibold } from '../../services/Fonts';
import { Container } from 'react-bootstrap';
import Image from 'next/image';

interface Props { text: string };

const Message = (props: Props) => {
    var theme = useTheme();
    const messageBarStyles = { backgroundColor: theme.palette.neutralLighterAlt, color: theme.palette.black, padding: 15 };

    const InfoMessage = () => (
        <div style={messageBarStyles} className="text-center">
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Image 
                    id="not-found" 
                    alt="Not found" 
                    src={'/images/message/not-found.png'} 
                    width={175}
                    height={175} 
                />
            </div>
            <Text variant="medium" styles={semibold}>
                <Icon iconName="Info" style={{ fontSize: 12, marginRight: 10 }} />
                {props.text}
            </Text>
        </div>
    );

    return (
        <Container style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: 350 }}>
            <InfoMessage />
        </Container>
    )
}

export default Message;