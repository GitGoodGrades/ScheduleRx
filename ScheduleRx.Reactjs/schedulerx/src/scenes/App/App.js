import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import Header from './components/Header';
import routes from '../../routes';
import LeftNavigationPanel from './components/LeftNavigationPanel';

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
    'overflow-x': 'scroll',
  },
  gridRoot: {
    flexGrow: 1,
  },
});


class App extends React.Component {
  constructor() {
    super();
    this.state= {
      mobileOpen: false,
  }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  render() {
    const { classes } = this.props;

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

export default withStyles(styles, { withTheme: true })(App);