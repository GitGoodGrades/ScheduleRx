import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment Object

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {

  selectEvent = (event) => {
    this.props.handleEventSelection(event);
  }

  selectSlot = (slotInfo) => {
    this.props.handleSlotSelection(slotInfo)
  }

  render(){
    return(
    <div className="text-center">
      <BigCalendar
        {...this.props}
        selectable
        style={{minHeight: 500, overflow: 'auto'}}
        events={this.props.events.length > 0 ? this.props.events : [] }
        titleAccessor="COURSE_ID"
        startAccessor='START_TIME'
        endAccessor='END_TIME'
        defaultDate={new Date()}
        onSelectEvent={event => this.selectEvent(event)}
        onSelectSlot={slotInfo => this.selectSlot(slotInfo)}
      />
    </div>
    )
  }
}
export default Calendar;
