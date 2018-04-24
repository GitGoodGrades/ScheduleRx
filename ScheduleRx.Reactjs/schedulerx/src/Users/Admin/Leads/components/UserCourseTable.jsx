import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {client} from '../../../../configuration/client';
import LoadWrapper from '../../../../Base Components/LoadWrapper';
import { Snackbar } from 'material-ui';
import Grow from 'material-ui/transitions/Grow';

class UserCourseTable extends Component {
    state = {
        leads: [],
        faculty: [],
        snackbarOpen: false
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({leads: nextProps.leads});
        this.setState({faculty: nextProps.facultyList});
    };

    handleChange = (event) => {
        let leadsTemp = this.state.leads;

        let index = -1;
        leadsTemp.find(function(item, i){
            if(item.COURSE_ID === event.target.name){
              index = i;
              return i;
            }
          });
        if (index !== -1) {
            leadsTemp[index] = {
                COURSE_ID:  event.target.name ,
                USER_ID: event.target.value
            };
        }
         client.post(`/LeadsCourse/Assign.php`, this.state.leads);
        this.setState({leads: leadsTemp, snackbarOpen: true})
    };

    snackbarClose = () => {
        this.setState({snackbarOpen: false})
    }



    render() {
        const {leads, faculty} = this.props;  
        return (
        <Paper elevation="0" style={{backgroundColor: 'transparent'}}>
            <LoadWrapper open={leads && leads.length > 0 ? false : true} />
            <Table>
                <TableHead style={{backgroundColor: 'rgba(0,0,0, 0.7)'}}>
                    <TableRow>
                        <TableCell style={{color: "white", fontSize:16}}>Courses</TableCell>
                        <TableCell style={{color: "white", fontSize:16}}>Leads</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{backgroundColor: "white"}}>
                {leads && leads.length > 0 && leads.map(row => {
                    return (
                    <TableRow key={row.COURSE_ID}>
                        <TableCell>{row.COURSE_ID}</TableCell>
                        <TableCell>
                            <Select
                                disableUnderline='true'
                                style={{border: '1px solid rgb(204, 204, 204)', borderRadius: '4px', paddingLeft: '10px', }}
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
            <Snackbar onClose={this.snackbarClose} 
                        open={this.state.snackbarOpen}
                        autoHideDuration={900}
                        transition={Grow}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        message={<span>Course Leader Has Been Saved!</span>}
                        >
            </Snackbar>
        </Paper>

        );
  }
}

export default UserCourseTable;