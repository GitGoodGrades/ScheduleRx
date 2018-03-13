import React, {Component} from 'react';
import axios from 'axios';
import {client} from '../../../configuration/client';
import ScheduleForm from './components/ScheduleForm';
import {connect} from 'react-redux';
import history from '../../../App/History';

const mapStateToProps = (state) => ({
    role: state.userRole,
});

class CreateSchedule extends Component {
    handleSave(schedule) {
        client.post(`Schedule/Create.php`, {
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
                if (response.data === "") {
                    alert("Invalid Times or Dates, Please Try Again...");     //I know it's ugly, Don't kill me Sam
                }                                                           //I'm Only using these Alerts as place holders
                else {
                    history.push("/schedule/List");                 //Note: history happens SUPER FAST, without the alert
                }                                    //message to slow it down, it the user may reach the next page before the data is updated
                                                                   // Maybe we should consider a short loading screen???
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <ScheduleForm onSave={this.handleSave}/>
            </div>
        );
    };
}

export default connect(mapStateToProps)(CreateSchedule);
