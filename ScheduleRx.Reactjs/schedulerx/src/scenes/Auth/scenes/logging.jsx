import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as action from '../../../actions/actionCreator';
import LoginForm from '../components/login';

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
    handleSave = (userInfo) => {
        let USER_ID = '';
        let ROLE_ID = '';
        let SEMESTER_ID = '';
        axios.post(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Users/Detail.php`, {
            USER_ID: userInfo.USER_ID,
        })
          .then(res => {
            if(userInfo.USER_PASSWORD === res.data.USER_PASSWORD){
                USER_ID = res.data.USER_ID;
                ROLE_ID = res.data.ROLE_ID;
                SEMESTER_ID = res.data.SEMESTER_ID;
            }
            this.props && this.props.sendUser(USER_ID, ROLE_ID, SEMESTER_ID);
        }); 
    }

    render(){
        
        return(
            <div>
                <LoginForm onSave={this.handleSave}/>
            </div>
        );
    };
}
export default connect(null, mapDispatchToProps)(Logging);