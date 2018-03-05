import React, {Component} from 'react';
import Calendar from '../../../Base Components/Calendar';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
// import * as action from '../../../Redux/actions/actionCreator';

const mapStateToProps = (state) => ({
    role: state.userRole,
    user: state.userName,
    semester: state.semester,
    schedule: state.currentSchedule
});

// const mapDispatchToProps = (dispatch) => ({
//     onLoad: (variables) => dispatch(action.facultyCalendar(variables))
// });

class Home extends Component {
    state = {events: []};

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Bookings/Index.php`)
            .then(res => {
                const events = res.data.records;
                events && events.map(obj => {
                    obj.START_TIME = moment(obj.START_TIME).toDate();
                    obj.END_TIME = moment(obj.END_TIME).toDate();
                });
                this.setState({events});
            });
        //CHANGE TO:

        //this.props.onLoad(variable to send)

    };

    render() {
        return (
            <div
                className="rbc-calendar"
            >
                <Calendar events={this.state.events}/>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Home);