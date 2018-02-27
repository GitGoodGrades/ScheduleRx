import React, { Component } from 'react';
import axios from 'axios';
import ScheduleTable from '../components/ScheduleTable';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import moment from 'moment';

class Schedules extends Component {
    state = {
        scheduleList: [],
        isLoading: true,
        selectedId: '',
        visible: false,
        endDate: moment().format("YYYY-MM-DD hh:mm:ss")
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Schedule/Index.php`)
      .then(res => {
        const scheduleList = res.data;
        this.setState({ scheduleList, isLoading: false});
      });
    };

    update = (id, released, currentDate) => {
        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Schedule/Update.php`,
        {
            SCHEDULE_ID: id,
            IS_RELEASED: released,
            END_REG_DATE: currentDate
        })
    }

    render(){
        return(
            <div>
                {this.state.isLoading && <CircularProgress size={75} /> ||
                <ScheduleTable save={this.update} scheduleList={this.state.scheduleList} />}
            </div>
        );
    };
}
export default Schedules;
