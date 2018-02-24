import React, { Component } from 'react';
import Calendar from '../../components/Calendar';
import axios from 'axios';
import moment from 'moment';

// const events = [
//     {
//       title: 'Event very long title',
//       startDate: new Date(2018, 1, 10, 20, 0, 0, 0),
//       endDate: new Date(2018, 1, 10, 21, 0, 0, 0),
//     },
//     {
//       title: 'Long Event',
//       startDate: new Date(2018, 1, 18, 20, 0, 0, 0),
//       endDate: new Date(2018, 1, 19, 21, 0, 0, 0),
//     },
// ]  

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