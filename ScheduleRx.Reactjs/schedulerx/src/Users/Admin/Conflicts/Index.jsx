import React, { Component } from 'react';
import ConflictTable from './components/ConflictTable';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import history from '../../../App/History';
import ConflictView from './components/ConflictView';
import { withRouter } from 'react-router-dom';
import ApproveDialog from './components/ApproveDialog';

const mapStateToProps = (state) => ({
    conflicts: state.conflicts,
    leadsCourses: state.leadsCourses
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.getConflictList()),
    getLeads: () => dispatch(action.searchLeadsCourses()),
    setGlobals: (event) => dispatch(action.setEditGlobals(event))
});

class Conflicts extends Component {
    state = {
        conflictId: null,
        dialogOpen: false,
        conflict: {},
        denyDialogOpen: false,
        eventDetailsString: "",
        denyMessage: "",
        user: null,
        approveOpen: false,
        conflicts: null
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            schedules: nextProps.schedules,
            conflicts: nextProps.conflicts
        })
    };

    componentDidMount() {
        this.props.onLoad();
        this.props.getLeads();

    };

    openDialog = (id, open) => {
        client.post(`Conflict/detail.php`, {
            CONFLICT_ID: id
        }).then(res => {
            this.setState({
                dialogOpen: open,
                conflict: res.data
            })
        })
    };

    closeConflict = () => {
        this.setState({
            dialogOpen: false
        })
    };

    cancel = () => {
        this.setState({
          dialogOpen: false
        })
      };

    handleEdit = () => {
        let events = this.state.conflict.EVENTS;
        let selectEvent = null;
        events && events.map(event => {
            if(event.SCHEDULE_ID == null)
            {
                selectEvent = event;
            }
        });

        this.props.setGlobals(selectEvent);
        this.props.history.push('/event/create');
    };

    handleApprove = () => {
        this.setState({
            approveOpen: true,
            dialogOpen: false
        })
    };

    handleApproveClose = (Approval) => {
        client.post(`Bookings/ApproveDelete.php`, {
            ...Approval
        })
            .then(res => {
                this.setState({
                    conflicts:res.data.records,
                    approveOpen: false,
                    dialogOpen: false
                });
            });
    };

    handleDeny = () => {
        let events = this.state.conflict.EVENTS;
        let course = null;
        let userId = null;
        let str = "";
        events && events.map(event => {
            if(event.SCHEDULE_ID == null)
            {
                str = "The event \"" + event.BOOKING_TITLE;
                str += "\" in room " + event.ROOM_ID;
                str += " from " + event.START_TIME;
                str += " to " + event.END_TIME + " will be deleted."
                str += "\nTo send reschedule suggestions to the event creator, fill out the field below.";
                let sections = event.SECTIONS.records;
                course = sections && sections[0].COURSE_ID;
            }
        });

        this.props.leadsCourses && this.props.leadsCourses.map(lead => {
            if(lead.COURSE_ID === course){
                userId = lead.USER_ID;
            }
        });
        this.setState({
            dialogOpen: false,
            denyDialogOpen: true,
            user: userId,
            eventDetailsString: str
        })
    };

    saveMessage = (id, value) => {
        this.setState({
            [id]: value
        })
    };

    handleDenySend = (conflictID) => {
        let tempConflicts = this.state.conflicts;
        let index = null;
        tempConflicts && tempConflicts.map(conflict => {
            if(conflict.CONFLICT_ID === conflictID) {
                index = tempConflicts.IndexOf(conflict);
            }
        });
        tempConflicts.splice(index, 1);
        client.post('Message/Create.php', {
            MESSAGE: this.state.denyMessage,
            USER_ID: this.state.user
        });
        this.setState({
            denyDialogOpen: false,
            conflicts: tempConflicts
        })
    };

    handleSelectDenyCancel = () => {
        this.setState({
            denyDialogOpen: false
        })
    };

    handleExit = () => {
        this.setState({
            dialogOpen: false
        })
    };

    approveConfirmClose = () => {
        this.setState({
            approveOpen: false,
            dialogOpen: true
        })
    };

    render(){
        return(
            <div style={{paddingTop: 35}}>
                <ConflictTable openConflict={this.openDialog} handleState={this.handleState} save={this.update} conflicts={this.props.conflicts} open={this.openDialog} />
                <ConflictView open={this.state.dialogOpen} 
                              conflict={this.state.conflict} 
                              onClose={this.closeConflict}
                              onSelectEdit={this.handleEdit}
                              onSelectDeny={this.handleDeny}
                              onSelectApprove={this.handleApprove}
                              denyOpen={this.state.denyDialogOpen}
                              eventDetails={this.state.eventDetailsString}
                              userID={this.state.user}
                              onSelectDenySend={this.handleDenySend}
                              onSelectDenyCancel={this.handleSelectDenyCancel}
                              handleMessage={this.saveMessage}
                              onExit={this.handleExit}
                />
                <ApproveDialog
                    conflict={this.state.conflict}
                    open={this.state.approveOpen}
                    close={this.approveConfirmClose}
                    approve={this.handleApproveClose}
                />
            </div>
        );
    };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conflicts));