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
import LoadWrapper from '../../../../Base Components/LoadWrapper';

const styles = theme => ({
  dialogSelect: {
    width: '80%',
  },
});

class MessageTable extends Component {
    state = {
        messages: null,
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
        <Paper elevation="0" style={{backgroundColor: 'transparent'}}>
            <LoadWrapper open={messages ? false : true} />
            <Table>
                <TableHead style={{backgroundColor: 'rgba(0,0,0, 0.7)'}}>
                <TableRow>
                    <TableCell style={{color: "white", fontSize:16}}>Messages</TableCell>
                    {/* <TableCell>Type</TableCell>
                    <TableCell>Date</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor: "white"}}>
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
