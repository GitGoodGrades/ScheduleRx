import React from 'react';
import { withStyles } from 'material-ui/styles';
import { div } from 'material-ui/Form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import TextField from 'material-ui/TextField';

const styles = theme => ({
    container: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontFamily: 'Open Sans'
    },
    regcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 350,
        height: 400,
        position: 'fixed',
        fontFamily: 'Open Sans'
    },
    reginput: {
        marginBottom: '.5em',
        textTransform: 'uppercase',
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
    subTitle: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: '18px',
        fontWeight: 'normal',
        marginTop: '0',
        fontFamily: 'Open Sans'
    },
    regbtn: {
        marginBottom: '.5em',
        background: 'rgba(0, 0, 0, .6)',
        border: 'none',
        borderRadius: '2px',
        color: 'white',
        height: 30,
        width: 305,
        fontFamily: 'Open Sans'
    },
});

class RegisterForm extends React.Component {
  state = { 
      first: false,
      valid: true,
      validEmail: true,
      validID: true,
      emailMessage: "",
      cwidMessage: "",
      
    }
    //get Steven to return null

    checkEmail = () => {
        if(this.state.EMAIL && (this.state.EMAIL.toLowerCase().endsWith("@warhawks.ulm.edu") || this.state.EMAIL.toLowerCase().endsWith("@ulm.edu"))){
            this.setState({
                validEmail: true,
                emailMessage: ""
            })
        }
        else {
            this.setState({
                validEmail: false,
                emailMessage: "You must enter a valid ULM email address.\n"
            })
        }
    }

    checkID = () => {
        if(isNaN(this.state.USER_ID) || this.state.USER_ID === null) {
            this.setState({
                validID: false,
                cwidMessage: "You must enter a valid Campus Wide ID.\n"
            })
        }
        else {
            this.setState({
                validID: true,
                cwidMessage: ""
            })
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Users/Index.php`)
          .then(res => {
              this.setState({first: res.data.message === "No users found." ? true : false})
          })
    }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSave = () => {
      this.props.submit(this.state);
  }

  handleValidate = () => {
      if(!this.state.EMAIL) {
          this.setState({
              emailMessage: ""
          })
      }
      if(!this.state.USER_ID) {
        this.setState({
            cwidMessage: ""
        })
    }
    this.setState({
        valid: false,
    })
  }


  render() {
    const { classes } = this.props;

    return (
        <div className={classes.container}>
            <div className={classes.regcontainer}>
                <div className={classes.title}><h1 className={classes.title}>SCHEDULERx</h1></div>
                <h2 className={classes.subTitle}>A Scheduling app for ULM nursing</h2>
                    <form>
                    <div>
                        <p hidden={this.state.validEmail && this.state.validID ? true : false}
                            style={{textTransform: 'none'}}>{this.state.emailMessage} <br/> {this.state.cwidMessage}</p>
                        <TextField
                            placeholder={this.state.EMAIL || this.state.valid ? "EMAIL" : "*REQUIRED"}
                            style={this.state.EMAIL || this.state.valid? {} : {border: "1px solid red"}}
                            id="EMAIL"
                            onChange={this.handleChange}
                            className={classes.reginput}
                            InputProps={{disableUnderline: 'true'}}
                            inputProps={{maxLength: 40}}
                            onBlur={this.checkEmail}
                            />
                    </div>
                    <div>
                        <TextField
                            placeholder={this.state.USER_ID || this.state.valid ? "CAMPUS WIDE ID" : "*REQUIRED"}
                            style={this.state.USER_ID || this.state.valid ? {} : {border: "1px solid red"}}
                            id="USER_ID"
                            onChange={this.handleChange}
                            className={classes.reginput}
                            InputProps={{disableUnderline: 'true', textTransform: 'uppercase'}}
                            inputProps={{maxLength: 8}}
                            onBlur={this.checkID}
                            />
                    </div>
                    <div>
                        <TextField
                            placeholder={this.state.USER_PASSWORD || this.state.valid? "PASSWORD" : "*REQUIRED"}
                            style={this.state.USER_PASSWORD || this.state.valid ? {} : {border: "1px solid red"}}
                            id="USER_PASSWORD"
                            type={"password"}
                            onChange={this.handleChange}
                            className={classes.reginput}
                            InputProps={{disableUnderline: 'true'}}
                            inputProps={{maxLength: 20}}
                            />
                    </div>
                    <button
                        type="button"
                        className={classes.regbtn}
                        onClick={
                            this.state.validEmail && 
                            this.state.validID && 
                            this.state.USER_PASSWORD ? this.handleSave : this.handleValidate}>Register</button>
                </form>
                <NavLink
                    style={{color: 'white', fontSize: '14px', marginLeft: '4px'}}
                    to="/">
                    Already Registered? Login
                </NavLink>
            </div>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterForm);
