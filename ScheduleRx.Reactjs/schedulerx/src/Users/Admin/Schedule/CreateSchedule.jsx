import React, { Component } from 'react';
import axios from 'axios';
import ScheduleForm from './ScheduleForm';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    role: state.userRole,
  });

class CreateSchedule extends Component {
    handleSave(schedule) {
        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Schedule/Create.php`, {
            SCHEDULE_ID: schedule.SCHEDULE_ID,
            START_REG_DATE: schedule.START_REG_DATE,
            END_REG_DATE: schedule.END_REG_DATE,
            START_SEM_DATE: schedule.START_SEM_DATE,
            END_SEM_DATE: schedule.END_SEM_DATE,
            IS_RELEASED: schedule.IS_RELEASED,
            IS_ARCHIVED: schedule.IS_ARCHIVED
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        return(
            <div>
                <ScheduleForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default connect(mapStateToProps)(CreateSchedule);
