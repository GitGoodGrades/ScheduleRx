import React, { Component } from 'react';
import EventForm from '../../Admin/Event/components/EventForm';
import { connect } from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import moment from 'moment';
import { client } from '../../../configuration/client';
import EventCalendar from '../../Admin/Event/components/EventCalendar';
import EventDetailDialog from '../../Admin/Event/components/EventDetailDialog';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
    user: state.userName,
    courses: state.myCourses,
    rooms: state.roomList,
    sections: state.sectionList,
    current_schedule: state.currentSchedule,
    registration_schedule: state.registrationSchedule,
    conflict_List: state.conflictList,
    events: state.adminCalendar,
    open: false
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourses: (user) => dispatch(action.searchLeadCourses(user)),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
    loadSchedules: () => dispatch(action.searchSchedules()),
    getConflictEvents: () => dispatch(action.searchConflicts())
});

class CreateEvent extends Component {
    state = {
      start: '',
      end: '',
      sections: [],
      course: '',
      room: '',
      dialogOpen: false, 
      events: []
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.events})
    }

    componentDidMount() {
        this.props.loadCourses(this.props.user);
        this.props.loadRooms();
        this.props.loadSections();
        this.props.loadSchedules();
    };

    handleChange = (name, value) => {
      this.setState({
        [name]:value
      });
    };

    handleSave = (title, details) => {
        let scheduleID = null;
        this.props.getConflictEvents(this.state.start, this.state.end);

        if(this.props.conflict_List === null){
            if(moment(this.state.start).isBetween(
                this.props.current_schedule.START_SEM_DATE,
                this.props.current_schedule.END_SEM_DATE)){

                scheduleID = null;
                // CREATE REQUEST LOGIC HERE

            } else if (moment(this.state.start).isBetween(
                this.props.registration_schedule.START_SEM_DATE,
                this.props.registration_schedule.END_SEM_DATE)){
                    scheduleID = this.props.registration_schedule.SCHEDULE_ID;
            }
        } else {
            //conflict logic
        }

        client.post(`Bookings/Create.php`, {
            SCHEDULE_ID: scheduleID,
            COURSE_ID: this.state.course,
            SECTION_ID: this.state.sections,
            ROOM_ID: this.state.room,
            START_TIME: this.state.start,
            END_TIME: this.state.end,
            BOOKING_TITLE: title,
            NOTES: details
        })
            .then(res => {
                let temp = this.state.events;
                temp.push(res.data);
                this.setState({events: temp})
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
          dialogOpen: false
        });
    }

    cancel = () => {
      this.setState({
        dialogOpen: false
      })
    }

    selectEvent = (event) => {
        console.log(event);
    }

    selectSlot = (slot) => {
        this.setState({
          start: moment(slot.start).format('YYYY-MM-DD hh:mm:ss'),
          end: moment(slot.end).format('YYYY-MM-DD hh:mm:ss'),
          dialogOpen: true
        });
    }

    render(){
        return(
            <div style={{display:'inline'}}>
                <EventForm
                  courseList={this.props.courses}
                  roomList={this.props.rooms}
                  sectionList={this.props.sections}
                  onChange={this.handleChange}
                />

                <EventCalendar events={this.props.events} handleSelectEvent={this.selectEvent} handleSelectSlot={this.selectSlot}

                />
              <EventDetailDialog start={this.state.start} end={this.state.end} open={this.state.dialogOpen} onSave={this.handleSave} onCancel={this.cancel} />
            </div>
        );
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));
