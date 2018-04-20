import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui-pickers/DatePicker';
import TimePicker from 'material-ui-pickers/TimePicker';
import moment from 'moment';
import Dialog, {DialogActions, DialogContent} from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Save from 'material-ui-icons/Save';
import 'react-select/dist/react-select.css';
import { Divider } from 'material-ui';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Edit from 'material-ui-icons/Edit';
import Done from 'material-ui-icons/Done';
import Clear from 'material-ui-icons/Clear';
import Send from 'material-ui-icons/Send';
import {client} from '../../../../configuration/client';


const styles = theme => ({
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
  },
  approve: {
        backgroundColor: 'rgba(255, 0, 0, .5)',
        borderColor: 'transparent',
        transition: 'background-Color .3s linear', 
        transitionDelay: 'initial',
  },
  noApprove: {
        backgroundColor: 'white',
        borderColor: '#E0E0E0',
        transition: 'background-Color .3s linear, border-Color .3s linear', 
        transitionDelay: 'initial',
  },
  deny: {
        backgroundColor: 'rgba(0, 255, 0, .5)',
        borderColor: 'transparent',
        transition: 'background-Color .3s linear',
        transitionDelay: 'initial',
  }
});

class EventViewEditFull extends Component{
    state = {
        conflictEvent: null,
        events: null,
        denyMessage: "",
        denyHighlight: false,
        approveHighlight: false
    }

    approveEnter = () => {this.setState({approveHighlight: true})}
   
    approveLeave = () => {this.setState({approveHighlight: false})}

    componentWillReceiveProps = (nextProps) => {
        let temp = [];
        nextProps.conflict && nextProps.conflict.EVENTS && nextProps.conflict.EVENTS.forEach(element => {
            if(element.SCHEDULE_ID == null){
                this.setState({
                    conflictEvent: element
                })
            }else{
                temp.push(element)
            }
        });
        this.setState({events: temp})
    }

    denyEnter = () => {this.setState({denyHighlight: true})}
    
    denyLeave = () => {this.setState({denyHighlight: false})}
    
    handleClose = () => {
    this.props.onClose();
    };

    selectDeny = () => {
        this.props.onSelectDeny();
    };

    selectApprove = () => {
        this.props.onSelectApprove();
    }

    selectEdit = () => {
        this.props.onSelectEdit();
    }

    selectCancelDeny = () => {
        this.props.onSelectCancelDeny();
    }

    selectDenySend = () => {
        client.post('bookings/delete.php', {
            SCHEDULE_ID: this.state.conflictEvent.SCHEDULE_ID,
            BOOKING_ID: this.state.conflictEvent.BOOKING_ID
        })
        this.props.onSelectDenySend(this.state.conflictEvent.CONFLICT_ID);
    }

