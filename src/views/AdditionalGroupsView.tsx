import React from 'react';
import { Link, Text, Icon } from 'office-ui-fabric-react';
import { useTheme } from '@fluentui/react-theme-provider';
import { FontSizes } from '@fluentui/theme';
import { Container } from 'react-bootstrap';
import { semibold } from '../fonts';
import { FocusZone, List, IRectangle } from "@fluentui/react";
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { getExtraGroups } from '../services/Requests';
import ExtraGroupView from '../components/ExtraGroup';
import ExtraGroup from '../models/ExtraGroup';

const AdditionalGroupsView = () => {
    var theme = useTheme();
    const iconStyle = { color: theme.palette.themePrimary, fontSize: FontSizes.size24 };
    const columnCount = React.useRef(0);
    const rowHeight = React.useRef(0);
    const rowsPerPage = React.useRef(0);
    const MAX_ROW_HEIGHT = 280;
    const groups: ExtraGroup[] = getExtraGroups();

    var classNames = mergeStyleSets({
        listGrid: {
            overflow: 'hidden',
            fontSize: 0,
            position: 'relative',
            marginBottom: 10,
            margin: '1px'
        }
    });

    const getItemCountForPage = React.useCallback((itemIndex?: number, surfaceRect?: IRectangle) => {
        if (itemIndex === 0) {
            /* rowHeight.current = Math.floor(surfaceRect!.width / columnCount.current) */ 
            columnCount.current = Math.ceil(surfaceRect!.width / MAX_ROW_HEIGHT);
            rowHeight.current = MAX_ROW_HEIGHT;
            rowsPerPage.current = surfaceRect!.height / MAX_ROW_HEIGHT;
        }
        return columnCount.current * rowsPerPage.current;
    }, []);
    
    const getPageHeight = React.useCallback((): number => {
        return rowHeight.current * rowsPerPage.current;
    }, []); 

    const getCell = (e?: ExtraGroup, index?: number, isScrolling?: boolean) => {
        return (
            <div data-is-focusable className="listGridTile" style={{ height: rowHeight.current + 'px', width: 100 / columnCount.current + '%' }}>
                <ExtraGroupView data={e!} />
            </div>
        )
    }

    return (
        <Container className="additional-groups text-center">

            <div className="mb-2">
                <Text variant="large">
                    Cerchi un gruppo in particolare? Qui è possibile trovare tutti quelli che abbiamo creato.
                </Text>
            </div>

            <Icon iconName="ChevronDownMed" className="mb-2" style={iconStyle} />

            <div className="mb-4">
                <Text variant="medium">
                    Se vorresti che venissero creati altri gruppi puoi scriverlo sul <Link href="https://t.me/joinchat/VswKeAblS2nrfXME" target="_blank">gruppo principale</Link>.
                </Text>
            </div>

            <div className='text-center mb-4'>
                <Icon iconName="DoubleChevronDown8" style={{ color: theme.palette.themePrimary }} />
                <Text variant="medium" styles={semibold} style={{ color: theme.palette.themePrimary, fontSize: FontSizes.size18 }}> Gruppi disponibili </Text>
                <Icon iconName="DoubleChevronDown8" style={{ color: theme.palette.themePrimary }} />
            </div>     

            <FocusZone>
                <List
                    className={classNames.listGrid}
                    items={groups}
                    getItemCountForPage={getItemCountForPage}
                    getPageHeight={getPageHeight}
                    renderedWindowsAhead={15}
                    onRenderCell={getCell}
                />
            </FocusZone>
        </Container>
    )
};

export default AdditionalGroupsView;