import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import Header from './components/Header';
import routes from '../../routes';

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
    height: 'calc(100% - 56px)',
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
  gridPaper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
});


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Header />
        <div className={classes.appFrame}>
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