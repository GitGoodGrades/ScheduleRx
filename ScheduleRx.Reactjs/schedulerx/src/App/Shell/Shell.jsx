import React from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import * as action from '../../Redux/actions/actionCreator';
import {Link} from 'react-router-dom';
import Logging from '../Auth/scenes/logging';
import { styles }  from './ShellStyles';                      //importing CSS for Shell
import { AdminProfile, FacultyProfile, StudentProfile } from './HomeBuilder';

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
                <div>
                    <Logging/>
                    <div className={classes.buttonwrapper}>
                        <Link className={classes.regbutton} to="/register">Never been here before?
                            Register
                        </Link>
                    </div>
                </div>
            )
        }

        // If the User IS Logged In - Then we Know the Global Data For User is Set

        let userRole = this.props.role;
        switch(userRole) {
            case '1':
                return <AdminProfile/>;
            case '2':
                return <FacultyProfile />;
            default:
                return <StudentProfile/>;
        }
    }
}

const Shell = connect(mapStateToProps, mapDispatchToProps)(EmptyShell)

export default withStyles(styles, {withTheme: true})(Shell);
