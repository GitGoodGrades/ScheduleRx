import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import moment from 'moment';
import axios from 'axios';
import Send from 'material-ui-icons/Send';
import Clear from 'material-ui-icons/Clear';
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

class ConflictDialog extends Component {
  state = {
    message: '',
  };

  conflictCancel = () => {
    this.props.onConflictCancel();
  };

  handleBlur = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleConflictSave = () => {
    this.props.onConflictSave(this.state.message);
  };


  render() {
      const {classes} = this.props;
    return (
      <Dialog
        className={classes.container}
        open={this.props.open}
      >
        <DialogContent className={classes.content}>
          
              <Typography align="center" style={{fontWeight: 'bold', fontSize: '16px'}} className={classes.title}>UH OH!</Typography>
              <Typography>{this.props.conflictRequestString}</Typography>
        
          <TextField
            className={classes.field}
            id="message"
            multiline
            onBlur={this.handleBlur}
            
            style={{border: '1px solid rgb(204,204,204)', borderRadius: '4px', width: '96%', paddingLeft: '2%', paddingRight: '2%'}}
            inputProps={{maxLength: 250}}
            InputProps={{disableUnderline: true, inputProps: {style:{fontSize: '12px'}}}}
          />
        
        
        <div style={{float: 'right', marginTop: 10}}>
          <Button
              variant="raised"
              color="primary"
              className={classes.btn}
              onClick={this.conflictCancel}>
            Cancel Request 
            <Clear/>
          </Button>
          <Button
              variant="raised"
              color="primary"
              style={{marginLeft: 5}}
              className={classes.btn}
              onClick={this.handleConflictSave}
          >
            Submit Request 
            <Send/>
          </Button>
        </div>
        </DialogContent>
      </Dialog>
    )
  }
}
export default withStyles(styles)(ConflictDialog);