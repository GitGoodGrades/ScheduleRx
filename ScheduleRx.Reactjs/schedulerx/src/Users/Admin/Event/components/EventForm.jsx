import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
//import { styles } from '../EventStyles';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Option from '../../../../Base Components/Option';
import 'react-select/dist/react-select.css';


const styles = theme => ({
    Form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
        paddingBottom: 10,
        background: 'rgba(0,0,0, .7)',
        borderRadius: 5,
        zIndex: 98
    },
    control: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle',
        zIndex: 98
    },
    Select: {
        minWidth: 200,
        background: '#D7BAAB',
        borderRadius: 3,
        marginRight: 5,
        zIndex: 98
    },
    label: {
        fontFamily: 'Open Sans',
        color: '#D7BAAB',
        fontSize: 12,
        marginRight: 5,
    },
    Input: {
        fontFamily: 'Open Sans',
        fontSize: 12,
        zIndex: 98
    },
    item: {
        fontFamily: 'Open Sans'
    },
    chip: {
        fontFamily: 'Open Sans',
        height: 18
    }
});

const theme = createMuiTheme({
  overrides: {
    MuiSelect: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'rgba(0,0,0, .7)',
        borderRadius: 3,
        color: 'white',
        width: 200,
        fontFamily: 'Open Sans',
      },
    },
  },
});


class EventForm extends Component {
    state = {
        course: '',
        sectionOptions: [],
        sections: [],
        room: ''
    };

    handleCourseChange = event => {
        let sections = [];
        if(event && event.value != null){
            this.props.sectionList.map(section => {
            if(section.COURSE_ID === event.value) {
              sections.push({label: section.SECTION_ID, value: section.SECTION_ID})
            }
            }) 
            this.setState({sectionOptions: sections, course: event.value});
            this.props.onChange('course', event.value);
        } else{
            this.setState({sectionOptions: [], course: null});
            this.props.onChange('course', null);
        }  
    }

    handleSectionChange = (event) => {
        this.setState({sections: event})
        this.props.onChange('sections', event);
    };

    handleRoomChange = event => {
        this.setState({room: event && event.value})
        this.props.onChange('room', event && event.value ? event.value : null);
    };

    render() {
        const { classes } = this.props;
        const course = this.state.course
        return (

                <div className={classes.FormContainer}>
                    <form className={classes.Form}  style={{zIndex: 98}}>
                            <div className={classes.control}  style={{zIndex: 98}}>
                                <InputLabel className={classes.label} htmlFor="course-helper">Select Course</InputLabel>
                                <Select
                                    className={classes.Select}
                                    onChange={this.handleCourseChange}
                                    options={this.props.courseList && this.props.courseList.map( row => 
                                        row = {label: row.COURSE_ID, value: row.COURSE_ID}
                                    )}
                                    value={course}
                                    placeholder="course"
                                    optionComponent={Option}
                                />
                            </div>
                            <div className={classes.control}>
                              <InputLabel htmlFor="select-multiple" className={classes.label}>Select Section(s)</InputLabel>
                              <Select
                                className={classes.Select}
                                closeOnSelect={true}
                                removeSelected={true}
                                multi
                                onChange={this.handleSectionChange}
                                options={this.state.sectionOptions}
                                placeholder="Sections"
                                simpleValue
                                value={this.state.sections}
                                optionComponent={Option}
                              />
                        </div>
                        <div className={classes.control}>
                                <InputLabel htmlFor="section-helper" className={classes.label}>Select Room</InputLabel>
                                <Select
                                    className={classes.Select}
                                    closeOnSelect
                                    onChange={this.handleRoomChange}
                                    options={this.props.roomList && this.props.roomList.map( row => 
                                        row = {label: row.ROOM_ID, value: row.ROOM_ID}
                                    )}
                                    value={this.state.room}
                                    optionComponent={Option}
                                />
                        </div>
                    </form>
                </div>
        );
    }
}

export default withStyles(styles)(EventForm);
