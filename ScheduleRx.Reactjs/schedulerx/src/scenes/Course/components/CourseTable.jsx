import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table, { TableBody, TableHead, TableFooter, TableCell, TableRow, TableSortLabel, TablePagination } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden/Hidden';

class CourseTable extends Component {
  render() {
    const courseList = this.props.courseList;
    return (
      <Paper>
        <div>
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
        </div>
      </Paper>
    );
  }
}

export default CourseTable;