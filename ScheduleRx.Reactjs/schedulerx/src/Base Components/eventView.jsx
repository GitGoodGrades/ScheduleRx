import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PrintIcon from 'material-ui-icons/Print';
import moment from 'moment';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import ReactToPrint from "react-to-print";
import { ulmTheme as theme1 } from '../MaterialUI/theme/index';


const styles = theme => ({
  card: {
    width: 325,
    wordWrap: 'break-word'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 5,
    fontSize: 15
    
  },
  pos: {
    marginBottom: 5,
    fontSize: 15
  },
  content: {
    fontSize: 15,
    marginBottom: 5,
    wordWrap: 'break-word'
    
  }
});


class EventView extends Component{
  handleClose = () => {
  this.props.onClose();
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

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            BOOKING_ID: nextProps.event.BOOKING_ID,
            SECTION_ID: nextProps.event.SECTIONS && nextProps.event.SECTIONS.records.length > 0 ? nextProps.event.SECTIONS.records[0].SECTION_ID : '',
            details: nextProps.event.DETAILS
        })
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
      
        <div className="text-center"
          ref={el => (this.componentRef = el)}
        >
            <DialogContent className={classes.card}>
              <Typography align='center' variant="headline" component="h2">
                {event && event.BOOKING_TITLE}
              </Typography>
              <Typography className={classes.pos}>Course: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}</Typography>
                <Typography className={classes.content} component="p">
                    Sections: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records.map(sec => sec.SECTION_ID + ' ') : " "
                    }
                </Typography>
              <Typography className={classes.title}>In Room {event && event.ROOM_ID}</Typography>
              <Typography className={classes.content} component="p">
                On {event && moment(event.START_TIME).format('MMMM Do YYYY')}
              </Typography>
              <Typography className={classes.content} component="p">
                From {event && moment(event.START_TIME).format('h:mm a')} - 
                {event && moment(event.END_TIME).format('h:mm a')}
              </Typography>
              <Typography className={classes.content} component="p">
                Details: {this.findNote(event && event.SECTIONS)}
              </Typography>
            </DialogContent>
      </div>
      <DialogContent>
      <div style={{float: "right"}}>
              <ReactToPrint
                trigger={() => <a href="#"><PrintIcon color="primary"/></a>}
                content={() => this.componentRef}
              />
      </div>
      </DialogContent>
      </ Dialog>
  );
  }
  
}

export default withStyles(styles)(EventView);