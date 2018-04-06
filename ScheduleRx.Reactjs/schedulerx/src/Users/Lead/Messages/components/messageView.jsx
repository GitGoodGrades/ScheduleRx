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


class MessageView extends Component{
    state = {
        message: ''
    }
  handleClose = () => {
  this.props.onClose();
  };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            message: nextProps.message
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
        <div>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {this.state.message && this.state.message.MESSAGE}
              </Typography>

            </CardContent>
          </Card>
        </div>
      </ Dialog>
  );
  }
  
}

export default withStyles(styles)(MessageView);