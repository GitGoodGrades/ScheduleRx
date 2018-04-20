import React, { Component } from 'react';
import Calendar from '../../../../Base Components/Calendar';
import Menu, { MenuItem } from 'material-ui/Menu';
import CalendarFilter from '../../../../Base Components/CalendarFilter';
import { client } from '../../../../configuration/client';


class EventCalendar extends Component{
    state = {
      view: 'week', anchorEl: null
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.events, date: nextProps.date ? nextProps.date : null})
    }

    selectEvent = (event) => {
        this.props.handleSelectEvent(event);
    }

    selectSlot = (slot) => {
        this.props.handleSelectSlot(slot);

    }
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      filterEvents = (filter, option) => {
        if(filter === 'user' && option != null){
            client.post(`Bookings/MyEvents.php`,
                {
                    USER_ID: option,
                })
                .then(res => {
                    this.setState({events: res.data});
                })
        } else if (filter === 'room' && option != null){
            client.post(`Bookings/indexFilter.php`,
                {
                    FIELD: 'ROOM_ID',
                    VALUE: option
                })
                .then(res => {
                    this.setState({events: res.data});
                })
        } else if (filter === 'semester' && option != null){
            client.post(`Bookings/indexFilter.php`,
                {
                    FIELD: 'SEMESTER_ID',
                    VALUE: option
                })
                .then(res => {
                    this.setState({events: res.data});
                })
        } 
      }

      changeMonth = (newDate) => {
        this.setState({date: newDate})
      }
    

    render(){
        let time = new Date(new Date().setHours(6));
        const { anchorEl } = this.state;

        return(
            <div>
            <CalendarFilter
                userList={this.props.users}
                roomList={this.props.rooms}
                selectFilter={this.filterEvents}
                changeCalendarDate={this.changeMonth}
            />    
           <Calendar events={this.state.events} handleEventSelection={this.selectEvent} handleSlotSelection={this.selectSlot}
             defaultView={this.state.view}
             defaultDate={this.state.date}
             views={['month', 'week', 'day']}
             step={5}
             timeslots={6}
             conflictBookingId = {this.props.conflictBookingId}
          /></div>
        )
    }

}

export default EventCalendar;
