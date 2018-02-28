import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';
import InboxIcon from 'material-ui-icons/MoveToInbox';

export const AdminItems = ({ toggle }) =>
    <div>
        <Link to="/schedule/create">
            <ListItem button onClick={toggle}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
            <ListItemText primary="Create Schedule"/>
            </ListItem>
        </Link>  
        <Link to="/schedule/List">
            <ListItem button onClick={toggle}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Schedules"/>
            </ListItem>
        </Link>
    </div>

export const FacultyItems = ({ toggle }) =>
    <div>
        <Link to="/event/create">
            <ListItem button onClick={toggle}>
                <ListItemIcon>
                    <InboxIcon/>
                </ListItemIcon>
                <ListItemText primary="Create Event"/>
            </ListItem>
        </Link>
    </div>

export const StudentItems = ({ toggle }) =>
    <div>
        <Link to="/">
            <ListItem button onClick={toggle}>
                <ListItemIcon><InboxIcon/></ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItem>
        </Link>
    </div>