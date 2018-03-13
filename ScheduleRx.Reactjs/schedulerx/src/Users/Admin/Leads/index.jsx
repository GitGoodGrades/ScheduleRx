import React, { Component } from 'react';
import UserCourseTable from './components/UserCourseTable';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    leads: state.leadsCourses,
    faculty: state.facultyList
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourse: () => dispatch(action.searchLeadsCourses()),
    loadFaculty: () => dispatch(action.searchUsers())
});

class Leads extends Component {
    componentDidMount() {
        this.props.loadCourse();
        this.props.loadFaculty();
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
