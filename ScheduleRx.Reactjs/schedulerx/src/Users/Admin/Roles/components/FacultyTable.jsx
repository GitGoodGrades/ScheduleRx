import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Select from 'react-select';
import {MenuItem} from 'material-ui/Menu';
import {client} from '../../../../configuration/client';
import LoadWrapper from '../../../../Base Components/LoadWrapper';

class UserCourseTable extends Component {
    state = {
        faculty: []
    };

    componentWillReceiveProps = (nextProps) => {
        let facList = nextProps.users;
        let temp = [];
        facList && facList.map(fac => {
            if(fac.ROLE_ID == 1) {
                temp.push({
                    UserID: fac.USER_ID,
                    // UserName: fac.FIRSTNAME + " " + fac.LASTNAME,
                    UserRole: 1
                })
            }
            else if(fac.ROLE_ID == 2 || fac.ROLE_ID == 3){
                temp.push({
                    UserID: fac.USER_ID,
                    // UserName: fac.FIRSTNAME + " " + fac.LASTNAME,
                    UserRole: 0
                })
            }
        })

        this.setState({faculty: temp});
    };

    handleChange = (row, event) => {
        let temp = this.state.faculty;

        let index = -1;
        temp.find(function(item, i){
            if(item.UserID === row){
              index = i;
              return i;
            }
          });
        if (index !== -1) {
            temp[index] = {
                UserID:  row ,
                UserRole: event.value,
            };
        }
        client.post(`Users/Promote.php`, {
            USER_ID: row,
            PROMOTE: event.value
        });
        this.setState({faculty: temp})
    };



    render() {
        const {faculty} = this.state;  
        const options = [{value: 1, label: 'Admin'}, 
                         {value: 0, label: 'Faculty'}
                        ];
        return (
        <Paper>
            <LoadWrapper open={faculty.length > 0 ? false : true} />
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell><h2>User Id</h2></TableCell>
                        {/* <TableCell><h2>User Name</h2></TableCell> */}
                        <TableCell><h2>Role</h2></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {faculty && faculty.length > 0 && faculty.map(row => {
                    return (
                    <TableRow key={row.UserID}>
                        <TableCell>{row.UserID}</TableCell>
                        {/* <TableCell>{row.UserName}</TableCell> */}
                        <TableCell >
                            <Select
                                name={row.UserID}
                                onChange={(e) => this.handleChange(row.UserID, e)}
                                value={row.UserRole}
                                options={options}
                            />
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