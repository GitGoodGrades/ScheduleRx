import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Hidden from 'material-ui/Hidden';
import {AdminItems, FacultyItems, StudentItems, AdminScheduleList} from '../../Base Components/tileData';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    role: state.userRole,
});

const drawerWidth = 240;

const styles = theme => ({
    docked: {
        height: '100%'
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
    hidden: {
        display: 'none'
    }
});

class Panel extends Component {

    render() {
        const {classes, theme} = this.props;
        const drawer = (
            <div>
                <div className={classes.drawerHeader}/>
                <List>
                    <StudentItems toggle={this.props.handleDrawerToggle}/>
                </List>
                <List className={this.props.role === '3' ? classes.hidden : ''}>
                    <FacultyItems toggle={this.props.handleDrawerToggle}/>
                </List>
                <List className={this.props.role !== '1' ? classes.hidden : ''}>
                    <AdminItems toggle={this.props.handleDrawerToggle}/>
                </List>
                <List className={this.props.role !== '1' ? classes.hidden : ''}>
                    <AdminScheduleList toggle={this.props.handleDrawerToggle}/>
                </List>
            </div>
        );


        return [
            <div style={{position: 'relative', zIndex: '0', width:'20%'}}>
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
                </Hidden>
            </div>
        ];
    }
}

const ResponsiveDrawer = connect(mapStateToProps)(Panel);

export default withStyles(styles, {withTheme: true})(ResponsiveDrawer);