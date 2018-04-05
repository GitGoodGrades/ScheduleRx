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

  
      render(){
          const RoomList = this.props.roomList;
          const {classes} = this.props;
          return(
              <Paper>
                <Dialog
        width={500}
        
        style={{background: 'rgba(111, 0, 41, .4)'}}
        >

        <DialogContent>
          <form width={600}>

            <FormControl style={{border: '', width: '60%'}}>
            <InputLabel htmlFor="Release"></InputLabel>
                <div>hello</div>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
          <h1 style={{color: 'rgb(111, 0, 41)', textAlign: 'center', paddingTop: 5}}>List Of Rooms</h1>
                <Table>
            <TableHead>
              <TableRow>
                <TableCell>Edit Room</TableCell>
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
                return (
                  <TableRow>
                    <TableCell><a href = '#'>Edit</a></TableCell>
                    <TableCell>{row.ROOM_ID}</TableCell>
                    <TableCell>{row.CAPACITY}</TableCell>
                    <TableCell>{row.ROOM_NAME}</TableCell>
                    <TableCell>{row.LOCATION}</TableCell>
                    <TableCell>{row.CAPABILITY}</TableCell>
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