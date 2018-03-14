import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { styles } from '../EventStyles';
import Chip from 'material-ui/Chip';



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
                        <div className={classes.DDContainer}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="course-helper">Course</InputLabel>
                                <Select
                                    input={<Input name="Course" id="course-helper"/>}
                                    className={classes.Select}
                                    name="course"
                                    value={this.state.course}
                                    onChange={this.handleChange}
                                >
                                    {(this.props.courseList && this.props.courseList.length > 0 && this.props.courseList.map(row => {
                                        return (
                                            <MenuItem value={row.COURSE_ID}>{row.COURSE_ID}</MenuItem>
                                        )
                                    })) || <MenuItem value=''>None</MenuItem>};
                                </Select>
                            </FormControl>

                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="select-multiple-chip">Sections</InputLabel>
                              <Select
                                multiple
                                name="sections"
                                value={this.state.sections}
                                onChange={this.handleChange}
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
                                        key={section.SECTION_ID}
                                        value={section.SECTION_ID}

                                      >
                                        {section.SECTION_ID}
                                      </MenuItem>
                                    )
                                }
                              })}
                              </Select>
                            </FormControl>
                                                <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="section-helper">Room</InputLabel>
                                <Select
                                    input={<Input name="Room" id="room-helper"/>}
                                    className={classes.Select}
                                    name="room"
                                    value={this.state.room}
                                    onChange={this.handleChange}
                                >
                                    {(this.props.roomList && this.props.roomList.length > 0 && this.props.roomList.map(row => {
                                        return (
                                            <MenuItem value={row.ROOM_ID}>{row.ROOM_ID}</MenuItem>
                                        );
                                    })) || <MenuItem value=''>None</MenuItem>};
                                </Select>
                            </FormControl>
                        </div>
                    </form>
                </div>
        );
    }
}

export default withStyles(styles)(EventForm);
