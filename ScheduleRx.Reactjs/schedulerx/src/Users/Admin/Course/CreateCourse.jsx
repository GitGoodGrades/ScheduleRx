import React, { Component } from 'react';
import { client } from '../../../configuration/client';
import CourseForm from './components/CourseForm';

class CreateCourse extends Component {
    handleSave(COURSE_ID, COURSE_TITLE, SEMESTER_ID) {
        client.post(`Courses/Create.php`, {
            COURSE_ID,
            COURSE_TITLE,
            SEMESTER_ID
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