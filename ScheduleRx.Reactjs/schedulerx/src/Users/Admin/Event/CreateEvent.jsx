import React, { Component } from 'react';
import EventForm from './components/EventForm';
import { connect } from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import moment from 'moment';
import { client } from '../../../configuration/client';
import { Admin } from '../../../configuration/variables';
import EventCalendar from './components/EventCalendar';
import EventDetailDialog from './components/EventDetailDialog';
import EventViewFullEdit from '../../../Base Components/eventViewFullEdit';
import ConflictDialog from './components/ConflictDialog';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import EventView from '../../../Base Components/eventView';

const mapStateToProps = (state) => ({
    courses: state.courseList,
    rooms: state.roomList,
    sections: state.sectionList,
    current_schedule: state.currentSchedule,
    registration_schedule: state.registrationSchedule,
    events: state.adminCalendar,
    redirected: state.redirected,
    redirect_date: state.redirect_date,
    redirected_event: state.redirect_event,
    leadsCourses: state.leadsCourses,
    users: state.userList, 
    user: state.userName,
    myRole: state.userRole
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
    loadSchedules: () => dispatch(action.searchSchedules()),
    loadLeads: () => dispatch(action.searchLeadsCourses()),
    clearGlobals: () => dispatch(action.clearEditGlobals()),
    adminCal: () => dispatch(action.adminCalendar()),
    getUsers: () => dispatch(action.searchUsers())
});

class CreateEvent extends Component {
    state = {
        conflict_List: null,
        conflictDialogOpen: false,
        conflictFlag: false,
        conflictRequestString: "",
        course: null,
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
        openEventView: false,
        original: {},
        registration: {},
        restart: null,
        room: null,
        sections: null,
        start: '',
        temp: {},
        title: "",
        myCourses: null
    };

    handleAddEvent = (event) => {
        let temp = this.state.events;
        temp.push(event);
        this.setState({events: temp})
    }

    handleSpliceEvent = (event) => {
        let temp = this.state.events;
        
        temp.map(old => {
            if(old.BOOKING_ID === event.BOOKING_ID){
                temp.splice(temp.indexOf(old), 1);
            }
        });
        temp.push(event);
        this.setState({events: temp})
    }

    cancel = () => {
      this.setState({
        dialogOpen: false
      })
    };

    componentWillReceiveProps = (nextProps) => {
        let myCourses = [];
        nextProps.myRole !== Admin &&
        nextProps.leadsCourses && 
        nextProps.leadsCourses.length > 0 && 
        nextProps.leadsCourses.map(row => {
            if(row.USER_ID === nextProps.user){
                myCourses.push({COURSE_ID: row.COURSE_ID})
            }
        })

        if(myCourses.length > 0){
            this.setState({
                myCourses: myCourses
            })
        }


        if(nextProps.redirected) {
            this.setState({
                open: true,
                event: nextProps.redirected_event
            })
        }

        this.setState({
            events: nextProps.events,
            registration: nextProps.registration_schedule,
            current: nextProps.current_schedule,
            redirect_date: nextProps.redirect_date,
            redirected: nextProps.redirected
        })
    };

    componentDidMount() {
        this.props.loadCourses();
        this.props.loadRooms();
        this.props.loadSections();
        this.props.loadSchedules();
        this.props.loadLeads();
        this.props.adminCal();
        this.props.getUsers();
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
        if(moment(this.state.start).isBetween(
            this.props.current_schedule.START_SEM_DATE,
            this.props.current_schedule.END_SEM_DATE)){
                return this.props.current_schedule;
        }
        else if(moment(this.state.start).isBetween(
            this.props.registration_schedule.START_SEM_DATE,
            this.props.registration_schedule.END_SEM_DATE)){
                return this.props.registration_schedule;
        }
        else{
            return null;
        }
    };

    handleChange = (name, value) => {
        let sections = [];
        if(name == 'sections'){
            let check = value;
            if(!Array.isArray(check)){
                sections = value.split(',');
            } else {
                value && value.map(element => {
                    sections.push(element.value)
                })
            }
            this.setState({sections: sections})
        }else{
            this.setState({
            [name]:value
        });
        }
        
        
    };

