import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Input, {InputLabel} from 'material-ui/Input';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {client} from '../../../../configuration/client';

class UserCourseTable extends Component {
    state = {
        leads: []
    }
    
    componentWillReceiveProps = (nextProps) => {
        this.setState({leads: nextProps.leads});
    }

    handleChange = (event) => {
        let leadsTemp = this.state.leads;

        var index = -1;
        leadsTemp.find(function(item, i){
            if(item.COURSE_ID === event.target.name){
              index = i;
              return i;
            }
          })
        if (index !== -1) {
            leadsTemp[index] = {
                COURSE_ID:  event.target.name ,
                USER_ID: event.target.value
            };
        }
         client.post(`/LeadsCourse/Assign.php`, this.state.leads);
        this.setState({leads: leadsTemp})
    }



    render() {
        const {leads, faculty} = this.props;  
        return (
        <Paper>
            <Table >
                <TableBody>
                {leads && leads.length > 0 && leads.map(row => {
                    return (
                    <TableRow key={row.COURSE_ID}>
                        <TableCell>{row.COURSE_ID}</TableCell>
                        <TableCell >
                            <Select
                                name={row.COURSE_ID}
                                onChange={this.handleChange}
                                value={row.USER_ID}
                                >
                                    {(faculty && faculty.length > 0 && faculty.map(inside => {
                                        return (
                                            <MenuItem value={inside.USER_ID}>{inside.USER_ID}</MenuItem>
                                        )
                                    })) || <MenuItem>None</MenuItem>};
                            </Select>
                        </TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </Paper>
        );
  }
}

export default UserCourseTable;