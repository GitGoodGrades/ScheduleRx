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
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Save from 'material-ui-icons/Save';
import 'react-select/dist/react-select.css';
import DialogActions, { Divider } from 'material-ui';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Edit from 'material-ui-icons/Edit';
import Done from 'material-ui-icons/Done';
import Clear from 'material-ui-icons/Clear';
import Send from 'material-ui-icons/Send';
import {client} from '../../../../configuration/client';


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
  },
  approve: {
      backgroundColor: 'rgba(255, 0, 0, .5)',
      borderColor: 'transparent'
  },
  noApprove: {
      backgroundColor: 'white'
  },
  deny: {
      backgroundColor: 'rgba(0, 255, 0, .5)',
      borderColor: 'transparent'
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
          <Card className={classes.card}>
          <IconButton variant="fab" color="secondary" className={classes.button} onClick={this.exit}>
            <Clear></Clear>
            </IconButton>
            <CardContent className={this.props.conflict.TYPE === "Conflict" ? classes.hidden : ''}>
                <h2>
                    Request for room {this.props.conflict.ROOM} on {moment(this.props.conflict.CONFLICT_START).format("MMM Do YYYY")}
                </h2>
                <Table>
                <TableBody>
                <TableRow id={0} hover="false">
                        <TableCell >Event Title</TableCell>
                        <TableCell 
                        >{    
                            this.state.conflictEvent && this.state.conflictEvent.BOOKING_TITLE }
                        </TableCell>
                    </TableRow>
                    <TableRow id={1}>
                        <TableCell>Course</TableCell>
                        <TableCell >{
                            this.state.conflictEvent &&
                            this.state.conflictEvent.SECTIONS &&
                            this.state.conflictEvent.SECTIONS.records &&
                            this.state.conflictEvent.SECTIONS.records[0].COURSE_ID}
                        </TableCell>
                    </TableRow>
                    <TableRow id={2} hover="false">
                        <TableCell>Event Time</TableCell>
                        <TableCell>{    
                            this.state.conflictEvent && 
                            moment(this.state.conflictEvent.START_TIME).format('h:mm a') + "-" +  moment(this.state.conflictEvent.END_TIME).format('h:mm a')}
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                <h3> Reason for Request: </h3>
                <p>{this.props.conflict.MESSAGE}</p>
            </CardContent>
            <CardContent className={this.props.conflict.TYPE === "Conflict" ? '' : classes.hidden}>
                <h2>
                    Conflict in room {this.props.conflict.ROOM} on {moment(this.props.conflict.CONFLICT_START).format("MMM Do YYYY")}
                </h2>
                <Table>
                <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell>Current Event(s)</TableCell>
                    <TableCell>Requesting Event</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow id={0} hover="false">
                        <TableCell>Event Title</TableCell>
                        <TableCell className={this.state.approveHighlight? classes.approve : this.state.denyHighlight? classes.deny : classes.noApprove}>{
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
                        <TableCell className={this.state.approveHighlight? classes.deny : this.state.denyHighlight? classes.approve : classes.noApprove} >{    
                            this.state.conflictEvent && this.state.conflictEvent.BOOKING_TITLE }
                        </TableCell>
                    </TableRow>
                    <TableRow id={1}>
                        <TableCell>Course</TableCell>
                        <TableCell  className={this.state.approveHighlight? classes.approve : this.state.denyHighlight? classes.deny : classes.noApprove} >{
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
                        <TableCell className={this.state.approveHighlight? classes.deny : this.state.denyHighlight? classes.approve : classes.noApprove}>{
                            this.state.conflictEvent &&
                            this.state.conflictEvent.SECTIONS &&
                            this.state.conflictEvent.SECTIONS.records &&
                            this.state.conflictEvent.SECTIONS.records[0].SECTION_ID}
                        </TableCell>
                    </TableRow>
                    <TableRow id={2} hover="false">
                        <TableCell>Event Time</TableCell>
                        <TableCell className={this.state.approveHighlight? classes.approve : this.state.denyHighlight? classes.deny : classes.noApprove}>{
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
                        <TableCell className={this.state.approveHighlight? classes.deny : this.state.denyHighlight? classes.approve : classes.noApprove}>{    
                            this.state.conflictEvent && 
                            moment(this.state.conflictEvent.START_TIME).format('h:mm a') + "-" +  moment(this.state.conflictEvent.END_TIME).format('h:mm a')}
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
                <h3> Reason for Request: </h3>
                <p>{this.props.conflict.MESSAGE}</p>
            </CardContent>
            <CardActions>
            
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.selectEdit}  >
                Edit Request
                <Edit></Edit>
              </Button>
              <Button variant="raised" color="secondary" className={classes.button} onClick={this.selectDeny} onMouseEnter={this.denyEnter} onMouseLeave={this.denyLeave} >
                Deny Request
                <Done></Done>
              </Button>
              <Button variant="raised" color="secondary"className={classes.button} onClick={this.selectApprove} onMouseEnter={this.approveEnter} onMouseLeave={this.approveLeave} >
                Approve Request
                <Done></Done>
              </Button>
            </CardActions>
          </Card>
        </div>
        </ Dialog>
        <Dialog
            open={this.props.denyOpen}
        >
            <CardContent>
                <Typography>
                 {this.props.eventDetails} 
                </Typography>
                <textarea maxLength={300} onBlur={this.handleMessageBlur} id="denyMessage">
                </textarea>
            </CardContent>
            <CardActions>
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.selectCancelDeny}>
                    Cancel
                    <Clear></Clear>
                </Button>
              <Button variant="raised" color="secondary"className={classes.button} onClick={this.selectDenySend}>
                Send
                <Send></Send>
              </Button>
            </CardActions>
        </Dialog>          
        </div>
  );
  }
  
}

export default withStyles(styles)(EventViewEditFull);