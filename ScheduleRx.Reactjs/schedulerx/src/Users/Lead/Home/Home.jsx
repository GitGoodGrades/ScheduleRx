import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import EventView from '../../../Base Components/eventView';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import { client } from '../../../configuration/client';
import CalendarFilter from '../../../Base Components/CalendarFilter'


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
        open: false,
        date: new Date()
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

    changeMonth = (newDate) => {
        this.setState({date: newDate})
      }

    render() {
        const {classes} = this.props;
        return (
            <div
                className={classes.root}
            >
                <div className={classes.container}>
                <CalendarFilter
                    userList={this.props.users}
                    roomList={this.props.rooms}
                    selectFilter={this.filterEvents}
                    changeCalendarDate={this.changeMonth}
                    hide
                />   
                <Calendar
                    className={classes.cal}
                    events={this.state.events}
                    handleEventSelection={this.handleSelectEvent}
                    handleSlotSelection={this.handleSelectSlot}
                    views={['month', 'week', 'day']}
                    defaultDate={this.state.date}
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
