import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import {connect} from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';
import EventEditView from '../../../Base Components/eventEditView';
import { client } from '../../../configuration/client';
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
    role: state.userRole,
    user: state.userName,
    semester: state.semester,
    schedule: state.currentSchedule,
    calendar: state.userCalendar
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (user, role) => dispatch(action.userCalendar(user, role))
});

class EmptyHome extends Component {
    state = {
        events: [],
        event: {},
        open: false
    };

    componentDidMount() {
        this.props.onLoad(this.props.user, this.props.role)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({events: nextProps.calendar})
    };

    handleSelectSlot = () => {
        console.log();
    };

    handleSelectEvent = (event) => {
        this.setState({event, open: true})
    };

    handleClose = () => {
        this.setState({ open: false})
    };

    handleSave = (sectionDetail) => {
        client.post(`EventSection/EditNote.php`,
            {
                BOOKING_ID: sectionDetail.BOOKING_ID,
                SECTION_ID: sectionDetail.SECTION_ID,
                NOTES: sectionDetail.details,
            })
            .then(res => {
                this.props.onLoad(this.props.user, this.props.role);
            });
    };

    render() {
        const {classes} = this.props;
        return (
            <div
                className={classes.root}
            >
                <div className={classes.container}>
                <Calendar
                    className={classes.cal}
                    events={this.state.events}
                    handleEventSelection={this.handleSelectEvent}
                    handleSlotSelection={this.handleSelectSlot}
                    defaultDate={new Date()}
                />
                <EventEditView onSave={this.handleSave} event={this.state.event} open={this.state.open} onClose={this.handleClose} />
            </div>
        </div>
        )
    }
}

const Home = withStyles(styles)(EmptyHome);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
