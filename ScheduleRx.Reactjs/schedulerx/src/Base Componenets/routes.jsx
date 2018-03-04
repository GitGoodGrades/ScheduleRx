import React from 'react';
import { Route } from 'react-router-dom';
import Courses from '../Users/Admin/Course/index';
import CreateCourse from '../Users/Admin/Course/CreateCourse';
import CreateEvent from '../Users/Admin/Event/CreateEvent';
import Home from '../scenes/Home/Home';
import CreateSchedule from '../Users/Admin/Schedule/CreateSchedule';
import Schedules from '../Users/Admin/Schedule/Index';

//import COMPONENT from './COMPONENT/PATH';

const routes = (
  <div height="100%">
    <Route exact path="/" component={Home} />
    <Route path="/course/list" component={Courses} />
    <Route path="/course/create" component={CreateCourse} />
    <Route path="/event/create" component={CreateEvent} />
    <Route path="/schedule/create" component={CreateSchedule} />
    <Route path="/schedule/list" component={Schedules} />
  </div>);

export default routes;