import React, { Component } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';

class CreateEvent extends Component {

    state = {
        courseList: [],
        sectionList: [],
        roomList: [],
        scheduleList: [],
        scheduleID: ''
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

        // axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Schedule/Index.php`)
        //     .then(res => {
        //         this.setState({scheduleList: res.data}, this.getScheduleID)
        // });


    }

    // getScheduleID = () => {
    //     this.state.scheduleList.records && this.state.scheduleList.records.map(row => {
    //         if (row.IS_ARCHIVED === "0" && row.IS_RELEASED === "0") {
    //             this.setState({scheduleID: row.SCHEDULE_ID});
    //         }
    //     })
    // };



    handleSave(course, section, room, start, end, scheduleID) {

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Bookings/Create.php`, {
            SCHEDULE_ID: scheduleID,
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