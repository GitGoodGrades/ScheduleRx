import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';

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
});


class EventView extends Component{
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
            <CardContent>
              <Typography className={classes.title}>Room: {event && event.ROOM_ID}</Typography>
              <Typography variant="headline" component="h2">
                {event && event.BOOKING_TITLE}
              </Typography>
              <Typography className={classes.pos}>Course: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}</Typography>
              <Typography component="p">
                {event && moment(event.START_TIME).format('MMMM Do YYYY')} <br />
                {event && moment(event.START_TIME).format('h:mm a')} - 
                {event && moment(event.END_TIME).format('h:mm a')}
              </Typography>
              <Typography component="p">
                {event && event.DETAILS}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </ Dialog>
  );
  }
  
}

export default withStyles(styles)(EventView);