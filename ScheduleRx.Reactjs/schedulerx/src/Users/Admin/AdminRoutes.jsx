import React from 'react';
import { Route } from 'react-router-dom';
import Courses from './Course/index';
import CreateCourse from './Course/CreateCourse';
import CreateEvent from './Event/CreateEvent';
import CreateSchedule from './Schedule/CreateSchedule';
import Schedules from './Schedule/Index';
import Home from './Home/Home';
import Leads from './Leads/index';

// We can add a Log-out Component Here

const AdminRoutes = (
    <div>
        <Route exact path="/" component={Home}/>
        <Route path="/course/list" component={Courses}/>
        <Route path="/course/create" component={CreateCourse}/>
        <Route path="/event/create" component={CreateEvent}/>
        <Route path="/schedule/create" component={CreateSchedule}/>
        <Route path="/schedule/list" component={Schedules}/>
        <Route path="/users/roles" component={Leads}/>
    </div>);

export default AdminRoutes;