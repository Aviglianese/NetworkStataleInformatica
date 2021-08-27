import React from "react";
import { FocusZone, IRectangle, List } from "@fluentui/react";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Container } from 'react-bootstrap';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Text, Icon } from "office-ui-fabric-react/";
import { semibold } from '../fonts';
import { FontSizes } from '@fluentui/theme';
import { Separator } from '@fluentui/react/lib/Separator';
import { useTheme } from '@fluentui/react-theme-provider';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CourseItem from './CourseItem';
import LocalizationService from "../services/LocalizationService";
import LoadingSpinner from './LoadingSpinner';


//import { getCourses } from '../services/Requests';
//import Course from '../models/Course';
//import Degree from '../models/Degree';


import { Degree, Course } from '../models/Models';

interface Props { degree: Degree, courses: Course[], loadingCourses: boolean, errorLoadingCourses: boolean };

// Opzioni per la ricerca del semestre
const semesterFilterOptions: IDropdownOption[] = [ 
    { key: 0, text:'Non selezionato' },
    { key: 1, text:'Primo' },
    { key: 2, text:'Secondo' }
];

// Opzioni per la ricerca dell'anno per cdl triennali
const yearBachelorDegreeFilterOptions: IDropdownOption[] = [ 
    { key: 0, text:'Non selezionato' },
    { key: 1, text:'Primo' },
    { key: 2, text:'Secondo' },
    { key: 3, text:'Terzo' },
    { key: -2, text:'Complementare' }
];

// Opzioni per la ricerca dell'anno per cdl magistrali
const yearMasterDegreeFilterOptions: IDropdownOption[] = [ 
    { key: 0, text:'Non selezionato'},
    { key: 1, text:'Primo' },
    { key: 2, text:'Secondo' }
];

const CourseList= (props: Props) => {
    var theme = useTheme();
    const locale = LocalizationService.strings();
    const columnCount = React.useRef(0);
    const rowHeight = React.useRef(0);
    const rowsPerPage = React.useRef(0);
    const MAX_ROW_HEIGHT = 265;
    
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
    
    const getCell = (e?: Course, index?: number, isScrolling?: boolean) => {
        return (
            <div data-is-focusable className="listGridTile" style={{ height: rowHeight.current + 'px', width: 100 / columnCount.current + '%' }}>
                <CourseItem key={index} data={e!} />
            </div>
        )
    };
    
    // Filters inizialization
    const [nameFilter, setNameFilter] = React.useState<string>("");
    const [yearFilter, setYearFilter] = React.useState<number>(0);
    const [semesterFilter, setSemesterFilter] = React.useState<number>(0);


    //const courses: Course[] = cdl?.courses ?? [];


    const onNameFilterChanged = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text?: string): void => {
        setNameFilter(text ?? "");
    };

    const onSemesterFilterChanged = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        setSemesterFilter((item?.key ?? 0) as number);
    };

    const onYearFilterChanged = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
        setYearFilter((item?.key ?? 0) as number);
    };

    // Filters gestion
    
    /* To-do: Must adjust this, no is_master field available in apis */
    let yearFilterOptions = props.degree.slug === "magistrale_informatica" ? yearMasterDegreeFilterOptions : yearBachelorDegreeFilterOptions; 
    let filteredCourses = props.courses;

    if (nameFilter !== "") { filteredCourses = filteredCourses.filter(x => x.name?.toLocaleLowerCase()?.includes(nameFilter.toLocaleLowerCase())); }
    if (semesterFilter !== 0) { filteredCourses = filteredCourses.filter(x => x.semester === semesterFilter); }
    if (yearFilter !== 0) { filteredCourses = filteredCourses.filter(x => x.year === yearFilter); }

    return (       
        <Container className="courses-filter-options mb-4">
            <div className='text-center mb-4'>
                <Separator>
                    <Icon iconName="DoubleChevronDown8" style={{ color: theme.palette.themePrimary }} />
                    <Text variant="medium" styles={semibold} style={{ color: theme.palette.themePrimary, fontSize: FontSizes.size18 }}> {locale.courses.availableGroups} </Text>
                    <Icon iconName="DoubleChevronDown8" style={{ color: theme.palette.themePrimary }} />
                </Separator>
            </div> 
            
            <FocusZone>
                <div className="mb-4">
                    <Row className="justify-content-center">
                        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                            <TextField
                                label={locale.courses.nameFilter}
                                onChange={onNameFilterChanged}                
                            />
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                            {
                                <Dropdown 
                                    options={yearFilterOptions}
                                    label={locale.courses.yearFilter}
                                    onChange={onYearFilterChanged}
                                    selectedKey={yearFilter}
                                    /*disabled={ !props.degree?.has_years ?? false} TO-DO */
                                />
                            }
                        </Col>
                        <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Dropdown 
                                options={semesterFilterOptions}
                                label={locale.courses.semesterFilter}
                                onChange={onSemesterFilterChanged}
                                selectedKey={semesterFilter}
                            />
                        </Col>
                    </Row>
                </div>
                
                <LoadingSpinner loading={props.loadingCourses} error={props.errorLoadingCourses} />
                
                {filteredCourses.length === 0 && !props.errorLoadingCourses ? 
                    <div className="justify-content-center">
                        <Text style={{ fontSize: FontSizes.size14, backgroundColor: theme.palette.neutralLighter, padding: '4px' }}><Icon iconName="Info" /> {locale.courses.groupsNotFound}</Text>
                    </div>
                    :
                    <div className="course-list">
                        
                        <List
                            className={classNames.listGrid}
                            items={filteredCourses}
                            getItemCountForPage={getItemCountForPage}
                            getPageHeight={getPageHeight}
                            renderedWindowsAhead={15}
                            onRenderCell={getCell}
                            usePageCache={true}
                        />
                    </div>
                }
            </FocusZone>
        </Container>
    );
};

export default CourseList;
