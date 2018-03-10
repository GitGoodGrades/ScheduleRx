import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import theme from '../../../../MaterialUI/theme/index';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 230,
  },
  menu: {
    width: 230,
  },
});


class ScheduleForm extends React.Component {
  state = {
    SCHEDULE_ID: '',
    START_REG_DATE: '',
    END_REG_DATE: '',
    START_SEM_DATE: '',
    END_SEM_DATE: '',
    IS_RELEASED: "0",
    IS_ARCHIVED: "0"
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSave = () => {
      this.props.onSave(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
        <Paper>
          <h1 style={{color: 'rgb(111, 0, 41)', paddingTop: 10, textAlign: 'center'}}>Create New Schedule</h1>
            <form className={classes.container}>
                <TextField
                    id="SCHEDULE_ID"
                    label="Semester"
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin="normal"
                    required={true}
                />
                <TextField
                    id="START_REG_DATE"
                    label="Event Registration Begin Date"
                    onChange={this.handleChange}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    required={true}
                />
                <TextField
                    id="END_REG_DATE"
                    label="Event Registration End Date"
                    onChange={this.handleChange}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    required={true}
                />
                <TextField
                    id="START_SEM_DATE"
                    label="Semester Begin Date"
                    onChange={this.handleChange}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    required={true}
                />
                <TextField
                    id="END_SEM_DATE"
                    label="Semester End Date"
                    onChange={this.handleChange}
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    required={true}
                />
            </form>
            <div style={{border: '', textAlign: 'right', paddingRight: 5, paddingBottom: 5}}>
            <Button variant="raised" onClick={this.handleSave} >
                Save
            </Button>
          </div>
        </Paper>
    );
  }
}

export default withStyles(styles)(ScheduleForm);
