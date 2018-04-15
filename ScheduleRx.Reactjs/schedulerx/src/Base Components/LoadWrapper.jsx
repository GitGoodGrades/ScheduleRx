import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';
import { Paper, Divider } from 'material-ui';
import Dialog, { DialogContent } from 'material-ui/Dialog';

const styles = {
  root: {
    flexGrow: 1,
  },
  
};

class Loading extends Component{
    state = {open: true}
    componentWillReceiveProps = (nextProps) => {
        this.setState({ open: nextProps.open })
    }

    close = () => {
        this.setState({open: false})
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Dialog 
                    open={this.state.open}
                    onBackdropClick={this.close}
                >
                    <DialogContent>
                        <LinearProgress color='secondary'/>
                        <LinearProgress color='secondary'/>
                        <LinearProgress color='secondary'/>
                        <Divider />
                        Loading...
                    </DialogContent>
                </ Dialog>
            </div>
        );
    }
  
}

export default withStyles(styles)(Loading);