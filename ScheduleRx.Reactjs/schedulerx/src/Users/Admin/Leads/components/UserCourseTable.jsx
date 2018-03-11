import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';

class UserCourseTable extends Component {
    state = { 
        course: '',
        faculty: ''
    }
    handleChange = (event) => {
        event
    }

    render() {
        const {courses} = this.props;  
        return (
        <Paper>
            <Table >
                <TableBody>
                {(courses && courses.length > 0 && courses.map(row => {
                    return (
                    <TableRow key={row.COURSE_ID}>
                        <TableCell>{row.COURSE_ID}</TableCell>
                        <TableCell >
                                    <Select
                                        input={<Input name="Faculty"/>}
                                        name="Faculty"
                                        onChange={this.handleChange}
                                        value={this.state.faculty}
                                    >
                                        {(this.props.faculty && this.props.faculty.length > 0 && this.props.faculty.map(row => {
                                            return (
                                                <MenuItem value={row.USER_ID}>{row.USER_ID}</MenuItem>
                                            )
                                        })) || <MenuItem>None</MenuItem>};
                                    </Select>
                        </TableCell>
                    </TableRow>
                    );
                })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
                </TableBody>
            </Table>
        </Paper>
        );
  }
}

export default UserCourseTable;