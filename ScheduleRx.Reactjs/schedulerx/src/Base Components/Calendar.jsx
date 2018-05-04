import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './react-big-calendar.css';
import {withStyles} from 'material-ui/styles';
import ReactToPrint from "react-to-print";
import PrintIcon from 'material-ui-icons/Print';
import LoadWrapper from './LoadWrapper';
import { roomColors } from '../configuration/variables';
import Toolbar from './Toolbar';
import { Hidden, Button } from 'material-ui';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

// Setup the localizer by providing the moment Object

BigCalendar.momentLocalizer(moment);

const styles = theme => ({
});

class Calendar extends Component {
  state = {
    events: null,
    width: window.innerWidth,
    height: window.innerHeight,
    date: new Date()
  };

  componentWillReceiveProps = (nextProps) => {
    let formattedEvents = [];

    for(let obj of nextProps.events){
      if (obj !== "") {
          obj.START_TIME = new Date(obj.START_TIME);
          obj.END_TIME = new Date(obj.END_TIME);
          obj.TITLE = 
          `${obj.SECTIONS && obj.SECTIONS.records && obj.SECTIONS.records.length > 0 && obj.SECTIONS.records[0].COURSE_ID} ${obj.BOOKING_TITLE},  ${obj.ROOM_ID},  ${moment(obj.START_TIME).format("h:mm")}-${moment(obj.END_TIME).format("h:mm")}`;
          obj.SMALL = `${obj.SECTIONS && obj.SECTIONS.records && obj.SECTIONS.records.length > 0 && obj.SECTIONS.records[0].COURSE_ID}`
          formattedEvents.push(obj);
      }
    }

    this.setState({
      date: nextProps.defaultDate ? nextProps.defaultDate : this.state.date,
      events: formattedEvents
    })

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
    const height = this.state.height * 2;
    const min = new Date();
    const max = new Date();
    min.setHours(6, 0, 0);
    max.setHours(20, 0, 0);
    return(
      <div>
        <LoadWrapper open={this.state.events == null ? true : false}/>
        <div className="text-center"
          ref={el => (this.componentRef = el)}
        >
        
        <BigCalendar
          {...this.props}
          selectable
          style={{display: 'flex', minHeight: height}}
          events={this.props.events && this.props.events.length > 0 ? this.props.events : [] }
          titleAccessor={window.innerWidth < 960 ? "SMALL" : "TITLE"} 
          startAccessor='START_TIME'
          endAccessor='END_TIME'
          min={min}
          max={max} 
          date={this.state.date}
          components={{
            toolbar: Toolbar
          }}
          onNavigate={(date) => {
            this.setState({
              date,
            })}}
          onSelectEvent={event => this.selectEvent(event)}
          onSelectSlot={slotInfo => this.selectSlot(slotInfo)}
          eventPropGetter={
            (event, start, end, isSelected) => {
              let newStyle = {
                backgroundColor: 'white',
                color: 'black',
                borderRadius: "4px",
                border: '1px solid black',
                marginLeft: "3px",
                marginRight: "2px",
                fontWeight: 500,
                fontSize: 9,
                display: 'flex'
              };

              if(window.innerWidth < 600){
                newStyle.fontSize = 8
              }

              roomColors && roomColors.length > 0 && roomColors.map(row => {
                if(event.SECTIONS && 
                    event.SECTIONS.records && 
                    event.SECTIONS.records.length > 0 &&
                    event.SECTIONS.records[0].COURSE_ID == row.Course){
                      newStyle.borderBottom = `2px solid ${row.color}`
                      
                }
              })
        
              if (event.SCHEDULE_ID == null){
                newStyle.backgroundColor = "red",
                newStyle.fontWeight = '550'
                newStyle.color = 'white'
              }

              return {
                className: "",
                style: newStyle
              };
            }
          }
        />

      </div>
      <div style={{marginTop:"10px"}}>
      <ReactToPrint
            trigger={() => <a href="#">
              <Button 
                variant="raised"
                size="small"
                style={{backgroundColor: 'rgba(0,0,0,.7)', color: 'white'}}
              >
              <PrintIcon/>
            </Button></a>}
            content={() => this.componentRef}
        />
      </div>
    </div>
    )
  }
}
export default compose(withStyles(styles), withWidth())(Calendar);
