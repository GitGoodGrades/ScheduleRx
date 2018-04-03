import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow,TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {client} from '../../../../configuration/client';
import TableFooter from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';

class UserCourseTable extends Component {
    state = {
        leads: [],
        faculty: []
    };

    // componentDidMount = () => {
    //     let leadArray;
    //     if(this.props.courses && !this.props.leads){
    //         let {courses} = this.props;
    //         let temp = [];
    //         leadArray = this.setLeads((courses.length - 1), 0, temp);
    //         this.setState({
    //             leads: leadArray
    //         })
    //     }
        
   // }

    // setLeads = (total, point, temp) => {
    //     if(point < total){
    //         client.post(`/LeadsCourse/Assign.php`, {
    //             COURSE_ID: this.props.courses[point].COURSE_ID,
    //             USER_ID: this.props.user
    //         });
    //         temp.push({
    //             COURSE_ID: this.props.courses[point].COURSE_ID,
    //             USER_ID: this.props.user
    //         })
    //         point++;
    //         this.setLeads(total, point, temp);
    //     } else {
    //         return temp;
    //     }
    //     return temp;
    // }
    
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
        this.setState({leads: leadsTemp})
    };



    render() {
        const {leads, faculty} = this.props;  
        const {classes} = this.props;
        return (
        <Paper>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>shit</TableCell>
                    </TableRow>
                </TableHead>
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
                <TableFooter height="auto" padding={5}>
            <IconButton 
              variant="fab" 
              mini color="secondary" 
              aria-label="add" 
              className={classes.button}
              /*onClick={this.openDialog}*/>
              <AddIcon />
              
            </IconButton>
            Add new lead
            </TableFooter>
            </Table>
        </Paper>
        );
  }
}

export default UserCourseTable;