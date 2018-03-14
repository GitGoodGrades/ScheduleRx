import React, { Component } from 'react';
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
        let time = new Date(new Date().setHours(6));
        return(
           <Calendar events={this.props.events} handleEventSelection={this.selectEvent} handleSlotSelection={this.selectSlot}
             defaultView={this.state.view}
             views={['month', 'week', 'day']}
             step={5}
             timeslots={6}
             scrollToTime={time.setMinutes(0)}

          />
        )
    }

}

export default EventCalendar;
