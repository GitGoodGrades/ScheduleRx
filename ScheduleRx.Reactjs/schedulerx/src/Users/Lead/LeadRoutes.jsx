import React from 'react';
import { Route } from 'react-router-dom';
import CreateEvent from '../Admin/Event/CreateEvent';
        // Faculty uses the Same CreateEvent form as Admin, It's unlikely we would need them to be different
import Messages from './Messages/index';
import Home from './Home/Home';

const FacultyRoutes = (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/event/create" component={CreateEvent} />
    <Route path="/messages" component={Messages} />
  </div>);

export default FacultyRoutes;