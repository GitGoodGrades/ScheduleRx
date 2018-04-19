import React, { Component } from 'react';
import Calendar from '../../../Base Components/Calendar';
import EventView from '../../../Base Components/eventView';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import { withStyles } from 'material-ui/styles';
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
        height: '90%',
    }
});

const mapStateToProps = (state) => ({
    events: state.adminCalendar,
    courses: state.courseList,
    rooms: state.roomList,
    sections: state.sectionList,
    users: state.userList
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.adminCalendar()),
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
    getUsers: () => dispatch(action.searchUsers())
});

class EmptyHome extends Component {
    state = { events: [], event: {}, open: false, date: new Date()};

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.events})
    }

    componentDidMount() {
        this.props.onLoad(),
        this.props.loadCourses(),
        this.props.loadRooms(),
        this.props.loadSections(), 
        this.props.getUsers()
    };
    handleSelectSlot = () => {
        console.log();
    }

    handleSelectEvent = (event) => {
        this.setState({event, open: true})
    }

    handleClose = () => {
        this.setState({ open: false})
    }

    filterEvents = (filter, option) => {
        if(filter === 'user' && option != null){
            client.post(`Bookings/MyEvents.php`,
                {
                    USER_ID: option,
                })
                .then(res => {
                    this.setState({events: res.data});
                })
        } else if (filter === 'room' && option != null){
            client.post(`Bookings/indexFilter.php`,
                {
                    FIELD: 'ROOM_ID',
                    VALUE: option
                })
                .then(res => {
                    this.setState({events: res.data});
                })
        } else if (filter === 'semester' && option != null){
            client.post(`Bookings/indexFilter.php`,
                {
                    FIELD: 'SEMESTER_ID',
                    VALUE: option
                })
                .then(res => {
                    this.setState({events: res.data});
                })
        } 
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
                    roomList={this.props.rooms} />
                </div>
            </div>
        )
    }
}
const Home =  withStyles(styles, {withTheme: true})(EmptyHome)

export default connect(mapStateToProps, mapDispatchToProps)(Home);