import React, { Component } from 'react';
import ScheduleTable from './components/ScheduleTable';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import history from '../../../App/History';
import ScheduleForm from './components/ScheduleForm';

const mapStateToProps = (state) => ({
    role: state.userRole,
    schedules: state.scheduleList
  });

const mapDispatchToProps = (dispatch) => ({
    registration: (reg) => dispatch(action.updateRegistration(
        reg
      )),
    onLoad: () => dispatch(action.searchScheduleList())
});

class Schedules extends Component {
    state = {
        selectedId: '',
        visible: false,
        endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        dialogOpen: false, 
        schedules: []
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({schedules: nextProps.schedules})
    }

    componentDidMount() {
        this.props.onLoad();
    };

    update = (id, released, currentDate) => {
        client.post(`Schedule/Update.php`,
        {
            SCHEDULE_ID: id,
            IS_RELEASED: released,
            END_REG_DATE: currentDate
        }
        .then(
            this.props.registration(id)
        ))


    }

    reload = (schedule) => {
        let tempSchedule = this.state.schedules;
        const newSchedule = {
            SCHEDULE_ID: schedule.SCHEDULE_ID,
            START_REG_DATE: schedule.START_REG_DATE,
            END_REG_DATE: schedule.END_REG_DATE,
            START_SEM_DATE: schedule.START_SEM_DATE,
            END_SEM_DATE: schedule.END_SEM_DATE,
            IS_RELEASED: schedule.IS_RELEASED,
            IS_ARCHIVED: schedule.IS_ARCHIVED
        }
        tempSchedule.push(newSchedule);
        this.setState({schedules: tempSchedule, dialogOpen: false})
    }

    openDialog = () => {
        this.setState({
            dialogOpen: true
        })
    }

    cancel = () => {
        this.setState({
          dialogOpen: false
        })
      };

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
                    alert("Invalid Times or Dates, Please Try Again...");     
                }
                else {
                    history.push("/schedule/List");               
                }  
            })
            .catch(function (error) {
                console.log(error);
            });
            
    }

    render(){
        return(
            <div style={{paddingTop: 35}}>
                <ScheduleTable handleState={this.handleState} save={this.update} scheduleList={this.props.schedules} open={this.openDialog} />
                <ScheduleForm onSave={this.handleSave} open={this.state.dialogOpen} onCancel={this.cancel} resubmit={this.reload}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
