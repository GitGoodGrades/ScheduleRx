import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { ListItems } from '../../../components/tileData';

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

const Header = (props) => {
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
            ULM Nursing ScheduleRx
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles, { withTheme: true })(Header);