import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const styles = theme =>({
    container: {

    },
    courseSelect: {
        autoWidth: 'true'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    sectionSelect: {

    }
});

class EventForm extends Component {
    state = {
            SCHEDULE_ID: '',
            COURSE_ID: '',
            SECTION_ID: '',
            ROOM_ID: '',
            START_TIME: '',
            END_TIME: ''
        };

    handleSave = () => {
        this.props.onSave(this.state.COURSE_ID, this.state.SECTION_ID, this.state.ROOM_ID, this.state.START_TIME, this.state.END_TIME);
    };


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const {classes} = this.props;
        return (
            <Paper>
                <form className={classes.container}>
                    <FormControl>
                        <InputLabel>Course</InputLabel>
                        <Select
                            className={classes.courseSelect}
                            name="COURSE_ID"
                            value={this.state.COURSE_ID}
                            onChange={this.handleChange}
                        >
                            {(this.props.courseList.records && this.props.courseList.records.length > 0 && this.props.courseList.records.map(row => {
                                    return (
                                        <MenuItem value={row.COURSE_ID}>{row.COURSE_ID}</MenuItem>
                                    )
                                })) || <MenuItem>None</MenuItem>};
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Section</InputLabel>
                        <Select
                            className={classes.sectionSelect}
                            name="SECTION_ID"
                            value ={this.state.SECTION_ID}
                            onChange={this.handleChange}
                        >
                            {(this.props.sectionList.records && this.props.sectionList.records.length > 0 && this.props.sectionList.records.map(row => {
                                    if (row.COURSE_ID === this.state.COURSE_ID) {
                                        return (
                                            <MenuItem value={row.SECTION_ID}>{row.SECTION_ID}</MenuItem>
                                        );

                                    };
                                })) || <MenuItem>None</MenuItem>};

                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Room</InputLabel>
                        <Select
                            className={classes.roomSelect}
                            name="ROOM_ID"
                            value={this.state.ROOM_ID}
                            onChange={this.handleChange}
                        >
                            {(this.props.roomList.records && this.props.roomList.records.length > 0 && this.props.roomList.records.map(row => {
                                    return (
                                        <MenuItem value={row.ROOM_ID}>{row.ROOM_ID}</MenuItem>
                                    );
                                })) || <MenuItem>None</MenuItem>};
                        </Select>
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="datetime-local"
                            label="Event Start"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                       shrink: true,
                            }}
                            name="START_TIME"
                            value={this.state.START_TIME}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            id="datetime-local"
                            label="Event End"
                            type="datetime-local"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="END_TIME"
                            value={this.state.END_TIME}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </form>
                <Button variant="raised" onClick={this.handleSave} >
                    Save
                </Button>
            </ Paper>
        );
    }
}

export default withStyles(styles)(EventForm);
