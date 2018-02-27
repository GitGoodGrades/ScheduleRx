import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import theme from '../../../theme/index';


const styles = theme =>({
  Form: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  DDContainer: {
    display: 'inline',
  },
  DTContainer: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  TextField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  buttonContainer: {
    textAlign: 'right',
  },
  button: {
    margin: 'auto',
  }

});

class EventForm extends Component {
    state = {
            COURSE_ID: '',
            SECTION_ID: '',
            ROOM_ID: '',
            START_TIME: '',
            END_TIME: '',
            SCHEDULE_ID: ''
        };

    handleSave = () => {
        this.props.onSave(
            this.state.COURSE_ID,
            this.state.SECTION_ID,
            this.state.ROOM_ID,
            this.state.START_TIME,
            this.state.END_TIME,
            this.state.SCHEDULE_ID
        );
    };


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Schedule/Index.php`)
            .then(res => {
                res.data.records.map(row => {
                    console.log(row.SCHEDULE_ID)
                    if (row.IS_ARCHIVED === "0" && row.IS_RELEASED === "0") {
                        this.setState({SCHEDULE_ID: row.SCHEDULE_ID}, )
                    }
                })
            }
        );
    }


    render() {
        const {classes} = this.props;
        return (
            <Paper>
                <div className={classes.FormContainer}>
                  <form className={classes.Form}>
                    <div className={classes.DDContainer}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="course-helper">Course</InputLabel>
                          <Select
                              input={<Input name="Course" id="course-helper" />}
                              className={classes.Select}
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
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="section-helper">Section</InputLabel>
                          <Select
                              input={<Input name="Section" id="section-helper" />}
                              className={classes.Select}
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
                              })) || <MenuItem value=''>None</MenuItem>};
                              <option value={""}>None</option>
                            </Select>
                          </FormControl>
                          <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="section-helper">Room</InputLabel>
                            <Select
                                input={<Input name="Room" id="room-helper" />}
                                className={classes.Select}
                                name="ROOM_ID"
                                value={this.state.ROOM_ID}
                                onChange={this.handleChange}
                            >
                              {(this.props.roomList.records && this.props.roomList.records.length > 0 && this.props.roomList.records.map(row => {
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
                      onClick={this.handleSave}
                    >
                    Save
                  </Button>
                  </div>
                </form>
              </div>
            </ Paper>
        );
    }
}

export default withStyles(styles)(EventForm);