    handleMessageBlur = (event) => {
        this.props.handleMessage(
            event.target.id, event.target.value
        );
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    

    selectCancelDeny = () => {
        this.props.onSelectDenyCancel();
    }

    exit = () => {
        this.props.onExit();
    }

    

  render(){
    const { classes, event, onClose } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
      <div>
      <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
      >
        
        <div>
          <IconButton size="small" style={{marginTop: 10, marginLeft: 10}} variant="fab" color="secondary" className={classes.button} onClick={this.exit}>
            <Clear/>
            </IconButton>
            <DialogContent className={this.props.conflict.TYPE === "Conflict" ? classes.hidden : ''}>
                <Typography align="center" component="h2" variant="headline" style={{fontWeight: 'bold'}}>
                    Request for room {this.props.conflict.ROOM} on {moment(this.props.conflict.CONFLICT_START).format("MMM Do YYYY")}
                </Typography>
                <Table>
                <TableBody>
                <TableRow id={0}>
                        <TableCell padding="none" style={{width: "30%"}}><Typography style={{fontWeight: 'bold'}}>Event Title:</Typography></TableCell>
                        <TableCell padding="none" style={{width: "30%"}}><Typography style={{fontWeight: 'bold'}}>Course:</Typography></TableCell>
                        <TableCell padding="none" style={{width: "30%"}}><Typography style={{fontWeight: 'bold'}}>Event Time:</Typography></TableCell>
                    </TableRow>
                <TableRow id={1}>
                    <TableCell padding="none"
                    >{    
                        this.state.conflictEvent && this.state.conflictEvent.BOOKING_TITLE }
                    </TableCell>
                    <TableCell padding="none">{
                        this.state.conflictEvent &&
                        this.state.conflictEvent.SECTIONS &&
                        this.state.conflictEvent.SECTIONS.records &&
                        this.state.conflictEvent.SECTIONS.records[0].COURSE_ID}
                    </TableCell>
                    <TableCell padding="none" >{    
                        this.state.conflictEvent && 
                        moment(this.state.conflictEvent.START_TIME).format('h:mm a') + "-" +  moment(this.state.conflictEvent.END_TIME).format('h:mm a')}
                    </TableCell>
                </TableRow>
                </TableBody>
                </Table>
                <Typography style={{fontWeight: 'bold', marginTop: 15}}>Reason for Request: </Typography>
                <Typography style={{textTransform: 'none'}}>{this.props.conflict.MESSAGE? this.props.conflict.MESSAGE : "None"}</Typography>
            </DialogContent>
            <DialogContent className={this.props.conflict.TYPE === "Conflict" ? '' : classes.hidden}>
                <Typography component="h2" align="center" variant="headline" style={{fontWeight: 'bold'}} >
                    Conflict in room {this.props.conflict.ROOM} on {moment(this.props.conflict.CONFLICT_START).format("MMM Do YYYY")}
                </Typography>
                <Table >
                <TableHead>
                <TableRow>
                    <TableCell padding="none" style={{width: '20%'}}/>
                    <TableCell style={{width: '40%'}} padding="none"><Typography style={{fontWeight: 'bold'}}>Current Event(s):</Typography></TableCell>
                    <TableCell style={{width: '40%'}} padding="none"><Typography style={{fontWeight: 'bold'}}>Requesting Event:</Typography></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow id={0}>
                        <TableCell padding="none"><Typography style={{fontWeight: 'bold'}}>Event Title:</Typography></TableCell>
                        <TableCell padding="none" style={{paddingLeft: 5}} className={this.state.approveHighlight? classes.approve : this.state.denyHighlight? classes.deny : classes.noApprove}>{
                            this.state.events && this.state.events.length > 1 && this.state.events.map((elem, index, array) => {
                                if(index + 1 < array.length){
                                    return<div>
                                    {(index + 1)+ ". " + this.state.events[index].BOOKING_TITLE}
                                    <br/>
                                    </div>
                                }
                                else{
                                    return (index + 1)+ ". " + this.state.events[index].BOOKING_TITLE;
                                }
                            }) ||   this.state.events && this.state.events[0] && this.state.events[0].BOOKING_TITLE}
        
                        </TableCell>
                        <TableCell style={{paddingLeft: 5}} padding="none" className={this.state.approveHighlight? classes.deny : this.state.denyHighlight? classes.approve : classes.noApprove} >{    
                            this.state.conflictEvent && this.state.conflictEvent.BOOKING_TITLE }
                        </TableCell>
                    </TableRow>
                    <TableRow id={1}>
                        <TableCell padding="none"><Typography style={{fontWeight: 'bold'}}>Course:</Typography></TableCell>
                        <TableCell style={{paddingLeft: 5}} padding="none" className={this.state.approveHighlight? classes.approve : this.state.denyHighlight? classes.deny : classes.noApprove} >{
                            this.state.events && this.state.events.length > 1 && this.state.events.map((elem, index, array) => {
                                if(index+1 < array.length){
                                    return<div>
                                    {(index+1)+ ". " + 
                                        (this.state.events[index].SECTIONS &&
                                        this.state.events[index].SECTIONS.records &&
                                        this.state.events[index].SECTIONS.records[0].SECTION_ID)}
                                    <br/>
                                    </div>
                                }
                                else{
                                    return (index+1)+ ". " + 
                                        (this.state.events[index].SECTIONS &&
                                        this.state.events[index].SECTIONS.records &&
                                        this.state.events[index].SECTIONS.records[0].SECTION_ID)
                                }
                            }) ||   this.state.events && this.state.events[0] &&
                                    this.state.events[0].SECTIONS &&
                                    this.state.events[0].SECTIONS.records &&
                                    this.state.events[0].SECTIONS.records[0].SECTION_ID}
                        </TableCell>
                        <TableCell style={{paddingLeft: 5}} padding="none" className={this.state.approveHighlight? classes.deny : this.state.denyHighlight? classes.approve : classes.noApprove}>{
                            this.state.conflictEvent &&
                            this.state.conflictEvent.SECTIONS &&
                            this.state.conflictEvent.SECTIONS.records &&
                            this.state.conflictEvent.SECTIONS.records[0].SECTION_ID}
                        </TableCell>
                    </TableRow>
                    <TableRow id={2}>
                        <TableCell padding="none"><Typography style={{fontWeight: 'bold'}}>Event Time:</Typography></TableCell>
                        <TableCell style={{paddingLeft: 5}} padding="none" className={this.state.approveHighlight? classes.approve : this.state.denyHighlight? classes.deny : classes.noApprove}>{
                            this.state.events && this.state.events.length > 1 && this.state.events.map((elem, index, array) => {
                                if(index + 1 < array.length){
                                    return<div>
                                    {(index + 1)+ ". " + moment(this.state.events[index].START_TIME).format('h:mm a') + "-" +  moment(this.state.events[index].END_TIME).format('h:mm a')}
                                    <br/>
                                    </div>
                                }
                                else{
                                    return (index+1)+ ". " + moment(this.state.events[index].START_TIME).format('h:mm a') + "-" +  moment(this.state.events[index].END_TIME).format('h:mm a');
                                }
                            }) ||   this.state.events && this.state.events[0] && 
                                    moment(this.state.events[0].START_TIME).format('h:mm a') + "-" +  moment(this.state.events[0].END_TIME).format('h:mm a')}
        
                        </TableCell>
                        <TableCell  padding="none" className={this.state.approveHighlight? classes.deny : this.state.denyHighlight? classes.approve : classes.noApprove}>{    
                            this.state.conflictEvent && 
                            moment(this.state.conflictEvent.START_TIME).format('h:mm a') + "-" +  moment(this.state.conflictEvent.END_TIME).format('h:mm a')}
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                <Typography style={{fontWeight: 'bold', marginTop: 15}} >
                    Reason for Request: 
                </Typography>
                <Typography style={{textTransform: 'none'}}>
                    {this.props.conflict.MESSAGE? this.props.conflict.MESSAGE : "None" }
                </Typography>
                </DialogContent>
                <DialogContent>
                <div style={{display: 'inline', float: 'right'}}>
                <Button style={{marginLeft: 5, marginTop: 15}} 
                        variant="raised" 
                        size="small" 
                        color="secondary" 
                        className={classes.button} 
                        onClick={this.selectEdit}  >
                Edit Request
                <Edit size="small"></Edit>
              </Button>
              <Button style={{marginLeft: 5,  marginTop: 15}} 
                      variant="raised" 
                      size="small" 
                      color="secondary" 
                      className={classes.button} 
                      onClick={this.selectDeny} 
                      onMouseEnter={this.denyEnter} 
                      onMouseLeave={this.denyLeave} >
                Deny Request
                <Clear size="small" ></Clear>
              </Button>
              <Button style={{ marginLeft: 5, marginTop: 15}} 
                      variant="raised" 
                      size="small" 
                      color="secondary"
                      className={classes.button} 
                      onClick={this.selectApprove} 
                      onMouseEnter={this.approveEnter} 
                      onMouseLeave={this.approveLeave} >
                Approve Request
                <Done size="small"></Done>
              </Button>
              </div>
            </DialogContent>
        </div>
        </ Dialog>
        <Dialog
            open={this.props.denyOpen}
        >
            <DialogContent>
                <Typography>
                 {this.props.eventDetails} 
                </Typography>
                <TextField inputProps={{maxLength: 250}}
                            InputProps={{disableUnderline: true, paddingLeft: '3%', paddingRight: '3%', inputProps: {style:{fontSize: '12px'}}}}
                            onBlur={this.handleMessageBlur} 
                            id="denyMessage"
                            multiline
                            style={{border: '1px solid rgb(204,204,204)', borderRadius: '4px', width: '96%', paddingLeft: '2%', paddingRight: '2%'}}
                            />
                
            
                <div style={{float: 'right', marginTop: 10}}>
                <Button variant="raised" size="small" color="secondary" className={classes.button} onClick={this.selectCancelDeny}>
                    Cancel
                    <Clear></Clear>
                </Button>
              <Button style={{marginLeft: 5}} variant="raised" size="small" color="secondary"className={classes.button} onClick={this.selectDenySend}>
                Send
                <Send></Send>
              </Button>
              </div>
              </DialogContent>
        </Dialog>          
        </div>
  );
  }
  
}

export default withStyles(styles)(EventViewEditFull);