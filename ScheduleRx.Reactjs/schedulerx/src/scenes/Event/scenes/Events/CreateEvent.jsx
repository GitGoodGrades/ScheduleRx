import React, { Component } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';

class CreateEvent extends Component {
    handleSave(course, section, room, start, end, schedule) {

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Course/Create.php`, {
            COURSE_ID: course,
            SECTION_ID: section,
            ROOM_ID: room,
            START_TIME: start,
            END_TIME: end,
            SCHEDULE_ID: schedule
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
                <EventForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default CreateEvent;