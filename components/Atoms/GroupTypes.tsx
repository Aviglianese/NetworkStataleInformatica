import { Text, useTheme, mergeStyleSets } from '@fluentui/react';
import { Container } from "react-bootstrap";
import { semibold } from "services/Fonts";
import { CSSProperties } from 'react';
import Image from 'next/image';
import GroupType from "models/GroupType";
import GroupTypesData from '../../data/GroupTypes.json';
import LocalizationService from 'services/LocalizationService';

type Page = 'courses' | 'groups' | 'telegram';

interface Props {
    page: Page
};

const GroupTypes = (props: Props) => {
    var theme = useTheme();
    var language: string = LocalizationService.getLanguage() as string;
    
    const groupTypes: Array<GroupType> = props.page === "courses" ? GroupTypesData.filter(g => g.href !== '/courses') : GroupTypesData;

    const groupTypesStyle: CSSProperties = {
        justifyContent: 'center',
        gap: 12
    };

    const groupTypeStyle = mergeStyleSets({
        root: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: props.page === "courses" || props.page === "telegram" ? theme.palette.neutralLighter : theme.palette.white,
            gap: 15,
            maxWidth: 200,
            maxHeight: 250,
            height: '100%',
            padding: '20px 20px',
            cursor: 'pointer',
            transition: '0.1s all ease',
            border: `1px solid ${theme.palette.neutralLight}`,
            borderRadius: 2,
            selectors: {
                ':hover': {
                    backgroundColor: theme.palette.neutralLight,
                    border: `1px solid ${theme.palette.neutralSecondary}`
                }
            },
        },
    });

    return (
        <Container> 
            <div className="text-center">
                <div className="group-types-selector d-flex flex-wrap flex-row" style={groupTypesStyle}>
                    {groupTypes.map((g: GroupType, i: number) => (
                        <a href={g.href} className="text-decoration-none" key={i}>
                            <div className={groupTypeStyle.root + " group-type-selector"}>
                                <div className="d-flex flex-grow-1 align-items-center justify-content-center mb-2">
                                    <Image 
                                        src={g.image} 
                                        alt={g.name[language]} 
                                        width={120}
                                        height={100}
                                    />
                                </div>
                                <Text variant="large" styles={semibold}>{g.name[language]}</Text>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </Container>
    );
};

export default GroupTypes;