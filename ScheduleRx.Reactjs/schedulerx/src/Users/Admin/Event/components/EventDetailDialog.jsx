import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import axios from 'axios';
//import { styles } from '../EventStyles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


const styles = theme => ({

    title: {
        fontFamily: 'Open Sans',
        fontSize: 20,
    },
    field: {
        fontFamily: 'Open Sans',
        minWidth: 200,
        border: '1px solid #7d7d7d',
        borderRadius: 2,
        marginTop: 5,
    },
    btn: {
        fontFamily: 'Open Sans'
    },
    textdiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'middle',
        width: 300,
    }
});

class EventDetailDialog extends Component {
  state = {
    title: '',
    details: '',

  };

  cancel = () => {
    this.props.onCancel();
  };

  handleBlur = (event) => {
    this.props.onChange(event.target.id, event.target.value);
  };

  handleSave = () => {
    this.props.onSave(this.state.title, this.state.details);
  };

  render() {
      const {classes} = this.props;
    return (
      <Dialog
        className={classes.container}
        open={this.props.open}
      >
        <DialogContent className={classes.content}>
          <div className={classes.textdiv}>
              <h1 className={classes.title}>EVENT DETAILS</h1>
        <div>
          <input
            className={classes.field}
            id="title"
            onBlur={this.handleBlur}
            placeholder="EVENT TITLE"
          >
      </input>
        </div>
        <div>
          <textarea
            className={classes.field}
            id="details"
            onBlur={this.handleBlur}
          >
      </textarea>
  </div>
        </div>
        </DialogContent>
        <DialogActions>
          <Button
              className={classes.btn}
              onClick={this.cancel}>
            Cancel
          </Button>
          <Button
              className={classes.btn}
              onClick={this.handleSave}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default withStyles(styles)(EventDetailDialog);
