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
import {Divider} from 'material-ui';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';


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

class EventViewEditFull extends Component{
    state = {
        edit: false,
        date: null, 
        sectionChange: false,
        originalEvent: {}
    }

    handleClose = () => {
    this.props.onClose();
    };
    

  render(){
    const { classes, event, onClose } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
      <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
      >
        <div>
          <Card className={classes.card}>
            <CardContent className={this.state.edit ? classes.hidden : ''}>
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
                        <TableCell>{
                            this.props.conflict.EVENTS && this.props.conflict.EVENTS.length > 2 && this.props.conflict.EVENTS.map((elem, index, array) => {
                                if(index + 2 < array.length){
                                    return<div>
                                    {(index + 1)+ ". " + this.props.conflict.EVENTS[index].BOOKING_TITLE}
                                    <br/>
                                    </div>
                                }
                                else if (index+1 == array.length){
                                    return;
                                }
                                else{
                                    return (index + 1)+ ". " + this.props.conflict.EVENTS[index].BOOKING_TITLE;
                                }
                            }) ||   this.props.conflict.EVENTS && this.props.conflict.EVENTS[0].BOOKING_TITLE}
        
                        </TableCell>
                        <TableCell>{    
                            this.props.conflict.EVENTS && this.props.conflict.EVENTS[(this.props.conflict.EVENTS.length - 1)].BOOKING_TITLE }
                        </TableCell>
                    </TableRow>
                    <TableRow id={1}>
                        <TableCell>Course</TableCell>
                        <TableCell>{
                            this.props.conflict.COURSE_ID && this.props.conflict.COURSE_ID.length > 2 && this.props.conflict.COURSE_ID.map((elem, index, array) => {
                                if(index+2 < array.length){
                                    return<div>
                                    {(index+1)+ ". " + this.props.conflict.COURSE_ID[index]}
                                    <br/>
                                    </div>
                                }
                                else if (index+1 == array.length){
                                    return;
                                }
                                else{
                                    return (index+1)+ ". " + this.props.conflict.COURSE_ID[index];
                                }
                            }) || this.props.conflict.COURSE_ID &&  this.props.conflict.COURSE_ID[0]
                            }
                        </TableCell>
                        <TableCell >{this.props.conflict.COURSE_ID && this.props.conflict.COURSE_ID[(this.props.conflict.EVENTS.length - 1)]}</TableCell>
                    </TableRow>
                    <TableRow id={2} hover="false">
                        <TableCell>Event Time</TableCell>
                        <TableCell>{
                            this.props.conflict.EVENTS && this.props.conflict.EVENTS.length > 2 && this.props.conflict.EVENTS.map((elem, index, array) => {
                                if(index + 2 < array.length){
                                    return<div>
                                    {(index + 1)+ ". " + moment(this.props.conflict.EVENTS[index].START_TIME).format('h:mm a') + "-" +  moment(this.props.conflict.EVENTS[index].END_TIME).format('h:mm a')}
                                    <br/>
                                    </div>
                                }
                                else if (index+1 == array.length){
                                    return;
                                }
                                else{
                                    return (index+1)+ ". " + moment(this.props.conflict.EVENTS[index].START_TIME).format('h:mm a') + "-" +  moment(this.props.conflict.EVENTS[index].END_TIME).format('h:mm a');
                                }
                            }) ||   this.props.conflict.EVENTS && 
                                    moment(this.props.conflict.EVENTS[0].START_TIME).format('h:mm a') + "-" +  moment(this.props.conflict.EVENTS[0].END_TIME).format('h:mm a')}
        
                        </TableCell>
                        <TableCell>{    
                            this.props.conflict.EVENTS && 
                            moment(this.props.conflict.EVENTS[(this.props.conflict.EVENTS.length - 1)].START_TIME).format('h:mm a') + "-" +  moment(this.props.conflict.EVENTS[(this.props.conflict.EVENTS.length - 1)].END_TIME).format('h:mm a')}
                        </TableCell>
                    </TableRow>
                    {/* <TableRow id={3} hover="false">
                        <TableCell>Sections</TableCell>
                        <TableCell>{
                            this.props.conflict.EVENTS && this.props.conflict.EVENTS.length > 2 && this.props.conflict.EVENTS.map((elem, index, array) => {
                                if(index+2 < array.length){
                                    return<div>
                                    {(index+1)+ ". " + (this.props.conflict.EVENTS[index].SECTIONS &&
                                                        this.props.conflict.EVENTS[index].SECTIONS.records.map((el, i, arr) => {
                                                        if (i+1 < arr.length) { 
                                                            return el.SECTION_ID + ", ";
                                                        } else {
                                                            return el.SECTION_ID;
                                                        }}))}
                                    <br/>
                                    </div>
                                }
                                else if (index+1 == array.length){
                                    return;
                                }
                                else{
                                    return (index+1)+ ". " + (this.props.conflict.EVENTS[index].SECTIONS &&
                                    this.props.conflict.EVENTS[index].SECTIONS.records.map((el, i, arr) => {
                                        if (i+1 < arr.length) { 
                                            return el.SECTION_ID + ", ";
                                        } else {
                                            return el.SECTION_ID;
                                        }}))
                                }
                            }) ||   this.props.conflict.EVENTS &&
                                    this.props.conflict.EVENTS[0].SECTIONS &&
                                    this.props.conflict.EVENTS[0].SECTIONS.records.map((el, i, arr) => {
                                        if (i+1 < arr.length) { 
                                            return el.SECTION_ID + ", ";
                                        } else {
                                            return el.SECTION_ID;
                                        }
                        })}</TableCell>
                        <TableCell >{
                            this.props.conflict.EVENTS &&
                            this.props.conflict.EVENTS[this.props.conflict.EVENTS.length - 1].SECTIONS &&
                            this.props.conflict.EVENTS[this.props.conflict.EVENTS.length - 1].SECTIONS.records.map((elem, index, array) => {
                                if (index+1 < array.length) { 
                                    return elem.SECTION_ID + ", ";
                                } else {
                                    return elem.SECTION_ID;
                                }
                        })}</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
            <h3> Reason: </h3>
            <p>{this.props.conflict.MESSAGE}</p>
            </CardContent>
            <CardActions className={this.state.edit ? '' : classes.hidden}>
                 <Button variant="raised" size="small" onClick={this.cancel}>
                    Cancel
                </Button> 
                <Button variant="raised" size="small" onClick={this.handleSave}>
                    Save
                </Button>
            </CardActions>
          </Card>
        </div>
      </ Dialog>
  );
  }
  
}

export default withStyles(styles)(EventViewEditFull);