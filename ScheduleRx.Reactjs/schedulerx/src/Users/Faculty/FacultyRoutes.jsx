import React from 'react';
import { Route } from 'react-router-dom';
import CreateEvent from '../Admin/Event/CreateEvent';
        // Faculty uses the Same CreateEvent form as Admin, It's unlikely we would need them to be different
import Home from './Home/Home';

// We can add a Log-out Component Here, It should basically just clear the Redux Store, and redirect to login

const FacultyRoutes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/event/create" component={CreateEvent} />
  </div>);

export default FacultyRoutes;