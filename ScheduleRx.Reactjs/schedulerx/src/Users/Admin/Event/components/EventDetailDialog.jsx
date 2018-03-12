import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import axios from 'axios';
import { styles } from '../EventStyles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class EventDetailDialog extends Component {
  state = {
    title: '',
    details: '',

  }

  cancel = () => {
    this.props.onCancel();
  }

  handleBlur = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSave = () => {
    this.props.onSave(this.state.title, this.state.details);
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
      >
        <DialogTitle>Create Event</DialogTitle>
        <DialogContent>
          <div>
          <TextField
            id="title"
            onBlur={this.handleBlur}
          >
          </TextField>
        </div>
        <div>
          <TextField
            id="details"
            multiline='true'
            onBlur={this.handleBlur}
          >
          </TextField>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.cancel}>
            Cancel
          </Button>
          <Button
            onClick={this.handleSave}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default EventDetailDialog;
