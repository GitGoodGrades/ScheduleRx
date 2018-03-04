import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home/Home';

// We can add a Log-out Component Here, It should basically just clear the Redux Store, and redirect to login

const StudentRoutes = (
  <div>
    <Route exact path="/" component={Home} />

  </div>);

export default StudentRoutes;