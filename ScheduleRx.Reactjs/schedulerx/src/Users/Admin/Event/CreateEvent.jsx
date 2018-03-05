import React, { Component } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import { connect } from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import moment from 'moment';
import { client } from '../../../configuration/client';

const mapStateToProps = (state) => ({
    courses: state.courseList,
    rooms: state.roomList,
    sections: state.sectionList,
    current_schedule: state.currentSchedule,
    registration_schedule: state.registrationSchedule,
    conflict_List: state.conflictList
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
    loadSchedules: () => dispatch(action.searchSchedules()),
    getEvents: () => dispatch(action.searchConflicts())
});

class CreateEvent extends Component {
    componentDidMount() {
        this.props.loadCourses();
        this.props.loadRooms();
        this.props.loadSections();
        this.props.loadSchedules();
    }

    handleSave(course, section, room, start, end) {
        let scheduleID = null;
        this.props.getEvents(start, end);
        
        if(this.state.conflict_List === null){
            if(moment(start).isBetween(
                this.props.current_schedule.START_SEM_DATE, 
                this.props.current_schedule.END_SEM_DATE)){

                scheduleID = null;
                // CREATE REQUEST LOGIC HERE

            } else if (moment(start).isBetween(
                this.props.registration_schedule.START_SEM_DATE, 
                this.props.registration_schedule.END_SEM_DATE)){
                    scheduleID = this.props.registration_schedule.SCHEDULE_ID;
            }    
        } else {
            //conflict logic
        }

        client.post(`Bookings/Create.php`, {
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
                {
                this.props.courses && this.props.sections && this.props.rooms &&
                <EventForm
                    onSave={this.handleSave}
                    courseList={this.props.courses}
                    roomList={this.props.rooms}
                    sectionList={this.props.sections}
                    currentSchedule={this.props.current_schedule}
                    registrationSchedule={this.props.registration_schedule}
                    conflictList={this.props.conflict_List}
                />
                }
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);