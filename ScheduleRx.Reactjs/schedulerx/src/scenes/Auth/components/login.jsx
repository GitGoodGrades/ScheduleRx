import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import {Button} from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

const styles = theme => ({
  wrapper: {
    height: '100%',
    width: '100%',
    border: '',
    background: '',
  },
  formWrapper: {
    border: '',
  },
  container: {
    textAlign: 'center',
    border: '2px solid black',
    background: 'rgba(111, 0, 41, .9)',
    width: 400,
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 400,
    paddingTop: '100',
    color: 'white',
    borderRadius: '3px',
  },
  title: {
    fontWeight: '10',
    paddingTop: 25,
    textShadow: '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
  },
  formControl: {
    background: '',
    height: 40,
    border: '',
    marginBottom: '10px',
  },
  CWID: {
  },
  pass: {
  },
  button: {
    fontWeight: 'bold',
    marginTop: 20,
    background: 'white',
    color: 'rgb(111, 0, 41)',
    width: 200,
    border: '1px solid black',
  }
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
      <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
      <div className={classes.container}>
          <div className={classes.title}><h1 className={classes.title}>Login to ScheduleRx</h1></div>
        <div className={classes.CWID}>
        <FormControl className={classes.formControl}>
          <InputLabel style={{marginLeft: '3px', color: 'white'}}

            htmlFor="USER_ID">CWID</InputLabel>
          <Input id="USER_ID" onChange={this.handleChange} />
        </FormControl>
        </div>
        <div className={classes.pass}>
        <FormControl className={classes.formControl}>
          <InputLabel style={{marginLeft: '3px', paddingBottom: '5px', color: 'white'}} htmlFor="USER_PASSWORD">Password</InputLabel>
          <Input id="USER_PASSWORD" type={"password"} onChange={this.handleChange} />
        </FormControl>
        </div>
          <Button className= {classes.button} onClick={this.handleSave}>Login</Button>
      </div>
    </div>
    </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
