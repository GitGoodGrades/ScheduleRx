import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import TableFooter from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Tooltip from 'material-ui/Tooltip';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import LoadWrapper from '../../../../Base Components/LoadWrapper';

const styles = theme => ({
  dialogSelect: {
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
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
              <Paper elevation="0" style={{backgroundColor: 'transparent'}}>
              <LoadWrapper open={this.props.roomList && this.props.roomList.length > 0 ? false : true} />
                <Table>
            <TableHead style={{backgroundColor: 'rgba(0,0,0, 0.7)'}}>
              <TableRow>
                <TableCell style={{color: "white", fontSize:16}}>Room Number</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Capacity</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Room Name</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Location</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Capability</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{backgroundColor: "white"}}>
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
              })) || <TableRow><TableCell/><TableCell/><TableCell>No Results</TableCell><TableCell/><TableCell/></TableRow>}
            </TableBody>
            <TableFooter height="auto" padding={5}>
            <Tooltip title="Add New Room">
            <Button 
              variant="raised" 
              color="primary" 
              aria-label="add" 
              className={classes.button}
              onClick={this.openDialog}>
              <AddIcon />
              
            </Button>
           </Tooltip>
            </TableFooter>
          </Table>
              </Paper>
          );
      }
    }export default withStyles(styles)(RoomTable);