import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AdminItems, FacultyItems, StudentItems} from '../../Base Components/tileData';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from "../../Redux/actions/actionCreator";
import { Redirect, withRouter } from 'react-router-dom';

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
    HomeLink: {
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
    linkContainer: {
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
        this.props.logOut();
        return <Redirect to path="/"/>;
    };

    render() {
      const {classes} = this.props;
      return (
          <nav className={classes.TopNavMenu}>

              <div className={classes.linkContainer}>
                  SCHEDULERx
              <Link className={classes.HomeLink} to="/"  activeStyle={{ color: 'red' }}><a>Home</a></Link>
              <Link  to="/event/create" replace
                    className={this.props.role === '3' ? classes.hidden : classes.seen}>Create New Event</Link>
                <Link to="/schedule/create"
                    className={this.props.role !== '1' ? classes.hidden : classes.seen}>Create New Schedule</Link>
                <Link to="/schedule/List"
                    className={this.props.role !== '1' ? classes.hidden : classes.seen}>Manage</Link>
                <button className={classes.asText} onClick={this.LogOut}>Log Out</button>
                </div>
          </nav>
      );



    }
}

const EmptyTopNavMenu = withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNavMenu));

export default withStyles(styles, {withTheme: true})(EmptyTopNavMenu);
