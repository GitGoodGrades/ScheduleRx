import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

export const AdminCreateSchedule = () =>

        <Link to="/schedule/create">Create New Schedule</Link>

  ;
export const AdminManageSchedule = () =>
        <Link to="/schedule/List">Manage</Link>
    ;

export const FacultyItems = () =>

      <Link to="/event/create">Create New Event</Link>

    ;

export const StudentItems = () =>
      <Link to="/">Home</Link>

    ;
