import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Clear from 'material-ui-icons/Clear';
import Send from 'material-ui-icons/Send';
import { Typography } from 'material-ui';
import TextField from 'material-ui/TextField';

const styles = theme => {

} 

class EditConflictContinueDialog extends Component {

    state = {
        message: ""
    }

    handleCancel = () => {
        this.props.onCancel();
    }

    handleSend = () => {
        this.props.onContinue(this.state.message);
    }

    handleBlur = (event) => {
        this.props.onMessageBlur(event.target.value)
        //this.setState({[event.target.id]: event.target.value});
    }

    render () {
        return (
            <Dialog
                open={this.props.open}
            >
                
                    <DialogContent>
                        <Typography>
                            The changes you made to this event will cause a conflict, or you are trying
                            to edit outside of registration. 
                            If you continue, your event will be deleted, and an event request with
                            an optional message will be sent to the administrator.
                        </Typography>
                        <TextField
                            onBlur={this.handleBlur}
                            id="message"
                            style={{border: '1px solid rgb(204,204,204)', borderRadius: '4px', width: '96%', paddingLeft: '2%', paddingRight: '2%'}}
                            inputProps={{maxLength: 250}}
                            InputProps={{disableUnderline: true, inputProps: {style:{fontSize: '12px'}}}}
                        />
                        <div style={{float: 'right', marginTop: 10}}>
                        <Button
                            color="primary"
                            variant="raised"
                            size="small"
                            onClick={this.handleCancel}>
                            Cancel
                            <Clear/>
                        </Button>
                        <Button
                            color="primary"
                            style={{marginLeft: 5}}
                            variant="raised"
                            size="small"
                            onClick={this.handleSend}>
                            Continue
                            <Send/>
                        </Button>
                        </div>
                    </DialogContent>
            </Dialog>
        )
    }
}
export default withStyles(styles)(EditConflictContinueDialog);