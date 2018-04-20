import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { DateRange } from 'react-date-range';
import  { Dialog, DialogActions, DialogContent, } from 'material-ui';
    import { FormControlLabel } from 'material-ui/Form';
import moment from 'moment';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Checkbox from 'material-ui/Checkbox';
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import Typography from "material-ui/Typography";

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


class ScheduleEditForm extends React.Component {
  state = {
    SCHEDULE_ID: '',
    START_REG_DATE: null,
    END_REG_DATE: null,
    START_SEM_DATE: null,
    END_SEM_DATE: null,
    IS_RELEASED: "0",
    IS_ARCHIVED: "0",
    reg_open: false,
    sem_open: false
  };

  componentWillReceiveProps = (nextProps) => {
      this.setState({
          ...nextProps.schedule
      })
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleCheck = (event) => {
      this.setState({IS_RELEASED:  event.target.checked ? "1" :"0"})
  }

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
        this.props.onSave(this.state);
        
  };

  handleDelete = () => {
      this.props.deleteSchedule(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
        <Dialog
            className={classes.container}
            open={this.props.open}
        >
         <DialogContent className={classes.content}>
          <Typography component="p" style={{color: 'primary', fontSize: 20, paddingTop: 10, paddingBottom: 10, textAlign: 'center'}}>Edit {this.state.SCHEDULE_ID}</Typography>
          
            <div style={{textAlign: 'center', marginTop: 10}}> 
                Registration Period:
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
                <div style={{textAlign: 'center', fontSize: '15'}} >
                Semester Period:
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
            <FormControlLabel
                style={{paddingLeft: 20}}
                control={
                    <Checkbox
                        icon={<VisibilityOff />}
                        checkedIcon={<Visibility />}
                        onChange={this.handleCheck}
                        checked={this.state.IS_RELEASED == 1}
                    />
                    }
                    label=" Schedule visibility" />
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

export default withStyles(styles)(ScheduleEditForm);
