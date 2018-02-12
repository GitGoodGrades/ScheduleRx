import React, { Component } from 'react';
import axios from 'axios';
import CourseForm from '../../components/CourseForm';

class CreateCourse extends Component {
    handleSave(course, students) {

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Course/Create.php`, {
            COURSE_ID: course,
            STUDENTS: students
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        return(
            <div>
                <CourseForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default CreateCourse;