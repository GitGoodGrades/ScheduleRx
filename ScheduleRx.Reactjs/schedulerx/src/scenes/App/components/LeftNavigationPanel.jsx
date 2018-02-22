import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import { ListItems } from '../../../components/tileData';

const drawerWidth = 240;

const styles = theme => ({
  docked: {
      height: '100%',
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
});

class ResponsiveDrawer extends Component {

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List><ListItems toggle={this.props.handleDrawerToggle} /></List>
        <Divider />
      </div>
    );

    return [
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.props.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.props.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>,
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                docked: classes.docked,
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>,
        ];
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);