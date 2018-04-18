import React, { Component } from 'react';
import MessageTable from './components/messageTable';
import MessageView from './components/messageView';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';

const mapStateToProps = (state) => ({
    messages: state.messages,
    user: state.userName,
  });

const mapDispatchToProps = (dispatch) => ({
    getMessages: (user) => dispatch(action.searchMessages(user)),
});

class Messages extends Component {
    state = {
        message: null,
        open: false
    }
    componentDidMount() {
        this.props.getMessages(this.props.user);
    }

    openMessageDialog = (id) => {
        this.props.messages && this.props.messages.map(msg => {
            if(msg.MSG_ID === id){
                this.setState({
                    message: msg, 
                    open: true
                })
            }
        })
    }

    closeMessage = () => {
        this.setState({
            open: false
        })
    }

    render(){
        return(
            <div style={{paddingTop: 40}}>
                <MessageTable  messages={this.props.messages} openMessage={this.openMessageDialog}/>
                <MessageView open={this.state.open} 
                              message={this.state.message} 
                              onClose={this.closeMessage}
                />
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);