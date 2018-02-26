import React, { Component } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';

class CreateEvent extends Component {

    state = {
        courseList: [],
        sectionList: [],
        roomList: [],
        scheduleId: null
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Courses/Index.php`)
            .then(res => {
                this.setState({courseList: res.data})
            });

        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Room/Index.php`)
            .then(res => {
                this.setState({roomList: res.data})
            });
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Section/Index.php`)
            .then(res => {
                this.setState({sectionList: res.data})
            });


    }

    // function checkSchedule() {
    //
    // }


    handleSave(course, section, room, start, end) {
        let scheduleId = "";
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Schedule/Index.php`)
            .then(res => {
                (res.data.records && res.data.records > 0 && res.data.records.map(row => {
                    if(!row.IS_RELEASED && !row.IS_ARCHIVED)
                        scheduleId = row.SCHEDULE_ID;
                }))
        ;});
        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Bookings/Create.php`, {
            SCHEDULE_ID: scheduleId,
            COURSE_ID: course,
            SECTION_ID: section,
            ROOM_ID: room,
            START_TIME: start,
            END_TIME: end
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return(
            <div>
                <EventForm
                    onSave={this.handleSave}
                    courseList={this.state.courseList}
                    roomList={this.state.roomList}
                    sectionList={this.state.sectionList}
                />
            </div>
        );
};
}
export default CreateEvent;