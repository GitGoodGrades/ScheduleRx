import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import moment from 'moment';

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

function EventView(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>{props.event && props.event.ROOM_ID}</Typography>
          <Typography variant="headline" component="h2">
            {props.event && props.event.BOOKING_TITLE}
          </Typography>
          <Typography className={classes.pos}>{props.event && props.event.COURSE_ID}</Typography>
          <Typography component="p">
            {props.event && moment(props.event.START_TIME).format('MMMM Do YYYY')} <br />
            {props.event && moment(props.event.START_TIME).format('h:mm a')} - 
            {props.event && moment(props.event.END_TIME).format('h:mm a')}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default withStyles(styles)(EventView);