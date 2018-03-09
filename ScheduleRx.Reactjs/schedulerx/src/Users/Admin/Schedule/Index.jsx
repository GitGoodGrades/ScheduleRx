import React, { Component } from 'react';
import axios from 'axios';
import ScheduleTable from './components/ScheduleTable';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import moment from 'moment';
import Home from '../Home/Home';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';

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
    constructor() {
        super();
        this.handleState = this.handleState.bind(this);
    }
      handleState = (newState) => {
        this.setState(Object.assign({}, this.state, newState));
    };

    state = {
        selectedId: '',
        visible: false,
        endDate: moment().format("YYYY-MM-DD hh:mm:ss")
    };

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
            this.props.updateRegistration(id)
        ))

        
    }

    render(){
        return(
            <div>
                <ScheduleTable handleState={this.handleState} save={this.update} scheduleList={this.props.schedules} />
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
