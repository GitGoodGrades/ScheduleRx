import React, { Component } from 'react';
import EventForm from './components/EventForm';
import { connect } from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import moment from 'moment';
import { client } from '../../../configuration/client';
import EventCalendar from './components/EventCalendar';
import EventDetailDialog from './components/EventDetailDialog';
import EventViewFullEdit from '../../../Base Components/eventViewFullEdit';
import ConflictDialog from './components/ConflictDialog';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
        conflict_List: null,
        conflictDialogOpen: false,
        conflictFlag: false,
        conflictRequestString: "",
        course: '',
        courses: [],
        current: {},
        details: "",
        details: "",
        dialogOpen: false,
        edit: false,
        end: '',
        event: {},
        events: [],
        flag: false,
        message: "",
        open: false,
        original: {},
        registration: {},
        restart: null,
        room: '',
        sections: [],
        start: '',
        temp: {},
        title: ""
    };

    cancel = () => {
      this.setState({
        dialogOpen: false
      })
    };

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

    createEvent = (event) => {
            client.post(`Bookings/Create.php`, {
                SCHEDULE_ID: event.SCHEDULE_ID,
                COURSE_ID: event.COURSE_ID,
                SECTION_ID: event.SECTION_ID,
                ROOM_ID: event.ROOM_ID,
                START_TIME:  event.START_TIME,
                END_TIME:  event.END_TIME,
                BOOKING_TITLE: event.BOOKING_TITLE,
                NOTES: event.NOTES
            }).then(res => {
                let temp = this.state.events;
                temp.push(res.data);
                this.setState({events: temp})
            })
    };

    getSchedule = () => {
        if(moment(this.state.START_TIME).isBetween(
            this.props.current_schedule.START_SEM_DATE,
            this.props.current_schedule.END_SEM_DATE)){
                return this.props.current_schedule;
        }
        else if(moment(this.state.START_TIME).isBetween(
            this.props.registration_schedule.START_SEM_DATE,
            this.props.registration_schedule.END_SEM_DATE)){
                return this.props.registration_schedule;
        }
        else{
            return null;
        }
    };

    handleChange = (name, value) => {
      this.setState({
        [name]:value
      });
    };

    handleClose = () => {
        this.setState({ open: false})
    };

    handleConflict = (temp, event, flag, start) => {
        this.setState({
            dialogOpen: false,
            conflictDialogOpen: true,
            temp: temp,
            event: event,
            flag: flag,
            restart: start
        })
    }

    handleConflictCancel = () => {
        if(this.state.edit){
            const { original } = this.state;
            this.save(original, false, original.START_TIME);
        }
        this.setState({
            conflictDialogOpen: false
        })
    }
    
    handleConflictSave = (message) => {
        let conflicts = [];
        this.setState({
            message: message
        });

        this.state.conflict_List && this.state.conflict_List.length > 0 && this.state.conflict_List.map(conflict => {
            conflicts.push(conflict.BOOKING_ID);
        });

        let x = this.state.temp;
        

        client.post(`Bookings/Create.php`, {
            SCHEDULE_ID: null,
            COURSE_ID: this.state.temp.COURSE_ID,
            SECTION_ID: this.state.temp.SECTION_ID,
            ROOM_ID: this.state.temp.ROOM_ID,
            START_TIME: this.state.temp.START_TIME,
            END_TIME: this.state.temp.END_TIME,
            BOOKING_TITLE: this.state.temp.BOOKING_TITLE,
            NOTES: this.state.temp.NOTES,
            BOOKING_IDs: conflicts,
            MESSAGE: message
        }).catch(function (error) {
                console.log(error);
            });

        this.setState({
            conflictDialogOpen: false
        })

        if(this.state.flag){
            this.save(this.state.event, true, this.state.restart);
        }
    };

    handleDelete = (id) => {
        client.post(`Bookings/Delete.php`, {
            BOOKING_ID: id
        });

        let temp = this.state.events;
        temp.map(old => {
            if(old.BOOKING_ID === id){
                temp.splice(temp.indexOf(old), 1);
            }
        });

        this.setState({
            events: temp,
            open: false
          });
    }

    handleEdit = (event, originalEvent) => {
        client.post(`Bookings/Delete.php`, {
            BOOKING_ID: event.BOOKING_ID
        }).then(res => {
            let temp = this.state.events;
            temp.map(old => {
                if(old.BOOKING_ID === event.BOOKING_ID){
                    temp.splice(temp.indexOf(old), 1);
                }
            })

            this.save(event, false, event.START_TIME);

            this.setState({
                open: false,
                events: temp,
                original: originalEvent
            })})
    }

    handleSave = (title, details, repeat) => {
        let self = this;
        client.post(`Bookings/Conflict.php`, {
            START_TIME: this.state.start,
            END_TIME: this.state.end,
            ROOM_ID: this.state.room
        })
        .then(res => {
            self.setState({conflict_List: res.data});
            if(!this.valid() && title !== null) {
                    return null;
            }

            let tempEvent = {
            course: this.state.course,
            sections: this.state.sections,
            room: this.state.room,
            START_TIME: this.state.start,
            END_TIME:  this.state.end,
            title: title,
            details: details
            };

            this.save(tempEvent, repeat, tempEvent.START_TIME);

            this.setState({
            dialogOpen: false,
            title,
            details
            });
        });
    }

    save = (event, repeat, start) => {
        let scheduleID = null;
        let schedule = this.getSchedule();
        let message = null;
        let conflictFlag = false;
        client.post(`Bookings/Conflict.php`, {
            START_TIME:  moment(start).format('YYYY-MM-DD HH:mm:ss'),
            END_TIME:   moment(start).format('YYYY-MM-DD ') + moment(event.END_TIME).format('HH:mm:ss'),
            ROOM_ID: event.room
        })
        .then(res => {
            if(res.data == "" || (res.data && res.data.length == 1 && res.data[0].BOOKING_ID === this.state.original.BOOKING_ID)){
                if(moment(this.start).isBetween(
                    this.props.current_schedule.START_SEM_DATE,
                    this.props.current_schedule.END_SEM_DATE)){

                    scheduleID = null;
                    conflictFlag = true;
                    this.setState({
                        conflictRequestString: "You are attempting to create an event outside of the semester's registration period. To continue, enter a message below explaining why you need to create this event, and click \"Send Request\" to send your schedule request to the administrator.",
                        conflictFlag: true,
                        conflict_List: []
                    });

                } else if (moment(start).isBetween(
                    this.props.registration_schedule.START_SEM_DATE,
                    this.props.registration_schedule.END_SEM_DATE)){
                        scheduleID = this.props.registration_schedule.SCHEDULE_ID;
                }
            } else {
                this.setState({
                    conflictRequestString: "This event's time and room conflicts with an existing event. To continue, enter a message below explaining why you need this room at this time, and click \"Send Request\" to send your schedule request to the administrator.",
                    conflictFlag: true,
                    conflict_List: res.data
                });

                conflictFlag = true;
            }

            let temp = {
                        SCHEDULE_ID: scheduleID,
                        COURSE_ID: event.course,
                        SECTION_ID: event.sections,
                        ROOM_ID: event.room,
                        START_TIME:  moment(start).format('YYYY-MM-DD HH:mm:ss'),
                        END_TIME:   moment(start).format('YYYY-MM-DD ') + moment(event.END_TIME).format('HH:mm:ss'),
                        BOOKING_TITLE: event.title,
                        NOTES: event.details
            }

            if (repeat) {
                if ((moment(start).isBetween(schedule.START_SEM_DATE, schedule.END_SEM_DATE))) {
                    if(!conflictFlag){
                        this.createEvent(temp);
                        this.save(event, true, moment(start).add(1, 'w'));
                    }
                    else {
                        this.handleConflict(temp, event, repeat, moment(start).add(1, 'w'))
                    }
                } else {
                    return null;
                };
            } else {
                if(!conflictFlag){
                    this.createEvent(temp);
                }
                else {
                    this.handleConflict(temp, event, repeat, start)
                }
            }
        }); 
    }

    selectEvent = (event) => {
        this.setState({event, open: true})
    };

    selectSlot = (slot) => {
        this.setState({
          start: moment(slot.start).format('YYYY-MM-DD HH:mm:ss'),
          end: moment(slot.end).format('YYYY-MM-DD HH:mm:ss'),
          dialogOpen: true
        });
    };

    valid = () => {
        let complete = false;
        if (this.state.course !== "" && this.state.room !== "" && this.state.sections.length !== 0)  {
            complete = true;
        }
        return complete;
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
                    onSave={this.handleSave}
                    onChange={this.handleChange}
                    onCancel={this.cancel}
                />
                <EventViewFullEdit 
                    event={this.state.event} 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    courseList={this.props.courses} 
                    sectionList={this.props.sections} 
                    roomList={this.props.rooms} 
                    onSave={this.handleEdit}
                    delete={this.handleDelete}/>
                <ConflictDialog
                    onConflictSave={this.handleConflictSave}
                    onConflictChange={this.handleConflictChange}
                    onConflictCancel={this.handleConflictCancel}
                    conflictRequestString={this.state.conflictRequestString}
                    open={this.state.conflictDialogOpen}
                />
            </div>
        );
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateEvent));
