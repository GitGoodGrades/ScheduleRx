import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment Object

BigCalendar.momentLocalizer(moment); 

const Calendar = props => (
  <div className="text-center">
    <BigCalendar
      {...this.props}
      style={{minHeight: 500, overflow: 'auto'}}
      events={props.events}
      titleAccessor="COURSE_ID"
      startAccessor='START_TIME'
      endAccessor='END_TIME'
      defaultDate={new Date()}
    />
  </div>
);
export default Calendar;
