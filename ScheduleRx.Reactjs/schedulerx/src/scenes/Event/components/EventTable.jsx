import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class EventTable extends Component {
    render() {
        const eventList = this.props.eventList;
        return (
            <Paper>
                <Table >
                    <TableBody>
                        {(eventList.records && eventList.records.length > 0 && eventList.records.map(row => {
                            return (
                                <TableRow key={row.BOOKING_ID}>
                                    <TableCell>{row.BOOKING_ID}</TableCell>
                                    <TableCell >{row.COURSE_ID}</TableCell>
                                    <TableCell >{row.SECTION_ID}</TableCell>
                                    <TableCell >{row.ROOM_ID}</TableCell>
                                    <TableCell >{row.SCHEDULE_ID}</TableCell>
                                    <TableCell >{row.START_TIME}</TableCell>
                                    <TableCell >{row.END_TIME}</TableCell>
                                </TableRow>
                            );
                        })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default EventTable;