import React from 'react';
import { withStyles } from 'material-ui/styles';
import { NavLink } from 'react-router-dom';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    container: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    logcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        height: 350,
        position: 'fixed',
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
        background: 'white'
    },
    title: {
        color: 'white',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '60px',
        marginBottom: '0',
        letterSpacing: '5px',
    },
    subTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '18px',
        fontWeight: 'normal',
        marginTop: '0',
    },
    LoginButton: {
        marginBottom: '.5em',
        background: 'rgba(0, 0, 0, .7)',
        border: 'none',
        borderRadius: '2px',
        color: 'white',
        height: 30,
        width: 305,
    },
    regbutton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontSize: '14px'
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
            <div className={classes.title}><h1 className={classes.title}>SCHEDULERx</h1></div>
            <h2 className={classes.subTitle}>A Scheduling app for ULM nursing</h2>
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
                                InputProps={{disableUnderline: 'true'}}
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

export default withStyles(styles)(LoginForm);
