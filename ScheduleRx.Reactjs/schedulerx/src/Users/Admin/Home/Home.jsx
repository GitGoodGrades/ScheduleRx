import React, { Component } from 'react';
import Calendar from '../../../Base Components/Calendar';
import axios from 'axios';
import {connect} from 'react-redux';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';

const mapStateToProps = (state) => ({
    events: state.adminCalendar
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.adminCalendar())
});

class Home extends Component {
    state = { events: []};

    componentDidMount() {
        this.props.onLoad();       
    };
    render(){
        return(
            <div className="rbc-calendar">
                <Calendar events={this.props.events} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);