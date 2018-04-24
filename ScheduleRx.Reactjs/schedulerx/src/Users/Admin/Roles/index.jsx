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

    open = () => {
        this.setState({snackbarOpen: true})
        setTimeout(this.snackbarClose, 900)
    }

    render(){
        return(
            <div style={{paddingTop: 40}}>
                <FacultyTable openSnackbar={this.open}  users={this.props.users} user={this.props.user}/>
                <Snackbar  
                        open={this.state.snackbarOpen}
                        
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        transition={Grow}
                        message={<span>Faculty Role Has Been Saved!</span>}
                        >
                </Snackbar>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
