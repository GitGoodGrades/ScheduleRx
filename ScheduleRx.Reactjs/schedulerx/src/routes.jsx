import React from 'react';
import { Route } from 'react-router-dom';
import Courses from './scenes/Course/scenes/Courses/index';
import CreateCourse from './scenes/Course/scenes/Courses/CreateCourse';
import Home from './scenes/Home/Home';

//import COMPONENT from './COMPONENT/PATH';

const routes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/course/list" component={Courses} />
    <Route path="/course/create" component={CreateCourse} />
  </div>);

export default routes;