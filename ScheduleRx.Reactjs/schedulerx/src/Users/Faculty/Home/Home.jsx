import React, {Component} from 'react';
import Calendar from '../../../Base Componenets/Calendar';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state) => ({
    role: state.userRole,
    user: state.userName,
    semester: state.semester,
    schedule: state.currentSchedule
});

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

export default connect(mapStateToProps)(Home);