import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Select from 'react-select';
import Option from './Option';
import FilterListIcon from 'material-ui-icons/FilterList';
import DateRangeIcon from 'material-ui-icons/DateRange';
import { withStyles } from 'material-ui/styles';
import MonthPicker from 'react-simple-month-picker';
import { connect } from 'react-redux';
import { Admin } from '../configuration/variables';
import moment from 'moment';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    hidden: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
      },

});

const mapStateToProps = (state) => ({
    role: state.userRole
})

class CalendarFilter extends Component{
    state = {
      filterChoice:""
    };

    selectEvent = (event) => {
        this.props.handleSelectEvent(event);
    }

    selectSlot = (slot) => {
        this.props.handleSelectSlot(slot);

    }

    state = {
        anchorEl: null,
      };
    
      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleSelect = (event) => {

        this.setState({ 
            filterChoice: event.target.id,
            anchorEl: null, 
            open: true 
        });
      };

    handleRoomChange = event => {
        this.setState({room: event && event.value})
    };

    handleUserChange = event => {
        this.setState({user: event && event.value})
    };

    handleSemesterChange = event => {
        this.setState({semester: event && event.value})
    };

    handleClose = () => {
        this.setState({ open: false, anchorEl: null, filterChoice: '' });
      };
    
    handleOk = () => {
        this.props.selectFilter(this.state.filterChoice, this.state[this.state.filterChoice])
        this.setState({open: false, anchorEl: null, filterChoice: this.state.filterChoice + " = " + this.state[this.state.filterChoice]});
    }

    setCalendarDate = (date) => {
        // this.setState({monthPicker: false})
        this.props.changeCalendarDate(new Date(moment(date).subtract(5, 'd')));
    }

    handleMonthPick  = () => {
        this.setState({monthPicker: true})
    }

    render(){
        const { anchorEl } = this.state;
        const {classes} = this.props;


        return(
            <div>
                
                <Tooltip title="Select Month">
                <Button
                variant="raised"
                size="small"
                style={{backgroundColor: 'rgba(0,0,0,.7)', color: 'white'}}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMonthPick}
                className={classes.button}
                >
                 <DateRangeIcon/> 
                </Button>
                </Tooltip>
                <Tooltip title="Filter Events">
                <Button
                style={this.props.role != Admin ? {display: 'none'} : {}}
                variant="raised"
                size="small"
                style={{backgroundColor: 'rgba(0,0,0,.7)', color: 'white'}}
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                className={classes.button}
                >
                 <FilterListIcon/> 
                </Button>
                </Tooltip>

                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                >
                <MenuItem id="user" onClick={this.handleSelect}>User</MenuItem>
                <MenuItem id="semester" onClick={this.handleSelect}>Semester</MenuItem>
                <MenuItem id="room" onClick={this.handleSelect}>Room</MenuItem>
                </Menu>
                <Dialog
                    onEntering={this.handleEntering}
                    aria-labelledby="confirmation-dialog-title"
                    open={this.state.open}
                    style={{display: 'flex'}}
                >
                    <DialogTitle id="confirmation-dialog-title">Select {this.state.filterChoice}</DialogTitle>
                    <DialogContent
                        className={this.state.filterChoice !== "room" ? classes.hidden : ''}
                    >
                        <Select
                            closeOnSelect
                            onChange={this.handleRoomChange}
                            options={this.props.roomList && this.props.roomList.map( row => 
                                row = {label: row.ROOM_ID, value: row.ROOM_ID}
                            )}
                            value={this.state.room}
                            optionComponent={Option}
                        />
                    </DialogContent>
                    <DialogContent
                        className={this.state.filterChoice !== "user" ? classes.hidden : ''}
                    >
                        <Select
                            closeOnSelect
                            onChange={this.handleUserChange}
                            options={this.props.userList && this.props.userList.map( row => 
                                row = {label: row.USER_ID, value: row.USER_ID}
                            )}
                            value={this.state.user}
                            optionComponent={Option}
                        />
                    </DialogContent>
                    <DialogContent
                        className={this.state.filterChoice !== "semester" ? classes.hidden : ''}
                    >
                        <Select
                            closeOnSelect
                            onChange={this.handleSemesterChange}
                            options={[
                                {value: 1, label: 1},
                                {value: 2, label: 2},
                                {value: 3, label: 3},
                                {value: 4, label: 4},
                                {value: 5, label: 5},
                            ]}
                            value={this.state.semester}
                            optionComponent={Option}
                        />
                    </DialogContent>
                    
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.monthPicker} >
                    <DialogContent>
                        <MonthPicker onChange={(date)=>this.setCalendarDate(date)}/>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(connect(mapStateToProps)(CalendarFilter)) ;
