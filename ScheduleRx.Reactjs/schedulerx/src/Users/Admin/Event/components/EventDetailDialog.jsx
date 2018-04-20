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
import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Repeat from "material-ui-icons/Repeat";
import DoneAll from 'material-ui-icons/DoneAll';
import Done from "material-ui-icons/Done";
import Clear from "material-ui-icons/Clear";
import Tooltip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';

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
    invalid: {
      fontFamily: 'Open Sans',
      minWidth: 200,
      border: '1px solid red',
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
    repeat: false,
    valid: true
  };

  cancel = () => {
    this.props.onCancel();
  };

  handleBlur = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleRepeat = (event) => {
    this.setState({repeat: event.target.checked});
  }

  validate = () => {
    this.setState({valid: true})
  }

  handleSave = () => {
    if(this.state.title && this.state.title !== ''){
      this.props.onSave(this.state.title, this.state.details, this.state.repeat);
    }else{
      this.setState({valid: false})
    }
  };

  render() {
      const {classes} = this.props;
    return (
      <Dialog
        className={classes.container}
        open={this.props.open}
      >
        <DialogContent className={classes.content}>
          
              <Typography style={{fontWeight: 'bold', fontSize: '16px'}} align="center">EVENT DETAILS</Typography>
          <div>
          <InputLabel>Event Title:</InputLabel>
          <Input
            className={this.state.valid ? classes.field : classes.invalid}
            id="title"
            style={{border: '1px solid rgb(204,204,204)', borderRadius: '4px', width: '96%', paddingLeft: '2%', paddingRight: '2%'}}
            onBlur={this.handleBlur}
            onChange={this.validate}
            disableUnderline
            placeholder={this.state.valid ? "" : "*REQUIRED"}
            inputProps={{maxLength: 50, style:{fontSize: '12px'}}}
          />
        </div>
        <div>
          <InputLabel>Event Details:</InputLabel>
          <TextField
            InputProps={{disableUnderline: true, inputProps:   {maxLength: 205, style:{fontSize: '12px'}}}}
            style={{border: '1px solid rgb(204,204,204)', borderRadius: '4px', width: '96%', paddingLeft: '2%', paddingRight: '2%'}}            className={classes.field}
            multiline
            id="details"
            onBlur={this.handleBlur}
          />
        </div>
        <div style={{float: 'right', marginTop: 10}}>
        <Tooltip title="Repeat Weekly" position="bottom">
            <Checkbox
              icon={<Repeat />}
              checkedIcon={<DoneAll/>}
              id="repeat"
              onClick={this.handleRepeat}
            />
          </Tooltip>
          <Button
              variant="raised"
              color="primary"
              className={classes.btn}
              onClick={this.cancel}>
            Cancel
            <Clear/>
          </Button>
          <Button
              variant="raised"
              color="primary"
              className={classes.btn}
              onClick={this.handleSave}
              style={{marginLeft: 5}}
          >
            Submit
            <Done/>
          </Button>
          </div>
          </DialogContent>
      </Dialog>
    )
  }
}
export default withStyles(styles)(EventDetailDialog);
