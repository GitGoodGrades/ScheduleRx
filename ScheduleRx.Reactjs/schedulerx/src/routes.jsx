import React from 'react';
import { Route } from 'react-router-dom';
import Courses from './scenes/Course/scenes/Courses/index';
import CreateCourse from './scenes/Course/scenes/Courses/CreateCourse';
import CreateEvent from './scenes/Event/scenes/Events/CreateEvent';
import Registration from './scenes/Auth/scenes/registration';
import Logging from './scenes/Auth/scenes/logging';
import Home from './scenes/Home/Home';
import CreateSchedule from './scenes/Schedule/scenes/CreateSchedule';
import Schedules from './scenes/Schedule/scenes/Index';

//import COMPONENT from './COMPONENT/PATH';

const routes = (
  <div height="100%">
    <Route exact path="/" component={Home} />
    <Route path="/course/list" component={Courses} />
    <Route path="/course/create" component={CreateCourse} />
    <Route path="/login" component={Logging}/>
    <Route path="/register" component={Registration}/>
    <Route path="/event/create" component={CreateEvent} />
    <Route path="/schedule/create" component={CreateSchedule} />
    <Route path="/schedule/list" component={Schedules} />
  </div>);

export default routes;