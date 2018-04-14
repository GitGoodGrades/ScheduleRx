import React, { Component } from 'react';
import FacultyTable from './components/FacultyTable';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';

const mapStateToProps = (state) => ({
    users: state.userList,
    user: state.userName
  });

const mapDispatchToProps = (dispatch) => ({
    loadUsers: () => dispatch(action.searchUsers()),
});

class Roles extends Component {
    componentDidMount() {
        this.props.loadUsers();
    }

    render(){
        return(
            <div style={{paddingTop: 35}}>
                <FacultyTable  users={this.props.users} user={this.props.user}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
