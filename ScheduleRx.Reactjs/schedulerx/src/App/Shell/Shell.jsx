import React from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import * as action from '../../Redux/actions/actionCreator';
import {NavLink} from 'react-router-dom';
import Logging from '../Auth/scenes/logging';                 //importing CSS for Shell
import { AdminProfile, FacultyProfile, StudentProfile, LeadProfile } from './HomeBuilder';
import { Admin, Lead, Faculty, Student } from '../../configuration/variables';

//styles
const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',

    },
    appFrame: {
        position: 'relative',
        display: 'inline',
        width: '100%',
        height: '100%',
        border: '4px solid yellow',
    },
    content: {
        width: '100%',
        display:'inline',
        position: 'relative',
        height: '100%',
        overflow: 'auto',

    },
    gridRoot: {
        height: '100%',
        minHeight: 900,
        border: '4px solid yellow',
    },
});

//Redux Constants to Handle user Information
const mapStateToProps = (state) => ({
    user: state.userName,
    role: state.userRole,
});

//Redux Constants to hold Schedule Information
const mapDispatchToProps = (dispatch) => ({
    getSchedules: (registrationSchedule, currentSchedule) => dispatch(action.changeSchedules(
        registrationSchedule,
        currentSchedule
    ))
});

class EmptyShell extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    /**handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };*/

    render() {
        const {classes} = this.props;  //pulls css from props

        //If the User is NOT Logged In
        if (this.props.user === '' || this.props.user === null) {
            return (
                <div style={{height: '100%'}}>
                    <Logging/>
                </div>
            )
        }

        // If the User IS Logged In - Then we Know the Global Data For User is Set

        let userRole = this.props.role;
        const admin = Admin;
        const lead = Lead;
        const faculty = Faculty;
        switch(userRole) {
            case admin:
                return <AdminProfile/>;
            case lead:
                return <LeadProfile />;
            case faculty:
                return <FacultyProfile />
            default:
                return <StudentProfile/>;
}
    }
}

const Shell = connect(mapStateToProps, mapDispatchToProps)(EmptyShell)

export default withStyles(styles, {withTheme: true})(Shell);
