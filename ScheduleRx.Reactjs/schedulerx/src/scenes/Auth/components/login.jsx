import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {Button} from 'material-ui';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class LoginForm extends React.Component {

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSave = () => {
      this.props.onSave(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="USER_ID">CWID</InputLabel>
          <Input id="USER_ID" onChange={this.handleChange} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="USER_PASSWORD">Password</InputLabel>
          <Input id="USER_PASSWORD" type={"password"} onChange={this.handleChange} />
        </FormControl>

        <Button onClick={this.handleSave}>Login</Button>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);