import React from 'react';
import { connect } from 'react-redux';
import {client} from '../../../configuration/client';
import * as action from '../../../Redux/actions/actionCreator';
import LoginForm from '../components/login';
import { Redirect } from 'react-router-dom';
import styles from '../../Shell/ShellStyles';

const mapDispatchToProps = (dispatch) => ({
    sendUser: (USER_ID, USER_ROLE, SEMESTER_ID) => dispatch(action.setUser(
        USER_ID,
        USER_ROLE,
        SEMESTER_ID
    ))
});

class Logging extends React.Component {
    constructor() {
        super();
    }
    state = {
        registrationSchedule: {},
        currentSchedule: {}
    };

    saveSession = (myID, myRole, mySem) => {
        sessionStorage.setItem('myID', myID);
        sessionStorage.setItem('myRole', myRole);
        sessionStorage.setItem('mySem', mySem);
    };

    handleSave = (userInfo) => {
        let USER_ID = '';
        let ROLE_ID = '';
        let SEMESTER_ID = '';
        client.post(`Users/Detail.php`, {
            USER_ID: userInfo.USER_ID,
        })
            .then(res => {
                if(userInfo.USER_PASSWORD === res.data.USER_PASSWORD){
                    USER_ID = res.data.USER_ID;
                    ROLE_ID = res.data.ROLE_ID;
                    SEMESTER_ID = res.data.SEMESTER_ID;
                }
                this.props && this.props.sendUser(USER_ID, ROLE_ID, SEMESTER_ID);
                this.saveSession(USER_ID, ROLE_ID, SEMESTER_ID);
            });
    };

    render(){
        const savedUser = sessionStorage.getItem('myID');
        const savedRole = sessionStorage.getItem('myRole');
        const savedSem = sessionStorage.getItem('mySem');

        if (savedUser) {
            this.props.sendUser(savedUser, savedRole, savedSem);
            return <Redirect to path="/"/>;
        }
        return(
            <div>
                <LoginForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default connect(null, mapDispatchToProps)(Logging);