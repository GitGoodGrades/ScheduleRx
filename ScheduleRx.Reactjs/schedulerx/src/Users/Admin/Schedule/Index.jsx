import React, { Component } from 'react';
import ScheduleTable from './components/ScheduleTable';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import history from '../../../App/History';
import ScheduleForm from './components/ScheduleForm';
import ScheduleEditForm from './components/ScheduleEditForm';

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
        schedules: [],
        editDialogOpen: false,
        schedule: null
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({schedules: nextProps.schedules})
    }

    componentDidMount() {
        this.props.onLoad();
    };

    handleUpdate = (schedule) => {
        let tempScheduleList = [];
        client.post(`Schedule/Update.php`,
        {
            SCHEDULE_ID: schedule.SCHEDULE_ID,
            START_REG_DATE: schedule.START_REG_DATE,
            END_REG_DATE: schedule.END_REG_DATE,
            START_SEM_DATE: schedule.START_SEM_DATE,
            END_SEM_DATE: schedule.END_SEM_DATE,
            IS_RELEASED: schedule.IS_RELEASED,
            IS_ARCHIVED: schedule.IS_ARCHIVED
        })
        .then(res => {
            tempScheduleList = this.state.schedules;
            this.state.schedules && this.state.schedules.map(sched => {
                if(sched.SCHEDULE_ID === schedule.SCHEDULE_ID){
                    tempScheduleList.splice((tempScheduleList.indexOf(sched)), 1)
                }

            })
            tempScheduleList.push(schedule)
            this.setState({schedules: tempScheduleList, editDialogOpen: false})
        }
            
        )


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

    handleEditOpen = (id) => {
        client.post('Schedule/Detail.php', {
            SCHEDULE_ID: id
        }).then(res => {
            this.setState({
                schedule: res.data,
                editDialogOpen: true
            })
        })
    }

    cancel = () => {
        this.setState({
          dialogOpen: false,
          editDialogOpen: false
        })
      };

      handleDelete = (schedule) => {
        let tempScheduleList = [];
        client.post(`Schedule/Delete.php`,
        {
            SCHEDULE_ID: schedule.SCHEDULE_ID
        })
        .then(res => {
            tempScheduleList = this.state.schedules;
            this.state.schedules && this.state.schedules.map(sched => {
                if(sched.SCHEDULE_ID === schedule.SCHEDULE_ID){
                    tempScheduleList.splice(this.state.schedules.indexOf(sched, 1))
                }

            })
            this.setState({schedules: tempScheduleList, editDialogOpen: false})
        }
            
        )
      }

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
            <div style={{paddingTop: 40}}>
                <ScheduleTable handleEdit={this.handleEditOpen} handleState={this.handleState} save={this.update} scheduleList={this.props.schedules} open={this.openDialog} />
                <ScheduleEditForm deleteSchedule={this.handleDelete} onSave={this.handleUpdate} open={this.state.editDialogOpen} onCancel={this.cancel} schedule={this.state.schedule} />
                <ScheduleForm schedule={this.state.schedule} onSave={this.handleSave} open={this.state.dialogOpen} onCancel={this.cancel} resubmit={this.reload}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
