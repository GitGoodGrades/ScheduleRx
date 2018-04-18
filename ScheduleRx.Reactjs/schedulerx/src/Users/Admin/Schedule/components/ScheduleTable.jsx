import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import TableFooter from 'material-ui/Table';
import AddIcon from 'material-ui-icons/Add';
import Button from 'material-ui/Button';
import LoadWrapper from '../../../../Base Components/LoadWrapper';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  dialogSelect: {
    width: '80%',
  },
  header: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    color: "white"
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class ScheduleTable extends Component {
  constructor(props){
    super();
    this.state = {id: '', open: false, scheduleList: []};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({scheduleList: nextProps});
  }

  handleClick = (event, id) => {
    this.props.handleEdit(id)
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

  render() {
    const ScheduleList = this.props.scheduleList;
    const {classes} = this.props;
    return (
      <Paper elevation="0" style={{backgroundColor: 'transparent'}}>
        <LoadWrapper open={this.props.scheduleList ? false : true } />
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
          <Table>
            <TableHead className={classes.header}>
              <TableRow >
                <TableCell style={{color: "white", fontSize:16}}>Semester</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Registration Start</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Registration End</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Semester Start</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Semester End</TableCell>
                <TableCell style={{color: "white", fontSize:16}}>Schedule is Visible?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{backgroundColor: "white"}}>
              {(ScheduleList && ScheduleList.length > 0 && ScheduleList.map(row => {
                return (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, row.SCHEDULE_ID)}
                    id={row.SCHEDULE_ID}
                  >
                    <TableCell>{row.SCHEDULE_ID}</TableCell>
                    <TableCell >{moment(row.START_REG_DATE).format("MMM Do YYYY")}</TableCell>
                    <TableCell>{moment(row.END_REG_DATE).format("MMM Do YYYY")}</TableCell>
                    <TableCell >{moment(row.START_SEM_DATE).format("MMM Do YYYY")}</TableCell>
                    <TableCell>{moment(row.END_SEM_DATE).format("MMM Do YYYY")}</TableCell>
                    <TableCell >{row.IS_RELEASED === "0"?"No":"Yes"}</TableCell>
                  </TableRow>
                );
              }))}
            </TableBody>
            <TableFooter height="auto" padding={5}>
            <Tooltip title="Add new semester">
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
}

export default withStyles(styles)(ScheduleTable);
