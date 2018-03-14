import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';
import EventView from '../../../Base Components/eventView';

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
    state = {
        events: [],
        event: {},
        open: false
    };

    componentDidMount() {
        this.props.onLoad(this.props.user, this.props.role)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.calendar})
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
                <EventView event={this.state.events} open={this.state.open} onClose={this.handleClose} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);