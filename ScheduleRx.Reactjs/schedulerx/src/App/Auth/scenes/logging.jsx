import React from 'react';
import { connect } from 'react-redux';
import {client} from '../../../configuration/client';
import * as action from '../../../Redux/actions/actionCreator';
import LoginForm from '../components/login';
import { Redirect } from 'react-router-dom';
import styles from '../../Shell/ShellStyles';
import { Admin, Lead, Faculty, Student } from '../../../configuration/variables';

const mapDispatchToProps = (dispatch) => ({
    sendUser: (USER_ID, USER_ROLE, SEMESTER_ID) => dispatch(action.setUser(
        USER_ID,
        USER_ROLE,
        SEMESTER_ID
    )),
    getMyCourses: (user) => dispatch(action.searchLeadCourses(user)),
    loadAdminCalendar: () => dispatch(action.adminCalendar())
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
        let USER = '';
        let ROLE = '';
        let SEMESTER = '';
        client.post(`Users/Detail.php`, {
            USER_ID: userInfo.USER_ID,

        })
            .then(res => {
                if(userInfo.USER_PASSWORD === res.data.USER_PASSWORD){
                    USER = res.data.USER_ID;
                    ROLE= res.data.ROLE_ID;
                    SEMESTER = res.data.SEMESTER_ID;
                }
                this.props && this.props.sendUser(USER, ROLE, SEMESTER);

                this.saveSession(USER, ROLE, SEMESTER);
            });


        if(USER_ID === Admin || Lead){
            this.props.getMyCourses();
            this.props.loadAdminCalendar();
        }
    };

    render(){
        const savedUser = sessionStorage.getItem('myID');
        const savedRole = sessionStorage.getItem('myRole');
        const savedSem = sessionStorage.getItem('mySem');

        if (savedUser) {
            this.props.sendUser(savedUser, savedRole, savedSem);
            return <Redirect to="/"/>;
        }
        return(
            <div style={{height: '100%'}}>
                <LoginForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default connect(null, mapDispatchToProps)(Logging);
