import React, { Component } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';

class CreateEvent extends Component {

    handleSave(bookingid, course, room, start, end) {

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Booking/Create.php`, {
            BOOKING_ID: bookingid,
            COURSE_ID: course,
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

    /**handleSave(schedule, course, section, room, start, end) {

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Booking/Create.php`, {
            SCHEDULE_ID: schedule,
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
    }*/

    render(){
        return(
            <div>
                <EventForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default CreateEvent;