import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui-pickers/DatePicker';
import TimePicker from 'material-ui-pickers/TimePicker';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Save from 'material-ui-icons/Save';
import 'react-select/dist/react-select.css';
import {Divider} from 'material-ui';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';


const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    hidden: {
        display: 'none'
    }
});

class ApproveDialog extends Component{
    state = {
        conflictEvent: null,
        events: null,
        message: ""
    };

    componentWillReceiveProps = (nextProps) => {
        let temp = [];
        nextProps.conflict && nextProps.conflict.EVENTS && nextProps.conflict.EVENTS.forEach(element => {
            if(element.SCHEDULE_ID == null){
                this.setState({
                    conflictEvent: element
                })
            }else{
                temp.push(element)
            }
        });
        this.setState({events: temp})
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleChange = (event) => {
        this.setState({ message: event.target.value })
    };

    render(){
        const { classes, event, onClose } = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                onBackdropClick={this.handleClose}
            >
                <div>
                    <Card className={classes.card}>
                        <CardContent className={this.state.edit ? classes.hidden : ''}>
                            <h2>
                                Approve Requested Event for Room {this.props.conflict.ROOM_ID}
                            </h2>
                            <h5>The Following Events will be Deleted:</h5>
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Begin Time</TableCell>
                                        <TableCell>End Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(this.props.conflict.EVENTS && this.props.conflict.EVENTS.length > 0 && this.props.conflict.EVENTS.map(row => {
                                        return (
                                            <TableRow key={row.BOOKING_TITLE}>
                                                <TableCell>{row.BOOKING_TITLE}</TableCell>
                                                <TableCell>{row.START_TIME}</TableCell>
                                                <TableCell >{row.END_TIME}</TableCell>
                                            </TableRow>
                                        );
                                    })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
                                </TableBody>
                            </Table>
                            <h5>Notify Faculty of changes? (Optional)</h5>
                            <TextField
                                id="message"
                                multiline
                                value={this.state.message}
                                onChange={this.handleChange}
                                onBlur={this.handleSave}
                                margin="normal"
                            />
                        </CardContent>
                        <CardActions>
                            <Button variant="raised" size="small" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="raised" size="small" onClick={this.handleSave}>
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            </ Dialog>
        );
    }

}

export default withStyles(styles)(ApproveDialog);