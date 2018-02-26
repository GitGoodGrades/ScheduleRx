import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class CourseForm extends React.Component {
  state = {
    COURSE_ID: '',
    STUDENTS: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSave = () => {
      this.props.onSave(this.state.COURSE_ID, this.state.STUDENTS);
  }

  render() {
    const { classes } = this.props;

    return (
        <Paper>
            <form className={classes.container}>
                <TextField
                id="COURSE_ID"
                label="Course Id"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('COURSE_ID')}
                margin="normal"
                required="true"
                ></TextField>
                <TextField
                id="STUDENTS"
                label="Class Size"
                value={this.state.age}
                onChange={this.handleChange('STUDENTS')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                required="true"
                />
            </form>
            <Button variant="raised" onClick={this.handleSave} >
                Save
            </Button>
        </ Paper>
    );
  }
}

export default withStyles(styles)(CourseForm);
