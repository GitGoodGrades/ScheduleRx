import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import Dialog, {DialogContent, DialogActions} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ReactToPrint from "react-to-print";
import {InputLabel} from "material-ui/Input";
import Save from "material-ui-icons/Save";

const styles = theme => ({
  card: {
    minWidth: 275,
    height: 'auto'
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
  content: {
    fontSize: 15,
    marginBottom: 5
  },
  hidden: {
    display: 'none'
  }
});

const mapStateToProps = (state) => ({
    role: state.userRole
});

class EventEditView extends Component{
  state = {
    details: '',
    noteChange: false
  };

  handleClose = () => {
    this.props.onClose();
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({ 
      BOOKING_ID: nextProps.event.BOOKING_ID,
      SECTION_ID: nextProps.event.SECTIONS && nextProps.event.SECTIONS.records.length > 0 ? nextProps.event.SECTIONS.records[0].SECTION_ID : '', 
      details: this.findNote(nextProps.event && nextProps.event.SECTIONS)
    })
  };

  handleChange = (event) => {
    this.setState({ details: event.target.value, noteChange: true})
  };

  handleSave = () => {
    let sectionDetail = {
        BOOKING_ID: this.state.BOOKING_ID,
        SECTION_ID: this.state.SECTION_ID,
        details: this.state.details
    }
    this.props.onSave(sectionDetail)
  };


  findNote(sectionList) {
      let arrayLength = sectionList && sectionList.records.length;
      for (let i = 0; i < arrayLength; i++) {
          if (sectionList.records[i].SECTION_ID == this.state.SECTION_ID) {
              return sectionList.records[i].NOTES;
          }
      }
      return "";
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
    <ReactToPrint
            trigger={() => <a href="#">Print</a>}
            content={() => this.componentRef}
        />
      <DialogContent className={classes.card} ref={el => (this.componentRef = el)}>
          
          <Typography align='center' variant="headline" component="h2">
            {event && event.BOOKING_TITLE}
          </Typography>
          <Typography className={classes.content}>Course: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}</Typography>
          <Typography className={classes.content} component="p">
              Sections: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records.map(sec => sec.SECTION_ID + ' ') : " "
              }
          </Typography>
          <Typography className={classes.content} component="p">
            In Room {event && event.ROOM_ID}
          </Typography>        
          <Typography component="p" className={classes.content}>
            On {event && moment(event.START_TIME).format('MMMM Do YYYY')}
          </Typography>
          <Typography component="p" className={classes.content}>
            From {event && moment(event.START_TIME).format('h:mm a')} - 
            {event && moment(event.END_TIME).format('h:mm a')}
          </Typography>
          <InputLabel style={{color: 'black', fontSize: 15}}>DETAILS:</InputLabel>
          <div><TextField
            id="details"
            className={classes.content}
            multiline
            value={this.state.details}
            onChange={this.handleChange}
            defaultValue={this.findNote(event && event.SECTIONS)}
            
            inputProps={{maxLength: 250}}
            disabled={moment(event.START_TIME).isBefore(moment())}
            InputProps={{disableUnderline: true}}
            
            style={{border: '1px solid rgb(204, 204, 204)', width: '98%', borderRadius: '4px', paddingLeft: '2%' }}
          /></div>

            <Button variant="raised"
                    color="secondary" 
                    size="small" 
                    style={{float: 'right'}} 
                    className={this.state.noteChange? classes.button : classes.hidden}
                    onClick={this.handleSave}
            >
                    Save
                    <Save style={{paddingLeft: 5}}/>
            </Button>
        </DialogContent> 
    </div>
  </ Dialog>
  );
  }
  
}

export default withStyles(styles)(EventEditView);