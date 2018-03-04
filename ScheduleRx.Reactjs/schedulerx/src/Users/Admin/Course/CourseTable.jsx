import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class CourseTable extends Component {
  render() {
    const courseList = this.props.courseList;  
    return (
      <Paper>
          <Table >
            <TableBody>
              {(courseList.records && courseList.records.length > 0 && courseList.records.map(row => {
                return (
                  <TableRow key={row.COURSE_ID}>
                    <TableCell>{row.COURSE_ID}</TableCell>
                    <TableCell >{row.STUDENTS}</TableCell>
                  </TableRow>
                );
              })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
            </TableBody>
          </Table>
      </Paper>
    );
  }
}

export default CourseTable;