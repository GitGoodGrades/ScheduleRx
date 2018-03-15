import React from 'react';
import { withStyles } from 'material-ui/styles';
import { NavLink } from 'react-router-dom';

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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = () => {
      this.props.onSave(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.container}>
        <div className={classes.logcontainer}>
            <div className={classes.title}><h1 className={classes.title}>SCHEDULERx</h1></div>
            <h2 className={classes.subTitle}>A Scheduling app for ULM nursing</h2>
            <form>

                    <div>
                        <input placeholder={"CAMPUS WIDE ID"}
                               className={classes.loginfo}
                               name="USER_ID"
                               onChange={this.handleChange}
                               />
                    </div>
                    <div>
                        <input placeholder="PASSWORD"
                               className={classes.loginfo}
                               name="USER_PASSWORD"
                               type="password"
                               onChange={this.handleChange}
                               />
                    </div>
                 <button type="button" className={classes.LoginButton} onClick={this.handleSave}>login</button>
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
