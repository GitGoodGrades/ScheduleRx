import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import InboxIcon from 'material-ui-icons/MoveToInbox';

export const ListItems = ({ toggle }) =>
  (<div>
    <Link to="/">
      <ListItem button onClick={toggle}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/course/list">
      <ListItem button onClick={toggle}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItem>
    </Link>
   </div>);
