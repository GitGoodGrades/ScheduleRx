import React, { Component } from 'react';
import Calendar from '../../../Base Components/Calendar';
import EventView from '../../../Base Components/eventView';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';

const mapStateToProps = (state) => ({
    events: state.adminCalendar
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.adminCalendar())
});

class Home extends Component {
    state = { events: [], event: {}, open: false};

    componentDidMount() {
        this.props.onLoad();       
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
    render() {
        return (
            <div
                className="rbc-calendar"
            >
                <Calendar 
                    events={this.props.events}
                    handleEventSelection={this.handleSelectEvent} 
                    handleSlotSelection={this.handleSelectSlot}
                />
                <EventView event={this.state.event} open={this.state.open} onClose={this.handleClose} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);