    handleClose = () => {
        this.setState({ open: false})
        this.props.clearGlobals();
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
        let { redirected, redirected_event, leadsCourses } = this.props;
        this.setState({
            message: message
        });

        this.state.conflict_List && this.state.conflict_List.length > 0 && this.state.conflict_List.map(conflict => {
            conflicts.push(conflict.BOOKING_ID);
        });

        let x = this.state.temp;
         
        if(redirected){
                let userId = null;
                let oldEvent = redirected_event;
                let course = redirected_event.SECTIONS && redirected_event.SECTIONS.records && redirected_event.SECTIONS.records[0].COURSE_ID;
                leadsCourses && leadsCourses.map(lead => {
                    if(lead.COURSE_ID === course){
                        userId = lead.USER_ID;
                    }
                })
                client.post('messages/create.php', {
                    USER_ID: userId,
                    MESSAGE: `The event titled ${oldEvent.BOOKING_TITLE} in room ${oldEvent.ROOM_ID} on 
                    ${moment(oldEvent.START_TIME).format("MMM Do YY")} at ${moment(oldEvent.START_TIME).format("h:mm a")} has been
                    edited. It is now in room ${this.state.temp.ROOM_ID} at  ${moment(this.state.temp.START_TIME).format('MMMM Do YYYY, h:mm:ss a')}`
                });
                this.props.clearGlobals();
                this.props.history.push("/conflicts"); 
            }

        let temp = {
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
        }    

        client.post(`Bookings/Create.php`, {
            ...temp
        }).then(res => {
            let temp = this.state.events;
            temp.push(res.data);
            this.setState({events: temp})
        })

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

    handleEditClose = () => {
        this.setState({
            open: false
        })
    }

    handleEdit = (event, originalEvent) => {
        this.save(event, false, event.START_TIME);
        this.setState({
            open: false,
            edit: true
        })
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

    handleViewClose = () => {
        this.setState({
            openEventView: false
        })
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
                if((!moment(start).isBetween(
                    this.props.registration_schedule.START_SEM_DATE,
                    this.props.registration_schedule.END_SEM_DATE)) 
                    || 
                    (!moment().isBetween(
                        this.props.registration_schedule.START_REG_DATE,
                        this.props.registration_schedule.END_REG_DATE))){

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
                    if(this.state.edit === true){
                        client.post(`Bookings/Delete.php`, {
                            BOOKING_ID: event.BOOKING_ID
                        }).then(res => {
                            let temp = this.state.events;
                            temp.map(old => {
                                if(old.BOOKING_ID === event.BOOKING_ID){
                                    temp.splice(temp.indexOf(old), 1);
                                }
                            })
                            this.setState({
                                dialogOpen: false,
                                event: false
                            })})
                    }
                    if(this.props.redirected){
                        let userId = null;
                        let oldEvent = this.props.redirected_event;
                        let course = this.props.redirected_event.SECTIONS && this.props.redirected_event.SECTIONS.records && this.props.redirected_event.SECTIONS.records[0].COURSE_ID;
                        this.props.leadsCourses && this.props.leadsCourses.map(lead => {
                            if(lead.COURSE_ID === course){
                                userId = lead.USER_ID;
                            }
                        })
                        client.post('messages/create.php', {
                            USER_ID: userId,
                            MESSAGE: `The event titled ${oldEvent.BOOKING_TITLE} in room ${oldEvent.ROOM_ID} on 
                            ${moment(oldEvent.START_TIME).format("MMM Do YY")} at ${moment(oldEvent.START_TIME).format("h:mm a")} has been
                            edited. It is now in room ${event.ROOM_ID} at  ${moment(event.START_TIME).format('MMMM Do YYYY, h:mm:ss a')}`
                        });
                        this.props.clearGlobals();
                        this.props.history.push("/conflicts"); 
                    }
                }
                else {
                    this.handleConflict(temp, event, repeat, start)
                }
            }
        }); 
    }

    selectEvent = (event) => {
        let eventStartTime = moment(event.START_TIME);
        let today = moment();
        if(today.isAfter(eventStartTime)) {
            this.setState({
                event,
                openEventView: true
            })
        }
        else {
            this.setState({event, open: true})
        }
    };

    selectSlot = (slot) => {
        if(this.state.room && this.state.course && this.state.sections && this.state.sections != '' && moment(slot.start).isAfter(moment())){
            this.setState({
                start: moment(slot.start).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(slot.end).format('YYYY-MM-DD HH:mm:ss'),
                dialogOpen: true
            });
        }
        
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
                  courseList={this.state.myCourses ? this.state.myCourses : this.props.courses}
                  roomList={this.props.rooms}
                  sectionList={this.props.sections}
                  onChange={this.handleChange}
                />

                <EventCalendar 
                    events={this.state.events}
                    handleSelectEvent={this.selectEvent}
                    handleSelectSlot={this.selectSlot} 
                    style={{zIndex: 0}}
                    conflictBookingId={this.props.redirected_event && this.props.redirected_event.BOOKING_ID}
                    date={this.props.redirected ? this.props.redirect_date : new Date()}
                    users={this.props.users}
                    rooms={this.props.rooms}
                />
                <EventDetailDialog 
                    start={this.state.start} 
                    end={this.state.end}
                    open={this.state.dialogOpen}
                    onSave={this.handleSave}
                    onChange={this.handleChange}
                    onCancel={this.cancel}
                />
                <EventView
                    event={this.state.event} 
                    open={this.state.openEventView} 
                    onClose={this.handleViewClose} 
                    courseList={this.state.myCourses ? this.state.myCourses : this.props.courses} 
                    sectionList={this.props.sections} 
                    roomList={this.props.rooms} 
                />
                <EventViewFullEdit 
                    event={this.state.event} 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    courseList={this.props.courses} 
                    sectionList={this.props.sections} 
                    roomList={this.props.rooms} 
                    onSave={this.handleEdit}
                    delete={this.handleDelete}
                    spliceEvent={this.handleSpliceEvent}/>
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
