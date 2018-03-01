import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import * as action from '../../../actions/actionCreator';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  log: () => dispatch(action.logout())
});

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: theme.drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const logout = () => {
  this.props.log();
}

const unwrappedHead = (props) => {
  const { classes, handleDrawerToggle } = props;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="default"
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" noWrap>
            <h1 style={{fontFamily: 'Cuprum', textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'}}>ScheduleRx</h1>
        </Typography>
      </Toolbar>
      <button onClick={this.logout}/>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
