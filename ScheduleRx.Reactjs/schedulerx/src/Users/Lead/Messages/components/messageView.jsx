import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import Dialog, {   
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,} from 'material-ui/Dialog';

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

  handleDelete = () => {
    this.props.deleteMessage(this.state.message)
  }
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
      <DialogTitle id="alert-dialog-title">Message From the Admin</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.message && this.state.message.MESSAGE}
            </DialogContentText>
          </DialogContent>
      <DialogActions>
      <Tooltip title="Delete">
              <IconButton variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.handleDelete}>
                <Icon>delete_forever_icon</Icon>
              </IconButton>
            </Tooltip>
      </DialogActions>
      </ Dialog>
  );
  }
  
}

export default withStyles(styles)(MessageView);