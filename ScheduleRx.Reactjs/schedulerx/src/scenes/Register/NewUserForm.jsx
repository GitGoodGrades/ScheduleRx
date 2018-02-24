import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select/';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = theme => {
    return {
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,
            margin: "normal",
        },
        menu: {
            width: 200,
        },
    };
};


class NewUserForm extends React.Component {
    state = {
        USER_ID: '',
        USER_PASSWORD: '',
        EMAIL: '',
        ROLE: '',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSave = () => {
        this.props.onSave(this.state.USER_ID, this.state.USER_PASSWORD, this.state.EMAIL, this.state.ROLE);
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper>
                <form className={classes.container}>
                    <TextField
                        id="USER_ID"
                        label="User Id"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('USER_ID')}
                        margin="normal"
                        required="true"
                    />
                    <TextField
                        id="USER_PASSWORD"
                        label="User Password"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('USER_PASSWORD')}
                        type={"password"}
                        margin="normal"
                        required="true"
                    />
                    <TextField
                        id="EMAIL"
                        label="email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('EMAIL')}
                        margin="normal"
                        required="true"
                    />
                    <div>
                        <Select
                            native
                            id="ROLE"
                            value={this.state.ROLE}
                            onChange={this.handleChange('ROLE')}
                            underlineStyle={{display: 'none'}}
                            required={true}
                            autoWidth={true}
                            className={classes.textField}
                        >
                            <option value={""}>NONE</option>
                            <option value={"Student"}>Student</option>
                            <option value={"Instructor"}>Instructor</option>
                            <option value={"Schedule Admin"}>Schedule Admin</option>
                            <option value={"System Admin"}>System Admin</option>
                        </Select>
                    </div>
                </form>
                <Button variant="raised" onClick={this.handleSave} >
                    Register
                </Button>
            </ Paper>
        );
    }
}

export default withStyles(styles)(NewUserForm);