import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {Button} from 'material-ui';
import axios from 'axios';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class RegisterForm extends React.Component {
  state = { first: false}
    //get Steven to return null 
    componentDidMount(){
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Users/Index.php`)
          .then(res => {
              this.setState({first: res.data.message === "No userss found." ? true : false}) 
          })
    }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSave = () => {
      this.props.submit(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="EMAIL">Email</InputLabel>
          <Input id="EMAIL" onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="USER_ID">CWID</InputLabel>
          <Input id="USER_ID" onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="SEMESTER_ID">semester</InputLabel>
          <Input id="SEMESTER_ID" onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="USER_PASSWORD">Password</InputLabel>
          <Input id="USER_PASSWORD" type={"password"} onChange={this.handleChange} />
        </FormControl>
        
        <Button onClick={this.handleSave}>Save</Button>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterForm);