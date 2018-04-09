import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TableFooter from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';

import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';

const styles = theme => ({
  dialogSelect: {
    width: '80%',
  },
});

class RoomTable extends Component{


  handleClick = (event, id) => {
    this.props.openEdit(id);
  };

  handleState = () =>{
    this.forceUpdate();
  }
  
openDialog = () =>{
  this.props.open();
}
handleChange = event => {
  this.setState({
    [event.target.id]: event.target.value,
  });
};
  
      render(){
          const RoomList = this.props.roomList;
          const {classes} = this.props;
          return(
              <Paper>
                
          <h1 style={{color: 'rgb(111, 0, 41)', textAlign: 'center', paddingTop: 5}}>List Of Rooms</h1>
                <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Number</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Room Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Capability</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(RoomList && RoomList.length > 0 && RoomList.map(row => {
                let cap = '';
                row.CAPABILITIES && row.CAPABILITIES.length > 0 && row.CAPABILITIES.map((elem, index, array) => {
                  if (index+1 < array.length) { 
                     cap += elem + ", ";
                  } else {
                     cap += elem;
                  }
              })
                return (
                  <TableRow
                     hover
                    onClick={event => this.handleClick(event, row.ROOM_ID)}
                    id={row.ROOM_ID}
                    >
                    <TableCell>{row.ROOM_ID}</TableCell>
                    <TableCell>{row.CAPACITY}</TableCell>
                    <TableCell>{row.ROOM_NAME}</TableCell>
                    <TableCell>{row.LOCATION}</TableCell>
                    <TableCell>{cap}
                    </TableCell>
                    <TableCell>{row.DESCRIPTION}</TableCell>
                  </TableRow>
                );
              })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
            </TableBody>
            <TableFooter height="auto" padding={5}>
            <IconButton 
              variant="fab" 
              mini color="secondary" 
              aria-label="add" 
              className={classes.button}
              onClick={this.openDialog}>
              <AddIcon />
              
            </IconButton>
            Add new Room
            </TableFooter>
          </Table>
              </Paper>
          );
      }
    }export default withStyles(styles)(RoomTable);