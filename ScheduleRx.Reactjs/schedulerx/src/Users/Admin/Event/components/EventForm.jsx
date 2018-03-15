import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
//import { styles } from '../EventStyles';
import Chip from 'material-ui/Chip';



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
    },
    control: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'middle'
    },
    Select: {
        minWidth: 200,
        background: '#D7BAAB',
        borderRadius: 3,
        marginRight: 5,
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
        sections: [],
        room: ''
    };

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
        this.props.onChange(event.target.name, event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (

                <div className={classes.FormContainer}>
                    <form className={classes.Form}>
                            <div className={classes.control}>
                                <InputLabel className={classes.label} htmlFor="course-helper">Select Course</InputLabel>
                                    <Select
                                    input={<Input name="Course" id="course-helper" className={classes.Input}/>}
                                    className={classes.Select}
                                    name="course"
                                    value={this.state.course}
                                    onChange={this.handleChange}
                                    disableUnderline={true}
                                >
                                    {(this.props.courseList && this.props.courseList.length > 0 && this.props.courseList.map(row => {
                                        return (
                                            <MenuItem className={classes.item} value={row.COURSE_ID}>{row.COURSE_ID}</MenuItem>
                                        )
                                    })) || <MenuItem className={classes.item} value=''>None</MenuItem>};
                                </Select>
                            </div>
                            <div className={classes.control}>
                              <InputLabel htmlFor="select-multiple-chip" className={classes.label}>Select Section(s)</InputLabel>
                              <Select
                                multiple
                                name="sections"
                                className={classes.Select}
                                value={this.state.sections}
                                onChange={this.handleChange}
                                disableUnderline={true}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                  <div className={classes.chips}>
                                    {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
                                  </div>
                                )}
                              >

                                {this.props.sectionList.map(section => {
                                  if(section.COURSE_ID === this.state.course) {
                                    return (
                                      <MenuItem
                                        className={classes.item}
                                        key={section.SECTION_ID}
                                        value={section.SECTION_ID}
                                      >
                                        {section.SECTION_ID}
                                      </MenuItem>
                                    )
                                }
                              })}
                              </Select>
                        </div>
                        <div className={classes.control}>
                                <InputLabel htmlFor="section-helper" className={classes.label}>Select Room</InputLabel>
                                <Select
                                    input={<Input name="Room" id="room-helper" className={classes.input}/>}
                                    className={classes.Select}
                                    name="room"
                                    value={this.state.room}
                                    onChange={this.handleChange}
                                    disableUnderline={true}
                                >
                                    {(this.props.roomList && this.props.roomList.length > 0 && this.props.roomList.map(row => {
                                        return (
                                            <MenuItem  className={classes.item} value={row.ROOM_ID}>{row.ROOM_ID}</MenuItem>
                                        );
                                    })) || <MenuItem className={classes.item} value=''>None</MenuItem>};
                                </Select>
                        </div>
                    </form>
                </div>
        );
    }
}

export default withStyles(styles)(EventForm);
