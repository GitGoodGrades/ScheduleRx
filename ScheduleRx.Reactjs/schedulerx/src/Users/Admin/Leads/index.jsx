import React, { Component } from 'react';
import UserCourseTable from './components/UserCourseTable';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';

const mapStateToProps = (state) => ({
    leads: state.leadsCourses,
    faculty: state.facultyList,
    courses: state.courseList,
    user: state.userName
  });

const mapDispatchToProps = (dispatch) => ({
    loadCourse: () => dispatch(action.searchLeadsCourses()),
    loadFaculty: () => dispatch(action.searchUsers()),
    loadCourseList: () => dispatch(action.searchCourses())
});

class Leads extends Component {
    componentDidMount() {
        this.props.loadCourse();
        this.props.loadFaculty();
        this.props.loadCourseList();
    }

    render(){
        return(
            <div style={{paddingTop: 35}}>
                <UserCourseTable  faculty={this.props.faculty} leads={this.props.leads} courses={this.props.courses} user={this.props.user}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
