import React, { Component } from 'react';
import axios from 'axios';
import EventForm from '../../components/EventForm';
import Home from '../../../Home/Home';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    role: state.userRole,
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
        if(this.props.role === '' || this.props.role ==='3'){
            return (
              <Home />      
            )
          }
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
export default connect(mapStateToProps)(CreateEvent);