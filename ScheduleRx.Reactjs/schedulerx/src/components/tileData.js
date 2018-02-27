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
    <Link to="/schedule/create">
      <ListItem button onClick={toggle}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Create Schedule" />
      </ListItem>
    </Link>
    <Link to="/register">
        <ListItem button onClick={toggle}>
            <ListItemIcon>
                 <InboxIcon />
            </ListItemIcon>
        <ListItemText primary="Register" />
        </ListItem>
    </Link>
    <Link to="/event/create">
        <ListItem button onClick={toggle}>
            <ListItemIcon>
                 <InboxIcon />
            </ListItemIcon>
        <ListItemText primary="Create Event" />
        </ListItem>
    <Link to="/schedule/List">
      <ListItem button onClick={toggle}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Schedules" />
      </ListItem>
    </Link>
   </div>);
