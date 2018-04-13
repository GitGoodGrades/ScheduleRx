import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './react-big-calendar.css';
import {withStyles} from 'material-ui/styles';
import ReactToPrint from "react-to-print";

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

    this.setState({newDate: nextProps.date ? nextProps.date : new Date(), events: formattedEvents})
  };

  selectEvent = (event) => {
    this.props.handleEventSelection(event);
  };

  handleNavigate(date, view, action) {
    this.setState({newDate: moment(date).toDate()})
  }

  selectSlot = (slotInfo) => {
    this.props.handleSlotSelection(slotInfo)
  };

  render(){
    return(
      <div>
        
        <div className="text-center"
          ref={el => (this.componentRef = el)}
        >
        <BigCalendar
          {...this.props}
          selectable
          style={{height: 500}}
          events={this.props.events && this.props.events.length > 0 ? this.props.events : [] }
          titleAccessor="BOOKING_TITLE"
          startAccessor='START_TIME'
          endAccessor='END_TIME'
          date={this.state.date}
          onNavigate={this.handleNavigate}
          onSelectEvent={event => this.selectEvent(event)}
          onSelectSlot={slotInfo => this.selectSlot(slotInfo)}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: "lightgrey",
                color: 'black',
                borderRadius: "4px",
                marginLeft: "3px",
                marginRight: "2px"
              };
        
              if (event.SCHEDULE_ID == null){
                newStyle.backgroundColor = "tomato"
              }

              if (event.BOOKING_ID == this.props.conflictBookingId){
                borderRadius: "2px",
                newStyle.backgroundColor = "yellow"
              }

              return {
                className: "",
                style: newStyle
              };
            }
          }
        />
      </div>
      <ReactToPrint
            trigger={() => <a href="#">Print</a>}
            content={() => this.componentRef}
        />
    </div>
    )
  }
}
export default withStyles(styles)(Calendar);
