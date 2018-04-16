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
            
                <Dialog 
                    open={this.state.open}
                    onBackdropClick={this.close}
                    fullScreen
                    PaperProps={{style: {background: 'rgba(255, 255, 255, .8)', padding: 'none'}}}
                >
                    
                    
                        <LinearProgress color='secondary'/>
                        <LinearProgress color='secondary'/>
                        <LinearProgress color='secondary'/>
                        <Divider />
                        <DialogContent style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <div style={{margin: 'auto'}}>Loading...</div>
                        </DialogContent>
                    
                    
                </ Dialog>
            
        );
    }
  
}

export default withStyles(styles)(Loading);