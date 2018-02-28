import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Header from './components/Header';
import routes from '../../routes';
import LeftNavigationPanel from './components/LeftNavigationPanel';
import { connect } from 'react-redux';
import axios from 'axios';
import * as action from '../../actions/actionCreator';
import { Redirect } from 'react-router';
import Logging from '../Auth/scenes/logging';
import Registration from '../Auth/scenes/registration';

const mapStateToProps = (state) => ({
  user: state.userName,
});

const mapDispatchToProps = (dispatch) => ({
  getSchedules: (registrationSchedule, currentSchedule) => dispatch(action.changeSchedules(
      registrationSchedule, 
      currentSchedule
    ))
});

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: '100%',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
 
    overflow: 'auto'
  },
  gridRoot: {
    height: '100%',
    minHeight: 900
  },
});

class EmptyShell extends React.Component {
  constructor() {
    super();
    this.state= {
      mobileOpen: false,
      register: false
    }
  }

  handleClick = () => {
    this.setState({register: true})
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    const { classes } = this.props;
    if(this.props.user === '' || this.props.user === null){
      if(!this.state.register){
        return (
        <div>
          <Logging />
          <button onClick={this.handleClick}>Register</button>
        </div>
      )
      }
      return (
        <div>
          <Registration />
        </div>
      )
    }
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header handleDrawerToggle={this.handleDrawerToggle} />
          <LeftNavigationPanel
            mobileOpen={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />
          <main className={classes.content}>
            <Grid container className={classes.gridRoot}>
              {routes}
            </Grid>
          </main>
        </div>
      </div>
    );
  }
}

const Shell = connect(mapStateToProps, mapDispatchToProps)(EmptyShell)

export default withStyles(styles, { withTheme: true })(Shell);