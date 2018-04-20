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
        open: false,
        messages: null
    }
    componentDidMount() {
        this.props.getMessages(this.props.user);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({messages: nextProps.messages})
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

    delete = (message) => {
        client.post('Message/Delete.php', {
            MSG_ID: message.MSG_ID
        })

        let tempList = this.state.messages;
        const tempIndex = tempList.indexOf(message);
        tempList.splice(tempIndex, 1);
        
        this.setState({messages: tempList, open: false})
    }

    render(){
        return(
            <div style={{paddingTop: 40}}>
                <MessageTable  messages={this.state.messages} openMessage={this.openMessageDialog}/>
                <MessageView open={this.state.open} 
                    message={this.state.message} 
                    onClose={this.closeMessage}
                    deleteMessage={this.delete}
                />
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);