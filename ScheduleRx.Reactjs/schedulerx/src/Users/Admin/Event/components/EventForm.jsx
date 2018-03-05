import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import { styles } from '../EventStyles';


class EventForm extends Component {
    state = {
        COURSE_ID: '',
        SECTION_ID: '',
        ROOM_ID: '',
        START_TIME: '',
        END_TIME: '',
    };

    handleSave = () => {
        this.props.onSave(
            this.state.COURSE_ID, 
            this.state.SECTION_ID, 
            this.state.ROOM_ID, 
            this.state.START_TIME, 
            this.state.END_TIME,
        )
    };
        

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const { classes } = this.props;

        return (
            <Paper>
                <div className={classes.FormContainer}>
                    <form className={classes.Form}>
                      <div className={classes.title}><h1>Add Event To Schedule</h1></div>
                        <div className={classes.DDContainer}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="course-helper">Course</InputLabel>
                                <Select
                                    input={<Input name="Course" id="course-helper"/>}
                                    className={classes.Select}
                                    name="COURSE_ID"
                                    value={this.state.COURSE_ID}
                                    onChange={this.handleChange}
                                >
                                    {(this.props.courseList && this.props.courseList.length > 0 && this.props.courseList.map(row => {
                                        return (
                                            <MenuItem value={row.COURSE_ID}>{row.COURSE_ID}</MenuItem>
                                        )
                                    })) || <MenuItem>None</MenuItem>};
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="section-helper">Section</InputLabel>
                                <Select
                                    input={<Input name="Section" id="section-helper"/>}
                                    className={classes.Select}
                                    name="SECTION_ID"
                                    value={this.state.SECTION_ID}
                                    onChange={this.handleChange}
                                >
                                    {(this.props.sectionList && this.props.sectionList.length > 0 && this.props.sectionList.map(row => {
                                        if (row.COURSE_ID === this.state.COURSE_ID) {
                                            return (
                                                <MenuItem value={row.SECTION_ID}>{row.SECTION_ID}</MenuItem>
                                            );
                                        }
                                        ;
                                    })) || <MenuItem value=''>None</MenuItem>};
                                    <option value={""}>None</option>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="section-helper">Room</InputLabel>
                                <Select
                                    input={<Input name="Room" id="room-helper"/>}
                                    className={classes.Select}
                                    name="ROOM_ID"
                                    value={this.state.ROOM_ID}
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
                        <div className={classes.DTContainer}>
                            <TextField
                                className={classes.TextField}
                                id="datetime-local"
                                label="Event Start"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="START_TIME"
                                value={this.state.START_TIME}
                                onChange={this.handleChange}
                            />
                            <TextField
                                className={classes.TextField}
                                id="datetime-local"
                                label="Event End"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="END_TIME"
                                value={this.state.END_TIME}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button
                                className={classes.button}
                                variant="raised"
                                onClick={this.handleSave.bind(this)}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(EventForm);
