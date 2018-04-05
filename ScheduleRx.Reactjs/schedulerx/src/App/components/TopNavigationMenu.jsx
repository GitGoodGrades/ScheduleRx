import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as action from "../../Redux/actions/actionCreator";
import { Redirect, withRouter } from 'react-router-dom';
import { Admin, Faculty, Student } from '../../configuration/variables';
import history from '../History';

const mapStateToProps = (state) => ({
    role: state.userRole,
});

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(action.logout())
});

const styles = theme => ({
    TopNavMenu: {
      display: 'inline-block',
      width: '100%',
      background: 'rgba(0, 0, 0, 70%)',
      height: 40,
      color: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1,
    },
    hidden: {
        display: 'none',
    },
    seen: {
        color: 'rgba(255, 255, 255, 100%)',
        fontSize: '13px',
        paddingLeft: 10,
        paddingRight: 10,
        textTransform: 'uppercase',
    },
    Home: {
        color: 'white',
        fontSize: '13px',
        paddingLeft: 30,
        paddingRight: 10,
        textTransform: 'uppercase',
    },
    asText: {
        float: 'right',
        background: 'none',
        border: 'none',
        paddingRight: 20,
        paddingLeft: 10,
        cursor: "pointer",
        color: 'white',
        fontSize: '13px',
        textTransform: 'uppercase',
    },
    NavLinkContainer: {
        paddingLeft: 10,
        fontSize: '16px',
        display: 'inline-block',
        width: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        textTransform: 'none',
    }
});

class TopNavMenu extends Component {

    LogOut = () => {
        sessionStorage.removeItem('myID');
        sessionStorage.removeItem('myRole');
        sessionStorage.removeItem('mySem');
        history.push("/");
        this.props.logOut();
    };

    render() {
        const {classes} = this.props;
       
        return (
            <nav 
                className={classes.TopNavMenu}>
                <div 
                    className={classes.NavLinkContainer}>
                    SCHEDULERx
                    <NavLink 
                        activeStyle={{fontSize: '15px', color: '#D7BAAB'}} 
                        className={classes.Home} to="/">
                        Home
                    </NavLink>
                    <NavLink  
                        activeStyle={{fontSize: '15px', color: '#D7BAAB'}} to="/event/create" 
                        className={(this.props.role === Faculty || this.props.role === Student) ? classes.hidden : classes.seen}>
                        Manage Events
                    </NavLink>
                    <NavLink 
                        activeStyle={{fontSize: '15px', color: '#D7BAAB'}} to="/schedule/List"
                        className={this.props.role !== Admin ? classes.hidden : classes.seen}>
                        Manage Schedules
                    </NavLink>
                    <NavLink 
                        activeStyle={{fontSize: '15px', color: '#D7BAAB'}} to="/users/leads"
                        className={this.props.role !== Admin ? classes.hidden : classes.seen}>
                        Manage Lead Faculty
                    </NavLink>
                    <NavLink 
                        activeStyle={{fontSize: '15px', color: '#D7BAAB'}} to="/Conflicts"
                        className={this.props.role !== Admin ? classes.hidden : classes.seen}>
                        Conflicts/Requests
                    </NavLink>
                    <button 
                        className={classes.asText} onClick={this.LogOut}>
                        Log Out
                    </button>
                </div>
            </nav>
      );



    }
}

const EmptyTopNavMenu = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNavMenu));

export default withStyles(styles, {withTheme: true})(EmptyTopNavMenu);
