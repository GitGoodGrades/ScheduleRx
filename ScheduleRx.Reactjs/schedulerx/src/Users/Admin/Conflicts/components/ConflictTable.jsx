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
        loading: true
    }

    componentWillReceiveProps(nextProps) {
        this.setState({conflicts: nextProps.conflicts,});
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

    openBULLSHITDIALOG = () => {
        if(this.state.conflicts == null){
            return true
        }
        else {return false}
    }

    render() {
        const {conflicts, loading} = this.state;
        return (
        <Paper elevation="0" style={{backgroundColor: 'transparent'}}>
        <LoadWrapper open={this.props.conflicts ? false : true } />
            <Table>
                <TableHead style={{backgroundColor: 'rgba(0,0,0, 0.7)'}}>
                <TableRow>
                    <TableCell style={{color: "white"}}>Room</TableCell>
                    <TableCell style={{color: "white"}}>Date</TableCell>
                    <TableCell style={{color: "white"}}>Begin Time</TableCell>
                    <TableCell style={{color: "white"}}>End Time</TableCell>
                    <TableCell style={{color: "white"}}>Courses</TableCell>
                </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor: "white"}}>
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
                })) || <TableRow><TableCell/><TableCell/>
                    <TableCell>No conflicts at this time</TableCell>
                    <TableCell/><TableCell/></TableRow>}
                </TableBody>
            </Table>
        </Paper>
      
        );
    }
}

export default withStyles(styles)(ConflictTable);
