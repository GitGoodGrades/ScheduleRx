import React, { Component } from 'react';
import Calendar from '../../../Base Components/Calendar';
import EventView from '../../../Base Components/eventView';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import { withStyles } from 'material-ui/styles';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

const styles = theme => ({
    root: {

    },
    container: {
        paddingTop: 10,
        paddingBottom:  10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: '5px',
        marginTop: 60,
        overflow: 'hidden',
    },
    cal: {
        height: '50%',
    }
});

const mapStateToProps = (state) => ({
    events: state.adminCalendar
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.adminCalendar())
});

class EmptyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [], 
            event: {}, 
            open: false
        }
    
        this.moveEvent = this.moveEvent.bind(this)
    }
    // state = {
    //     events: [], 
    //     event: {}, 
    //     open: false
    // }

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.events})
    }
    

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
    

    moveEvent = ({ event, START_TIME, END_TIME }) => {
        const  events  = this.state.events
    
        const idx = events.indexOf(event)
        const updatedEvent = { ...event, START_TIME, END_TIME }
    
        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)
    
        this.setState({
          events: nextEvents,
        })
    
        alert(`${event.BOOKING_TITLE} was dropped onto ${event.START_TIME}`)
    }


    render() {
        const {classes} = this.props;
        return (
            <div
                className={classes.root}
                
            >
                <div className={classes.container}>
                <DragAndDropCalendar
                    style={{height: 500}}
                    selectable
                    events={this.state.events}
                    onEventDrop={this.moveEvent}
                    titleAccessor="BOOKING_TITLE"
                    startAccessor='START_TIME'
                    endAccessor='END_TIME'
                    onSelectEvent={event => this.handleSelectEvent(event)}
                    defaultDate={new Date()}
                    onSelectSlot={slotInfo => this.handleSelectSlot(slotInfo)}
                    views={['month', 'week', 'day']}
                />
                <EventView event={this.state.event} open={this.state.open} onClose={this.handleClose} />
                </div>
            </div>
        )
    }
}
const StyleHome =  withStyles(styles, {withTheme: true})(EmptyHome)
const Home = connect(mapStateToProps, mapDispatchToProps)(StyleHome)
export default DragDropContext(HTML5Backend)(Home);
