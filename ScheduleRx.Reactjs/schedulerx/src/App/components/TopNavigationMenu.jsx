import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {AdminItems, FacultyItems, StudentItems} from '../../Base Components/tileData';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => ({
    role: state.userRole,
});

const styles = theme => ({
    TopNavMenu: {
      width: '100%',
    },
    hidden: {
        display: 'none'
    },
    seen: {
      display: 'inline',
    }
});

class TopNavMenu extends Component {

    render() {
      const {classes} = this.props;
      return (
          <nav className={classes.TopNavMenu}>
              <Link to="/">Home </Link>
              <Link to="/event/create"
                    className={this.props.role === '3' ? classes.hidden : classes.seen}>Create New Event </Link>
              <Link to="/schedule/create"
                    className={this.props.role !== '1' ? classes.hidden : classes.seen}>Create New Schedule </Link>
              <Link to="/schedule/List"
                    className={this.props.role !== '1' ? classes.hidden : classes.seen}>Manage </Link>
          </nav>
      );


        /**const drawer = (
            <div>
                <div/>
                <List>
                    <StudentItems/>
                </List>
                <List className={this.props.role === '3' ? classes.hidden : ''}>
                    <FacultyItems/>
                </List>
                <List className={this.props.role !== '1' ? classes.hidden : ''}>
                    <AdminItems/>
                </List>
                <List className={this.props.role !== '1' ? classes.hidden : ''}>
                    <AdminScheduleList/>
                </List>
            </div>
        );


        return [
            <div style={{position: 'relative', zIndex: '0', width:'20%'}}>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}

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
                </Hidden>
            </div>
        ];*/
    }
}

const EmptyTopNavMenu = connect(mapStateToProps)(TopNavMenu);

export default withStyles(styles, {withTheme: true})(EmptyTopNavMenu);
