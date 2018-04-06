import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './react-big-calendar.css';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

// Setup the localizer by providing the moment Object

BigCalendar.momentLocalizer(moment);

const mapStateToProps = (state) => ({
  current_schedule: state.currentSchedule,
  registration_schedule: state.registrationSchedule,
  user_role: state.user_role
});

const styles = theme => ({
  icon: {

  }
});

class Calendar extends Component {
  state = {
    events: [],
    date: new Date(),
    years: []
  };

  componentDidMount = () => {
    let years = [];
    let i = 0;
    let year = 2017;
    do {
      year += i;
      years.push[year];
      i++;
    } while (moment(year).isBefore(moment().add(2, 'y')));

    this.setState({
      years
    })
  }

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
  
  handleAMonthChange = () => {

  }

  render(){
    const {classes} = this.props;

    return(
    
    <div className="text-center">
      <ExpansionPanel style={{background: 'rgba(0,0,0, .7)'}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}>
          <Typography style={{color: 'white', font: 'Open Sans'}}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
            DROP DOWNS HERE
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <BigCalendar
        {...this.props}
        selectable
        style={{height: 500}}
        events={this.props.events.length > 0 ? this.props.events : [] }
        titleAccessor="BOOKING_TITLE"
        startAccessor='START_TIME'
        endAccessor='END_TIME'
        defaultDate={this.state.date}
        onSelectEvent={event => this.selectEvent(event)}
        onSelectSlot={slotInfo => this.selectSlot(slotInfo)}

      />
    </div>
    )
  }
}
export default withStyles(styles)(Calendar);
