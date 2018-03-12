import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Calendar from '../../../../Base Components/Calendar';



class EventCalendar extends Component{
    state = {
      view: 'week'
    };

    selectEvent = (event) => {
        this.props.handleSelectEvent(event);
    }

    selectSlot = (slot) => {
        this.props.handleSelectSlot(slot);

    }

    render(){
        return(
           <Calendar events={this.props.events} handleEventSelection={this.selectEvent} handleSlotSelection={this.selectSlot}
             defaultView={this.state.view}
             views={['month', 'week', 'day']}
             step={5}
             timeslots={6}

          />
        )
    }

}

export default EventCalendar;
