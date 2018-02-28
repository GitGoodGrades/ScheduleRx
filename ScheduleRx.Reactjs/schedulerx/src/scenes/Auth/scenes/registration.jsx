import React, { Component } from 'react';
import axios from 'axios';
import RegisterForm from '../components/register';


class Registration extends Component {
        
    handleSave(userInfo) {
        let ROLE_ID = '';
        if(userInfo.EMAIL && userInfo.EMAIL.toLowerCase().endsWith("@warhawks.ulm.edu")){
            ROLE_ID = 3;
        }else if(userInfo.EMAIL.toLowerCase().endsWith("@ulm.edu")){
            userInfo.first ? ROLE_ID = 1 : ROLE_ID = 2;
        }

        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Users/Create.php`, {
            USER_ID: userInfo.USER_ID,
            ROLE_ID: ROLE_ID,
            EMAIL: userInfo.EMAIL,
            USER_PASSWORD: userInfo.USER_PASSWORD,
            SEMESTER_ID: userInfo.SEMESTER_ID
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        return(
            <div>
                <RegisterForm submit={this.handleSave}/>
            </div>
        );
    };
}
export default Registration;