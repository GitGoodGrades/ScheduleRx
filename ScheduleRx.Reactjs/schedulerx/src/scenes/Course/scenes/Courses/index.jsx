import React, { Component } from 'react';
import axios from 'axios';
import CourseTable from '../../components/CourseTable';
import CircularProgress from 'material-ui/Progress/CircularProgress';

class Courses extends Component {
    state = {
        courseList: [],
        isLoading: true
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Course/Index.php`)
      .then(res => {
        const courseList = res.data;
        this.setState({ courseList });
        this.setState({isLoading: false})
      });
    };

    render(){
        return(
            <div>
                {this.state.isLoading && <CircularProgress size={75} /> ||
                <CourseTable courseList={this.state.courseList} />}
            </div>
        );
    };
}
export default Courses;
