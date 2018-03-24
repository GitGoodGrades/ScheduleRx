import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { DateRange } from 'react-date-range';
import  {Dialog,   DialogActions,
    DialogContent, } from 'material-ui';
import moment from 'moment';

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
        this.props.onSave(this.state), this.props.resubmit(this.state);
        
  };

  render() {
    const { classes } = this.props;

    return (
        <Dialog
            className={classes.container}
            open={this.props.open}
        >
         <DialogContent className={classes.content}>
          <h2 style={{color: 'rgb(111, 0, 41)', paddingTop: 10, textAlign: 'center'}}>Create New Schedule</h2>
            <div>
                <TextField
                    id="SCHEDULE_ID"
                    label="Semester"
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin="normal"
                    required={true}
                />
            </div>
            <div>
                <Button onClick={this.setRegOpen} style={{height: 15}}>
                    {
                        (this.state.START_REG_DATE && this.state.END_REG_DATE) ?
                        `${moment(this.state.START_REG_DATE).format("MM/DD/YYYY")} - ${moment(this.state.END_REG_DATE).format("MM/DD/YYYY")}` :
                        "Select registration period"
                    }
                </ Button>
                <Dialog open={this.state.reg_open}>
                        <DateRange
                            onChange={this.handleRegSelect}
                        />
                        <Button onClick={this.setRegClose}>
                            Save
                        </Button>
                </ Dialog>
                </div>
                <div>
                <Button onClick={this.setSemOpen} style={{height: 15}}>
                    {
                        (this.state.START_SEM_DATE && this.state.END_SEM_DATE) ?
                        `${moment(this.state.START_SEM_DATE).format("MM/DD/YYYY")} - ${moment(this.state.END_SEM_DATE).format("MM/DD/YYYY")}`  :
                        "Select semester period"
                    }
                </ Button>
                    <Dialog open={this.state.sem_open}>
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
    );
  }
}

export default withStyles(styles)(ScheduleForm);
