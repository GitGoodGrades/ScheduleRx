import React, { Component } from 'react';
import axios from 'axios';
import CourseTable from './components/CourseTable';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { connect } from 'react-redux';
import * as action from '../../../Redux/actions/actionCreator';

const mapStateToProps = (state) => ({
    courses: state.courseList
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.searchCourses())
});

class Courses extends Component {
    componentDidMount() {
        this.props.onLoad();
    };

    render(){
        const { courses } = this.props;
        return(
            <div>
            {
                courses &&
                <CourseTable courseList={courses} />
            }   
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses);
