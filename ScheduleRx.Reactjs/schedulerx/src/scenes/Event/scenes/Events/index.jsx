/**import React, { Component } from 'react';
import axios from 'axios';
import EventTable from '../../components/EventTable';
import CircularProgress from 'material-ui/Progress/CircularProgress';

class Events extends Component {
    state = {
        eventList: [],
        isLoading: true
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Bookings/Index.php`)
            .then(res => {
                const eventList = res.data;
                this.setState({ eventList, isLoading: false});
            });
    };

    render(){
        return(
            <div>
                {this.state.isLoading && <CircularProgress size={75} /> ||
                <EventTable eventList={this.state.eventList} />}
            </div>
        );
    };
}
export default Events;*/
