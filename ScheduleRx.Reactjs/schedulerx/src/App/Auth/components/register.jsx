import React from 'react';
import { withStyles } from 'material-ui/styles';
import { div } from 'material-ui/Form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    container: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    regcontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 350,
        height: 400,
        position: 'fixed',
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
    regbtn: {
        marginBottom: '.5em',
        background: 'rgba(0, 0, 0, .6)',
        border: 'none',
        borderRadius: '2px',
        color: 'white',
        height: 30,
        width: 305,
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
            <div className={classes.regcontainer}>
                <div className={classes.title}><h1 className={classes.title}>SCHEDULERx</h1></div>
                <h2 className={classes.subTitle}>A Scheduling app for ULM nursing</h2>
                    <form>
                    <div>
                        <input
                            placeholder="email"
                            id="EMAIL"
                            onChange={this.handleChange}
                            className={classes.reginput}
                            />
                    </div>
                    <div>
                        <input
                            placeholder="campus wide id"
                            id="USER_ID"
                            onChange={this.handleChange}
                            className={classes.reginput}
                            />
                    </div>
                    <div>
                        <input
                            placeholder="nursing semester"
                            id="SEMESTER_ID"
                            onChange={this.handleChange}
                            className={classes.reginput}
                            />
                    </div>
                    <div>
                        <input
                            placeholder="password"
                            id="USER_PASSWORD"
                            type={"password"}
                            onChange={this.handleChange}
                            className={classes.reginput}
                            />
                    </div>
                    <button
                        type="button"
                        className={classes.regbtn}
                        onClick={this.handleSave}>Register</button>
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
