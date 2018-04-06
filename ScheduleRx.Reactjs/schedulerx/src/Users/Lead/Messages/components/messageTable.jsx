import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import TableFooter from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';

const styles = theme => ({
  dialogSelect: {
    width: '80%',
  },
});

class MessageTable extends Component {
    state = {
        messages: [],
    }

    componentWillReceiveProps(nextProps) {
        this.setState({messages: nextProps.messages});
    }

    handleClick = (event, id) => {
        this.props.openMessage(id)
    };

    render() {
        const {messages} = this.state;
        return (
        <Paper>
            <h1 style={{color: 'rgb(111, 0, 41)', textAlign: 'center', paddingTop: 5}}>Messages from the Admin</h1>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Message</TableCell>
                    {/* <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {(messages && messages.length > 0 && messages.map(row => {
                    return (
                    <TableRow
                        hover
                        onClick={event => this.handleClick(event, row.MSG_ID)}
                        id={row.MSG_ID}
                    >
                        <TableCell>{row.MESSAGE}</TableCell>
                        {/* <TableCell >{row.type}</TableCell>
                        <TableCell>{moment(row.date).format('MMM Do YYYY h:mm a')}</TableCell> */}


                    </TableRow>
                    );
                })) || <TableRow><TableCell>No messages at this time</TableCell></TableRow>}
                </TableBody>
            </Table>
        </Paper>
        );
    }
}

export default withStyles(styles)(MessageTable);
