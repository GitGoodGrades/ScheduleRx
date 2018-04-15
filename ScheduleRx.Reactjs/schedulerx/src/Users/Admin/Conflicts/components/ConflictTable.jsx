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

class ConflictTable extends Component {
    state = {
        conflicts: null,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({conflicts: nextProps.conflicts});
    }

    handleClick = (event, id) => {
        this.props.openConflict(id, true)
    };

    // handleChange = (event) => {
    //     this.props.save(this.state.id, event.target.value, moment().format("YYYY-MM-DD hh:mm:ss"))
    //     this.setState({open: false})
    // };

    // handleClose = () => {
    //     this.setState({open: false})
    // };

    // openDialog = () => {
    //     this.props.open();
    // }

    render() {
        const {conflicts} = this.state;
        return (
        <Paper>
            <LoadWrapper open={this.state.conflicts == null ? true : false}/>
            <h1 style={{color: 'rgb(111, 0, 41)', textAlign: 'center', paddingTop: 5}}>Conflicts/Room Requests</h1>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Room</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Begin Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Courses</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(conflicts && conflicts.length > 0 && conflicts.map(row => {
                    return (
                    <TableRow
                        hover
                        onClick={event => this.handleClick(event, row.CONFLICT_ID)}
                        id={row.CONFLICT_ID}
                    >
                        <TableCell>{row.ROOM}</TableCell>
                        <TableCell >{moment(row.CONFLICT_START).format("MMM Do YYYY")}</TableCell>
                        <TableCell>{moment(row.CONFLICT_START).format('h:mm a')}</TableCell>
                        <TableCell >{moment(row.CONFLICT_END).format('h:mm a')}</TableCell>
                        <TableCell>{row.COURSE_ID && row.COURSE_ID.map((elem, index, array) => {
                            if (index+1 < array.length) { 
                                return elem + ", ";
                            } else {
                                return elem;
                            }
                        })}</TableCell>
                    </TableRow>
                    );
                })) || <TableRow><TableCell>No conflicts at this time</TableCell></TableRow>}
                </TableBody>
            </Table>
        </Paper>
        );
    }
}

export default withStyles(styles)(ConflictTable);
