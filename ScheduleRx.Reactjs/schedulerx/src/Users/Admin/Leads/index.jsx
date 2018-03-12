import React, { Component } from 'react';
import UserCourseTable from './components/UserCourseTable';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    leads: state.leadsCourses,
    faculty: state.facultyList
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.searchLeadsCourses())
})

class Leads extends Component {
    componentDidMount = () => {
        this.props.onLoad();
    }

    render(){
        return(
            <div>
                <UserCourseTable  faculty={this.props.faculty} leads={this.props.leads}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
