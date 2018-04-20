import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { DateRange } from 'react-date-range';
import { Dialog, DialogActions, DialogContent, Typography, } from 'material-ui';
import moment from 'moment';
import {InputLabel} from 'material-ui/Input';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 230,
    justifyContent: 'center',
    alignItems: 'middle',
  },
  menu: {
    width: 230,
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'middle',
    width: 300,
  }
});


class ScheduleForm extends React.Component {
  state = {
    SCHEDULE_ID: null,
    START_REG_DATE: null,
    END_REG_DATE: null,
    START_SEM_DATE: null,
    END_SEM_DATE: null,
    IS_RELEASED: "0",
    IS_ARCHIVED: "0",
    reg_open: false,
    sem_open: false, 
    valid: true
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  cancel = () => {
    this.props.onCancel();
  };

  handleRegSelect = date => {
      this.setState({ START_REG_DATE: moment(date.startDate).format("YYYY-MM-DD"), END_REG_DATE: moment(date.endDate).format("YYYY-MM-DD")})
  }

    setRegOpen = () => {
        this.setState({ reg_open: true })
    }

    setRegClose = () => {
        this.setState({ reg_open: false })
    }

    handleSemSelect = date => {
        this.setState({ START_SEM_DATE: moment(date.startDate).format("YYYY-MM-DD"), END_SEM_DATE: moment(date.endDate).format("YYYY-MM-DD")})
    }

    setSemOpen = () => {
        this.setState({ sem_open: true })
    }

    setSemClose = () => {
    this.setState({ sem_open: false })
    }

    handleSave = () => {
        if(this.state.SCHEDULE_ID && this.state.START_REG_DATE && this.state.START_SEM_DATE && this.state.END_REG_DATE && this.state.END_SEM_DATE){
           this.props.onSave(this.state), this.props.resubmit(this.state); 
        }else {
            this.setState({valid: false})
        }
        
        
  };

  render() {
    const { classes } = this.props;

    return (
        <Dialog
            className={classes.container}
            open={this.props.open}
        >
         <DialogContent className={classes.content}>
          <Typography component="p" style={{color: 'primary', fontSize: 20, paddingTop: 10, paddingBottom: 10, textAlign: 'center'}}>Create New Schedule</Typography>
            <div style={{width: 'auto'}}>
                <InputLabel className={classes.label}>Semester Name:</InputLabel>
                <TextField
                    id="SCHEDULE_ID"
                    InputProps={{disableUnderline: 'true'}}
                    placeholder="i.e. FALL2018"
                    
                    className={classes.textField}
                    onChange={this.handleChange}
                    required={true}
                    inputProps={{maxLength: 10, style:{paddingLeft: '10px', marginLeft: '0px'}}}
                    style={{ border: '1px solid rgb(204,204,204)', borderRadius: '4px', height: '36px', width: '98%', marginRight: 'none', marginLeft: '0px'}}
                    error={!(this.state.valid || (this.state.SCHEDULE_ID && this.state.SCHEDULE_ID != ''))}
                />
            </div>
            <div>
                <Button onClick={this.setRegOpen} style={this.state.valid || (this.state.START_REG_DATE && this.state.END_REG_DATE) ?
                    {height: 15}:{height: 15, color: 'red'}}>
                    {
                        (this.state.START_REG_DATE && this.state.END_REG_DATE) ?
                        `${moment(this.state.START_REG_DATE).format("MM/DD/YYYY")} - ${moment(this.state.END_REG_DATE).format("MM/DD/YYYY")}` :
                        "Select registration period"
                    }
                </ Button>
                <Dialog 
                    open={this.state.reg_open} 
                    onBackdropClick={this.setRegClose}    
                >
                        <DateRange
                            onChange={this.handleRegSelect}
                        />
                        <Button onClick={this.setRegClose}>
                            Save
                        </Button>
                </ Dialog>
                </div>
                <div>
                <Button onClick={this.setSemOpen} style={this.state.valid || (this.state.START_SEM_DATE && this.state.END_SEM_DATE) ?
                    {height: 15}:{height: 15, color: 'red'}}>
                    {
                        (this.state.START_SEM_DATE && this.state.END_SEM_DATE) ?
                        `${moment(this.state.START_SEM_DATE).format("MM/DD/YYYY")} - ${moment(this.state.END_SEM_DATE).format("MM/DD/YYYY")}`  :
                        "Select semester period"
                    }
                </ Button>
                    <Dialog 
                        open={this.state.sem_open}
                        onBackdropClick={this.setSemClose}    
                    >
                        <DateRange
                            onInit={this.handleSemSelect}
                            onChange={this.handleSemSelect}
                        />
                        <Button onClick={this.setSemClose}>
                            Save
                        </Button>
                    </ Dialog>
                </div>
            </DialogContent>
            <DialogContent>
            <div style={{float: 'right', marginTop: 10}}>
          <Button
                style={{marginLeft: 5}} 
                variant="raised"
                color="primary"
                onClick={this.cancel}>
            Cancel
          </Button>
          <Button
                style={{marginLeft: 5}} 
                variant="raised" 
                color="primary"
              onClick={this.handleSave}
          >
            Submit
          </Button>
          </div>
       </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ScheduleForm);
