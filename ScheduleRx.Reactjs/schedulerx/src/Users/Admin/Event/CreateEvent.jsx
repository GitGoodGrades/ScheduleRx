import React, { Component } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    role: state.userRole,
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections())
});

class CreateEvent extends Component {

    state = {
        courseList: [],
        sectionList: [],
        roomList: [],
        scheduleList: [],
        scheduleID: ''
    };

    componentDidMount() {
        this.props.loadCourses;
        this.props.loadRooms;
        this.props.loadSections;
    }

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
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);