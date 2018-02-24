import React, { Component } from 'react';
import axios from 'axios';
import NewUserForm from './NewUserForm';

export default class RegisterForm extends Component {
    handleSave(userID, userPass, email, role) {

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Users/Create.php`, {
            USER_ID: userID,
            USER_PASSWORD: userPass,
            EMAIL: email,
            ROLE: role
        })
            .then(function (response) {
                console.log(response);
                console.log(userID, userPass, email, role, "was submitted");
                alert("User Account Created. Proceed to Login");
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render(){
        return(
            <div>
                <NewUserForm onSave={this.handleSave}/>
            </div>

        );
    };
}