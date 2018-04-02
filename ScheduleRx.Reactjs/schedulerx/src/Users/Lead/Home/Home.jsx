import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import EventView from '../../../Base Components/eventView';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import { client } from '../../../configuration/client';


const styles = theme => ({
    root: {

    },
    container: {
        paddingTop: 10,
        paddingBottom:  10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: '5px',
        marginTop: 60,
        overflow: 'hidden',
    },
    cal: {
        height: '50%',
    }
});


const mapStateToProps = (state) => ({
    role: state.userRole,
    user: state.userName,
    semester: state.semester,
    schedule: state.currentSchedule,
    events: state.userCalendar,
    courses: state.courseList,
    rooms: state.roomList,
    sections: state.sectionList,
    current_schedule: state.currentSchedule,
    registration_schedule: state.registrationSchedule,
    conflict_List: state.conflictList,
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (user, role) => dispatch(action.userCalendar(user, role)),
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
    loadSchedules: () => dispatch(action.searchSchedules()),
    getConflictEvents: () => dispatch(action.searchConflicts())
});

class EmptyHome extends Component {
    state = {
        events: [],
        event: {},
        open: false
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.events})
    }

    componentDidMount() {
        this.props.onLoad(this.props.user, this.props.role),
        this.props.loadCourses(),
        this.props.loadRooms(),
        this.props.loadSections(),
        this.props.loadSchedules();
    }

    handleSelectSlot = () => {
        console.log();
    }

    handleSelectEvent = (event) => {
        this.setState({event, open: true})
    }

    handleClose = () => {
        this.setState({ open: false})
    }

    handleSave = (event) => {        
        this.save(event);
    }

    save = (event) => {
        let scheduleID = null;
        this.props.getConflictEvents(event.START_TIME, event.END_TIME);
        let conflicts = this.props.conflict_List;

        client.post(`Bookings/Delete.php`, {
            BOOKING_ID: event.BOOKING_ID
        });

        let temp = this.state.events;
        temp.map(old => {
            if(old.BOOKING_ID === event.BOOKING_ID){
                temp.splice(temp.indexOf(old), 1);
            }
        })

        if(conflicts == null){
            if(moment(event.START_TIME).isBetween(
                this.props.current_schedule.START_SEM_DATE,
                this.props.current_schedule.END_SEM_DATE)){

                scheduleID = null;
                // CREATE REQUEST LOGIC HERE

            } else if (moment(event.START_TIME).isBetween(
                this.props.registration_schedule.START_SEM_DATE,
                this.props.registration_schedule.END_SEM_DATE)){
                    scheduleID = this.props.registration_schedule.SCHEDULE_ID;
            }
        } else {
            //conflict logic
        }

        client.post(`Bookings/Create.php`, {
            SCHEDULE_ID: scheduleID,
            COURSE_ID: event.course,
            SECTION_ID: event.sections,
            ROOM_ID: event.room,
            START_TIME: event.START_TIME,
            END_TIME: event.END_TIME,
            BOOKING_TITLE: event.title,
            NOTES: event.details
        })
            .then(res => {
                temp.push(res.data);
                this.setState({events: temp})
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
          open: false
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div
                className={classes.root}
            >
                <div className={classes.container}>
                <Calendar
                    className={classes.cal}
                    events={this.state.events}
                    handleEventSelection={this.handleSelectEvent}
                    handleSlotSelection={this.handleSelectSlot}
                    views={['month', 'week', 'day']}
                />
                <EventView 
                    event={this.state.event} 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    courseList={this.props.courses} 
                    sectionList={this.props.sections} 
                    roomList={this.props.rooms} 
                    onSave={this.handleSave}/>
            </div>
        </div>
        )
    }
}

const Home = withStyles(styles, {withTheme: true})(EmptyHome);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
