import React from 'react';
import { Route } from 'react-router-dom';
import Courses from './scenes/Course/scenes/Courses/index';
import CreateCourse from './scenes/Course/scenes/Courses/CreateCourse';
import RegisterForm from './scenes/Register/scenes/RegisterForm'
import Home from './scenes/Home/Home';
import CreateSchedule from './scenes/Schedule/scenes/CreateSchedule';

//import COMPONENT from './COMPONENT/PATH';

const routes = (
  <div height="100%">
    <Route exact path="/" component={Home} />
    <Route path="/course/list" component={Courses} />
    <Route path="/course/create" component={CreateCourse} />
    <Route path="/register" component={RegisterForm}/>
    <Route path="/schedule/create" component={CreateSchedule} />
  </div>);

export default routes;