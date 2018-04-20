import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, {DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui-pickers/DatePicker';
import TimePicker from 'material-ui-pickers/TimePicker';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Save from 'material-ui-icons/Save';
import 'react-select/dist/react-select.css';
import {Divider} from 'material-ui';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Clear from 'material-ui-icons/Clear';
import Send from 'material-ui-icons/Send';


const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    hidden: {
        display: 'none'
    }
});

class ApproveDialog extends Component{
    state = {
        APPROVED: {},
        EVENTS: null,
        MESSAGE: "",
        CONFLICT_ID:"",
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            conflictEvent: nextProps.conflict,
            CONFLICT_ID: nextProps.conflict.CONFLICT_ID
        })
        
    };

    handleSave = () => {
        let temp = {
            APPROVED: {},
            MESSAGE: this.state.MESSAGE == "",
            CONFLICT_ID: this.state.CONFLICT_ID,
            EVENTS: []
        };

        (this.state.conflictEvent && this.state.conflictEvent.EVENTS && this.state.conflictEvent.EVENTS.map(row => {
            if (row.SCHEDULE_ID != null) {
                temp.EVENTS.push(row);
            }
            else {
                temp.APPROVED = row;
            }
        }));

        this.props.approve(temp);
    };

    handleClose = () => {
        this.props.close();
    };

    handleChange = (event) => {
        this.setState({ MESSAGE: event.target.value })
    };

    render(){
        const { classes, event, onClose } = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                onBackdropClick={this.handleClose}
            >
                <div>
                        <DialogContent className={this.state.edit ? classes.hidden : ''}>
                            <Typography style={{fontWeight: 'bold'}}>
                                The event for room {this.state.conflictEvent && this.state.conflictEvent.ROOM} will be created
                            </Typography>
                            <div 
                                hidden={
                                    this.state.conflictEvent && 
                                    this.state.conflictEvent.EVENTS && 
                                    this.state.conflictEvent.EVENTS.length > 1 ? false : true  }>
                            <Typography style={{fontWeight: 'bold'}}>And the Following Event(s) will be Deleted:</Typography>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="none" style={{paddingRight: 15}}><Typography style={{fontWeight: 'bold'}}>Title:</Typography></TableCell>
                                        <TableCell padding="none" style={{paddingRight: 15}}><Typography style={{fontWeight: 'bold'}}>Begin Time:</Typography></TableCell>
                                        <TableCell padding="none" style={{paddingRight: 15}}><Typography style={{fontWeight: 'bold'}}>End Time:</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(this.state.conflictEvent && this.state.conflictEvent.EVENTS && this.state.conflictEvent.EVENTS.map(row => {
                                        if (row.SCHEDULE_ID !== null) {
                                            return (
                                                <TableRow key={row.BOOKING_TITLE}>
                                                    <TableCell padding="none" style={{paddingRight: 15}}>{row.BOOKING_TITLE}</TableCell>
                                                    <TableCell padding="none" style={{paddingRight: 15}}>{row.START_TIME}</TableCell>
                                                    <TableCell padding="none" style={{paddingRight: 15}}>{row.END_TIME}</TableCell>
                                                </TableRow>
                                            );
                                        }
                                    })) || <TableRow><TableCell padding="none" style={{paddingRight: 15}}>No Results</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                            <Typography style={{fontWeight: 'bold', marginTop: 15}}>Notify Faculty of changes? (Optional)</Typography>
                            <TextField
                                id="message"
                                multiline
                                value={this.state.message}
                                onBlur={this.handleChange}
                                inputProps={{maxLength: 250}}
                                InputProps={{disableUnderline: true, paddingLeft: '3%', paddingRight: '3%', inputProps: {style:{fontSize: '12px'}}}}
                                style={{border: '1px solid rgb(204,204,204)', borderRadius: '4px', width: '96%', paddingLeft: '2%', paddingRight: '2%'}}
                            />
                            </div>
                            <div 
                                hidden={
                                    this.state.conflictEvent && 
                                    this.state.conflictEvent.EVENTS &&  
                                    this.state.conflictEvent.EVENTS.length > 1 ? true : false} >
                                <Typography>Would you like to continue?</Typography>
                            </div>
                            <div style={{float: 'right', marginTop: 10}}>
                            <Button style={{fontSize: 12}} variant="raised" color="secondary" size="small" onClick={this.handleClose}>
                                Cancel
                                <Clear fontSize='12px'></Clear>
                            </Button>
                            <Button  style={{marginLeft: 5, fontSize: 12}} variant="raised" color="secondary" size="small" onClick={this.handleSave}>
                                Confirm
                                <Send fontSize='12px' ></Send>
                            </Button>
                            </div>
                        </DialogContent>
                </div>
            </ Dialog>
        );
    }

}

export default withStyles(styles)(ApproveDialog);