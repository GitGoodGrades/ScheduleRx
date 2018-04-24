import React, { Component } from 'react';
import FacultyTable from './components/FacultyTable';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import { Snackbar } from 'material-ui';
import Grow from 'material-ui/transitions/Grow';

const mapStateToProps = (state) => ({
    users: state.userList,
    user: state.userName,
  });

const mapDispatchToProps = (dispatch) => ({
    loadUsers: () => dispatch(action.searchUsers()),
});


class Roles extends Component {
    state = {
        snackbarOpen: false
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    snackbarClose = () => {
        this.setState({
            snackbarOpen: false
        })
    }

    render(){
        return(
            <div style={{paddingTop: 40}}>
                <FacultyTable openSnackbar={()=> this.setState({snackbarOpen: true})}  users={this.props.users} user={this.props.user}/>
                <Snackbar onClose={this.snackbarClose} 
                        open={this.state.snackbarOpen}
                        autoHideDuration={2000}
                        
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        message={<span>Course Leader</span>}
                        >
                </Snackbar>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
