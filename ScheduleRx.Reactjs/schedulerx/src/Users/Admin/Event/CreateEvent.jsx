import React, { Component } from 'react';
import EventForm from './components/EventForm';
import { connect } from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import moment from 'moment';
import { client } from '../../../configuration/client';
import EventCalendar from './components/EventCalendar';
import EventDetailDialog from './components/EventDetailDialog';
import ConflictDialog from './components/ConflictDialog';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
    courses: state.courseList,
    rooms: state.roomList,
    sections: state.sectionList,
    current_schedule: state.currentSchedule,
    registration_schedule: state.registrationSchedule,
    events: state.adminCalendar,
    open: false
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
    loadSchedules: () => dispatch(action.searchSchedules()),
});

class CreateEvent extends Component {
    state = {
      start: '',
      end: '',
      sections: [],
      course: '',
      room: '',
      dialogOpen: false,
      events: [],
      courses: [],
      current: {},
      registration: {},
      title: "",
      details: "",
      conflictFlag: false,
      conflictRequestString: "",
      conflictDialogOpen: false,
      message: "",
        conflict_List: null
    };
    /*
     searchConflicts = (start, end, room) => {
            client.post(`Bookings/Conflict.php`, {
                START_TIME: start,
                END_TIME: end,
                ROOM_ID: room
            })
                .then(res => {
                    return res.data;
                });
    }; */

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            events: nextProps.events,
            registration: nextProps.registration_schedule,
            current: nextProps.current_schedule
        })
    };

    componentDidMount() {
        this.props.loadCourses();
        this.props.loadRooms();
        this.props.loadSections();
        this.props.loadSchedules();
    };

    handleChange = (name, value) => {
      this.setState({
        [name]:value
      });
    };

    valid = () => {
        let complete = false;
        if (this.state.course !== "" && this.state.room !== "" && this.state.sections.length !== 0)  {
            complete = true;
        }
        return complete;
    };

    save = () => {
        let scheduleID = null;
        let message = null;
        let conflictFlag = false;
        if(this.state.conflict_List == null){
            if(moment(this.state.start).isBetween(
                this.props.current_schedule.START_SEM_DATE,
                this.props.current_schedule.END_SEM_DATE)){

                scheduleID = null;
                conflictFlag = true;
                this.setState({
                    conflictRequestString: "You are attempting to create an event outside of the semester's registration period. To continue, enter a message below explaing why you need to create this event, and click \"Send Request\" to send your schedule request to the administrator.",
                    conflictFlag: true,
                    dialogOpen: false,
                    conflictDialogOpen: true
                });

            } else if (moment(this.state.start).isBetween(
                this.props.registration_schedule.START_SEM_DATE,
                this.props.registration_schedule.END_SEM_DATE)){
                    scheduleID = this.props.registration_schedule.SCHEDULE_ID;
            }
        } else {
            this.setState({
                conflictRequestString: "This event's time and room conflicts with an existing event. To continue, enter a message below explaining why you need this room at this time, and click \"Send Request\" to send your schedule request to the administrator.",
                conflictFlag: true,
                dialogOpen: false,
                conflictDialogOpen: true
            });

            conflictFlag = true;
        }

        if(!conflictFlag){
            client.post(`Bookings/Create.php`, {
                SCHEDULE_ID: scheduleID,
                COURSE_ID: this.state.course,
                SECTION_ID: this.state.sections,
                ROOM_ID: this.state.room,
                START_TIME: this.state.start,
                END_TIME: this.state.end,
                BOOKING_TITLE: this.state.title,
                NOTES: this.state.details
            }).then(res => {
                    let temp = this.state.events;
                    temp.push(res.data);
                    this.setState({events: temp})
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    doHandleSave = (title, details) => {
        this.handleSave(title, details);
    };
    
    handleSave = (title, details) => {
        let self = this;
        client.post(`Bookings/Conflict.php`, {
            START_TIME: this.state.start,
            END_TIME: this.state.end,
            ROOM_ID: this.state.room
        })
            .then(res => {
                self.setState({conflict_List: res.data});
                if(!this.valid() && title !== null) {
                    //User Feedback That Input was Invalid
                    return null;
                }

                self.save();

                self.setState({
                    dialogOpen: false,
                    title,
                    details
                });
            });
    };

    handleConflictSave = (message) => {
        let conflicts = [];
        this.props.conflict_List && this.props.conflict_List.length > 0 && this.props.conflict_List.map(conflict => {
            conflicts.push(conflict.BOOKING_IDs);
        });

        client.post(`Bookings/Create.php`, {
            SCHEDULE_ID: null,
            COURSE_ID: this.state.course,
            SECTION_ID: this.state.sections,
            ROOM_ID: this.state.room,
            START_TIME: this.state.start,
            END_TIME: this.state.end,
            BOOKING_TITLE: this.state.title,
            NOTES: this.state.details,
            BOOKING_IDs: conflicts,
            MESSAGE: this.state.message
        }).catch(function (error) {
                console.log(error);
            });

        this.setState({
            conflictDialogOpen: false
        })
    };

    cancel = () => {
      this.setState({
        dialogOpen: false
      })
    };

    selectEvent = (event) => {
        console.log(event);
    };

    selectSlot = (slot) => {
        this.setState({
          start: moment(slot.start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(slot.end).format('YYYY-MM-DD HH:mm:ss'),
          dialogOpen: true
        });
    };

    render(){
        return(
            <div style={{paddingTop: 35}}>
                <EventForm
                  courseList={this.props.courses}
                  roomList={this.props.rooms}
                  sectionList={this.props.sections}
                  onChange={this.handleChange}
                />

                <EventCalendar 
                    events={this.state.events}
                    handleSelectEvent={this.selectEvent}
                    handleSelectSlot={this.selectSlot} 
                    style={{zIndex: 0}}
                />
                <EventDetailDialog 
                    start={this.state.start} 
                    end={this.state.end}
                    open={this.state.dialogOpen}
                    onSave={this.doHandleSave}
                    onChange={this.handleChange}
                    onCancel={this.cancel}
                />
                <ConflictDialog
                    onConflictSave={this.handleConflictSave}
                    onConflictChange={this.handleConflictChange}
                    onConflictCancel={this.handleConflictCancel}
                    conflictRequestString={this.state.conflictRequestString}
                />
            </div>
        );
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));
