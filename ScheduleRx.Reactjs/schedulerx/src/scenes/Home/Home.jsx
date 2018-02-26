import React, { Component } from 'react';
import Calendar from '../../components/Calendar';
import axios from 'axios';
import moment from 'moment';

class Home extends Component {
    state = { events: []}

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Bookings/Index.php`)
      .then(res => {
        const events = res.data.records;
        for(let obj of events){
            obj.START_TIME = moment(obj.START_TIME).toDate();
            obj.END_TIME = moment(obj.END_TIME).toDate();
        }
        this.setState({ events });
      });
    };
    render(){
        return(
            <div 
                className="rbc-calendar"
            >
                <Calendar events={this.state.events} />
            </div>
        )
    }
}

export default Home;