import React from 'react';
import { withStyles } from 'material-ui/styles';
import { NavLink } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { Typography, Hidden } from 'material-ui';
import compose from 'recompose/compose';
import withWidth from 'material-ui/utils/withWidth';

const styles = theme => ({
    container: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontFamily: 'Open Sans'
    },
    logcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 350,
        position: 'fixed',
        fontFamily: 'Open Sans'
    },
    loginfo: {
        marginBottom: '.5em',
        height: 30,
        width: 300,
        fontFamily: 'Open Sans',
        padding: '0',
        border: '1px solid #767676',
        borderRadius: '2px',
        paddingLeft: '.2em',
        background: 'white',
        fontFamily: 'Open Sans'
    },
    title: {
        color: 'white',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '60px',
        marginBottom: '0',
        letterSpacing: '5px',
        fontFamily: 'Open Sans'
    },
    smallerTitle: {
        color: 'white',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '30px',
        marginBottom: '0',
        letterSpacing: '5px',
        fontFamily: 'Open Sans'
    },
    subTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '18px',
        fontWeight: 'normal',
        marginTop: '0',
        fontFamily: 'Open Sans'
    },
    smallerSubTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 'normal',
        marginTop: '0',
        fontFamily: 'Open Sans'
    },
    LoginButton: {
        marginBottom: '.5em',
        background: 'rgba(0, 0, 0, .7)',
        border: 'none',
        borderRadius: '2px',
        color: 'white',
        height: 30,
        width: 305,
        fontFamily: 'Open Sans'
    },
    regbutton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '14px',
        fontFamily: 'Open Sans'
    }
});

class LoginForm extends React.Component {

    state = {
        valid: true
    };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
      this.props.onSave(this.state);
  };

  handleValidate = () => {
      this.setState({
          valid: false
      })
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.container}>
        <div className={classes.logcontainer}>
        <Hidden only='xs'>
                <Typography className={classes.title}>SCHEDULERx</Typography>
                <Typography className={classes.subTitle}>A Scheduling app for ULM nursing</Typography>
        </Hidden>
        <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <div>
                <Typography className={classes.smallerTitle}>SCHEDULERx</Typography>
                <Typography className={classes.smallerSubTitle}>A Scheduling app for ULM nursing</Typography>
            </div>
        </Hidden>
            <form>
                    <p
                        hidden={this.props.validLogin ? true : false}
                    >
                        *Username or password is incorrect
                    </p>
                    <div>
                        <TextField  placeholder={this.state.USER_ID || this.state.valid ? "CAMPUS WIDE ID" : "*REQUIRED"}
                                style={this.state.USER_ID || this.state.valid ? {} : {border: "1px solid red"}}
                                className={classes.loginfo}
                                name="USER_ID"
                                onChange={this.handleChange}
                                InputProps={{disableUnderline: 'true', }}
                                inputProps={{maxLength: 8}}
                                required
                                />
                    </div>
                    
                    <div>
                        <TextField placeholder={this.state.USER_PASSWORD || this.state.valid ? "PASSWORD" : "*REQUIRED"}
                                style={this.state.USER_PASSWORD || this.state.valid? {} : {border: "1px solid red"}}
                                className={classes.loginfo}
                                name="USER_PASSWORD"
                                type="password"
                                onChange={this.handleChange}
                                InputProps={{disableUnderline: 'true'}}
                                inputProps={{maxLength: 20}}
                                required
                                />
                    </div>
                    
                <button 
                    type="button" 
                    className={classes.LoginButton} 
                    onClick={this.state.USER_ID && this.state.USER_PASSWORD ? this.handleSave : this.handleValidate}
                >login</button>
                <div className={classes.regbutton}>
                    <NavLink
                        style={{color: 'white', fontSize: '14px', marginLeft: '4px'}}
                        to="/register">
                        Never been here before? Register
                    </NavLink>
                </div>
            </form>

    </div>
    </div>
    );
  }
}

export default compose(withStyles(styles), withWidth())(LoginForm);
