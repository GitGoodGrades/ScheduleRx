import React, { Component } from 'react';
import axios from 'axios';
import CourseTable from '../../components/CourseTable';
import CourseForm from '../../components/CourseForm';

class Courses extends Component {
    state = {
        courseList: []
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Course/Index.php`)
      .then(res => {
        const courseList = res.data;
        this.setState({ courseList });
      });
    };

    render(){
        return(
            <div>
                <CourseTable courseList={this.state.courseList} />
            </div>
        );
    };
}
export default Courses;
