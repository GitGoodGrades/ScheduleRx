import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import axios from "axios/index";
import CourseDropDown from "./CourseDropDown";

class EventForm extends React.Component {
    /**constructor() {
        super();
        this.state = {
            SCHEDULE_ID: '',
            COURSE_ID: '',
            SECTION_ID: '',
            ROOM_ID: '',
            START_TIME: '',
            END_TIME: ''
        };
    }*/

    constructor() {
        super();
        this.state = {
            BOOKING_ID: '',
            COURSE_ID: '',
            ROOM_ID: '',
            START_TIME: '',
            END_TIME: ''
        };
    }

    /**handleSave = () => {
        this.props.onSave(this.state.SCHEDULE_ID,  this.state.COURSE_ID, this.state.SECTION_ID, this.state.ROOM_ID, this.state.START_TIME, this.state.END_TIME);
    };*/

    handleSave = () => {
         this.props.onSave(this.state.BOOKING_ID, this.state.COURSE_ID, this.state.ROOM_ID, this.state.START_TIME, this.state.END_TIME);
    };

    getCourseList = () => courseList => {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Courses/Index.php`)
            .then(res => {
                courseList = res.data;
            });
    };

    render() {
        return (
            <Paper>
                <form>
                    <CourseDropDown courseList={this.getCourseList}/>
                </form>
                <Button variant="raised" onClick={this.handleSave} >
                    Save
                </Button>
            </ Paper>
        );
    }
}

export default EventForm;
