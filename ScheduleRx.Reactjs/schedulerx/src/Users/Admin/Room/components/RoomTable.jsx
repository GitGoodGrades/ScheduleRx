import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TableFooter from 'material-ui/Table';
import TableFooter from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';

class RoomTable extends Component{

  
    componentWillReceiveProps(nextProps) {
      this.setState({scheduleList: nextProps});
    }
  
    handleClick = (event, id) => {
      this.setState({id, open: true})
    };
  
    handleChange = (event) => {
      this.props.save(this.state.id, event.target.value, moment().format("YYYY-MM-DD hh:mm:ss"))
      this.setState({open: false})
    };
  
    handleClose = () => {
      this.setState({open: false})
    };
  
    openDialog = () => {
      this.props.open();
    }
  }
      render(){
          const RoomList = this.props.roomList;
          const {classes} = this.props;
          return(
              <Paper>
                <Dialog
        width={500}
        open={this.state.open}
        onClose={this.handleClose}
        style={{background: 'rgba(111, 0, 41, .4)'}}
        >
        <DialogTitle><h1 style={{color: 'rgb(111, 0, 41)', fontWeight: 'lighter', fontSize: '1em'}}>Make the schedule for {this.state.id} visible?</h1></DialogTitle>
        <DialogContent>
          <form width={600}>

            <FormControl style={{border: '', width: '100%'}}>
            <InputLabel htmlFor="Release"></InputLabel>
                <Select style={{width: 300, margin: 'auto', color: 'rgb(111, 0, 41)'}}
                  className={classes.dialogSelect}
                  native
                  onChange={this.handleChange}
                  input={<Input id="Release" />}
                >
                  <option value="" />
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </Select>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
          <h1 style={{color: 'rgb(111, 0, 41)', textAlign: 'center', paddingTop: 5}}>List Of Schedules</h1>
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
                <TableCell>Delete Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(RoomList && RoomList.length > 0 && RoomList.map(row => {
                return (
                  <TableRow>
                    <TableCell><a href = '#' onClick={this.editRoom.bind(this)}>Edit</a></TableCell>
                    <TableCell>{row.ROOM_ID}</TableCell>
                    <TableCell>{row.CAPACITY}</TableCell>
                    <TableCell>{row.ROOM_NAME}</TableCell>
                    <TableCell>{row.LOCATION}</TableCell>
                    <TableCell>{row.CAPABILITY}</TableCell>
                    <TableCell>{row.DESCRIPTION}</TableCell>
                    <TableCell> <a href = '#' onClick={this.deleteRoom.bind(this)}>X</a> </TableCell>
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
              /*onClick={this.openDialog}*/>
              <AddIcon />
              
            </IconButton>
            Add new room
            </TableFooter>
          </Table>
              </Paper>
          );
      }
    }export default RoomTable;