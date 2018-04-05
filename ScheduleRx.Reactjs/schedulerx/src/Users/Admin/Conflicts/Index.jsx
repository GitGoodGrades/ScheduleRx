import React, { Component } from 'react';
import ConflictTable from './components/ConflictTable';
import moment from 'moment';
import * as action from '../../../Redux/actions/actionCreator';
import { connect } from 'react-redux';
import { client } from '../../../configuration/client';
import history from '../../../App/History';
import ConflictView from './components/ConflictView';

const mapStateToProps = (state) => ({
    conflicts: state.conflicts,
    
  });

const mapDispatchToProps = (dispatch) => ({
    onLoad: () => dispatch(action.getConflictList())
});

class Conflicts extends Component {
    state = {
        conflictId: null,
        dialogOpen: false,
        conflict: {}
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({schedules: nextProps.schedules})
    }

    componentDidMount() {
        this.props.onLoad();
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
    }

    closeConflict = () => {
        this.setState({
            dialogOpen: false
        })
    }

    cancel = () => {
        this.setState({
          dialogOpen: false
        })
      };


    render(){
        return(
            <div style={{paddingTop: 35}}>
                <ConflictTable openConflict={this.openDialog} handleState={this.handleState} save={this.update} conflicts={this.props.conflicts} open={this.openDialog} />
                <ConflictView open={this.state.dialogOpen} conflict={this.state.conflict} onClose={this.closeConflict}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Conflicts);