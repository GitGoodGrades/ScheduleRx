import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import EventView from '../../../Base Components/eventView';
import * as action from '../../../Redux/actions/actionCreator';

//On This Home Page, We can Assume that it is a Student, Therefore Reducing the code we must write
// We don't have to check anymore (Woohoo!)

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

class Home extends Component {
    state = {events: []};

    componentDidMount() {
        this.props.onLoad(this.props.user, this.props.role)
            .then(() => {
                const events = this.props.calendar;
                events && events.map(obj => {
                    obj.START_TIME = moment(obj.START_TIME).toDate();
                    obj.END_TIME = moment(obj.END_TIME).toDate();
                });
                this.setState({events});
            });
    }
    
    handleSelectSlot = () => {
        console.log();
    }

    handleSelectEvent = (event) => {
        this.setState({event})
    }
    render() {
        return (
            <div
                className="rbc-calendar"
            >
                <Calendar 
                    events={this.state.events}
                    handleEventSelection={this.handleSelectEvent} 
                    handleSlotSelection={this.handleSelectSlot}
                />
                <EventView event={this.state.event} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);