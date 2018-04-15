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
                <Card>
                    <CardContent>
                        <Typography>
                            The changes you made to this event will cause a conflict, or you are trying
                            to edit outside of registration. 
                            If you continue, your event will be deleted, and an event request with
                            an optional message will be sent to the administrator.
                        </Typography>
                        <textarea
                            onBlur={this.handleBlur}
                            id="message"
                            maxLength={250}
                        >
                        </textarea>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="raised"
                            size="small"
                            onClick={this.handleCancel}>
                            Cancel
                            <Clear/>
                        </Button>
                        <Button
                            variant="raised"
                            size="small"
                            onClick={this.handleSend}>
                            Continue
                            <Send/>
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
        )
    }
}
export default withStyles(styles)(EditConflictContinueDialog);