import React, { Component } from 'react';
import Calendar from '../../../Base Components/Calendar';
import EventView from '../../../Base Components/eventView';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import { withStyles } from 'material-ui/styles';


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
    events: state.adminCalendar,
    courses: state.courseList,
    rooms: state.roomList,
    sections: state.sectionList,
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.adminCalendar()),
    loadCourses: () => dispatch(action.searchCourses()),
    loadRooms: () => dispatch(action.searchRooms()),
    loadSections: () => dispatch(action.searchSections()),
});

class EmptyHome extends Component {
    state = { events: [], event: {}, open: false};

    componentDidMount() {
        this.props.onLoad(),
        this.props.loadCourses(),
        this.props.loadRooms(),
        this.props.loadSections()
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
    render() {
        const {classes} = this.props;
        return (
            <div
                className={classes.root}
            >
                <div className={classes.container}>
                <Calendar
                    className={classes.cal}
                    events={this.props.events}
                    handleEventSelection={this.handleSelectEvent}
                    handleSlotSelection={this.handleSelectSlot}
                    views={['month', 'week', 'day']}
                />
                <EventView
                    event={this.state.event} 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    courseList={this.props.courses} 
                    sectionList={this.props.sections} 
                    roomList={this.props.rooms} />
                </div>
            </div>
        )
    }
}
const Home =  withStyles(styles, {withTheme: true})(EmptyHome)

export default connect(mapStateToProps, mapDispatchToProps)(Home);