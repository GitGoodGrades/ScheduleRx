import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import {connect} from 'react-redux';
import moment from 'moment';
import EventView from '../../../Base Components/eventView';
import * as action from '../../../Redux/actions/actionCreator';
import { withStyles } from 'material-ui/styles';
import CalendarFilter from '../../../Base Components/CalendarFilter';

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
    calendar: state.userCalendar
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (user, role) => dispatch(action.userCalendar(user, role))
});

class EmptyHome extends Component {
    state = {
        events: [],
        event: {},
        open: false,
        date: new Date()
    };

    componentDidMount() {
        this.props.onLoad(this.props.user, this.props.role);

    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.calendar})
    };

    handleSelectSlot = () => {
        console.log();
    };

    handleSelectEvent = (event) => {
        this.setState({event, open: true})
    };

    handleClose = () => {
        this.setState({ open: false})
    };

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
                    events={this.state.events}
                    handleEventSelection={this.handleSelectEvent}
                    handleSlotSelection={this.handleSelectSlot}
                    defaultDate={this.state.date}
                />
                <EventView event={this.state.event} open={this.state.open} onClose={this.handleClose} />
            </div>
        </div>
        )
    }
}

const Home = withStyles(styles)(EmptyHome);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
