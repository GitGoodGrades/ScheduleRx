import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './react-big-calendar.css';
import {withStyles} from 'material-ui/styles';

// Setup the localizer by providing the moment Object

BigCalendar.momentLocalizer(moment);

const styles = theme => ({
});

class Calendar extends Component {
  state = {
    events: []
  };

  componentWillReceiveProps = (nextProps) => {
    let formattedEvents = [];

    for(let obj of nextProps.events){
      if (obj !== "") {
          obj.START_TIME = new Date(obj.START_TIME);
          obj.END_TIME = new Date(obj.END_TIME);
          formattedEvents.push(obj);
      }
    }

    this.setState({events: formattedEvents})
  };

  selectEvent = (event) => {
    this.props.handleEventSelection(event);
  };

  selectSlot = (slotInfo) => {
    this.props.handleSlotSelection(slotInfo)
  };

  render(){
    return(
    <div className="text-center">
      <BigCalendar
        {...this.props}
        selectable
        style={{height: 500}}
        events={this.props.events.length > 0 ? this.props.events : [] }
        titleAccessor="BOOKING_TITLE"
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
export default withStyles(styles)(Calendar);
