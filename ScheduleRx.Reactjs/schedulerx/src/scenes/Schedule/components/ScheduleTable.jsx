import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

class ScheduleTable extends Component {
  constructor(props){
    super();
    this.state = {id: '', open: false, scheduleList: []};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({scheduleList: nextProps});
  }

  handleClick = (event, id) => {
    this.setState({id, open: true})
  }

  handleChange = (event) => {
    this.props.save(this.state.id, event.target.value, moment().format("YYYY-MM-DD hh:mm:ss"))
    this.setState({open: false})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const ScheduleList = this.props.scheduleList;  
    return (
      <Paper>
        <Dialog
        width={500}
        open={this.state.open}
        onClose={this.handleClose}
        >
        <DialogTitle>{this.state.id}</DialogTitle>
        <DialogContent>
          <form width={500}>
            <FormControl>
            <InputLabel htmlFor="Release">Released?</InputLabel>
                <Select
                  native
                  onChange={this.handleChange}
                  input={<Input id="Release" />}
                >
                  <option value="" />
                  <option value={1}>True</option>
                  <option value={0}>false</option>
                </Select>
            </FormControl>
          </form>
        </DialogContent>
      </Dialog>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Schedule Id</TableCell>
                <TableCell >Registration Start</TableCell>
                <TableCell>Registration End</TableCell>
                <TableCell >Semester Start</TableCell>
                <TableCell>Semester End</TableCell>
                <TableCell >Schedule is Released</TableCell>
              </TableRow>
            </ TableHead>
            <TableBody>
              {(ScheduleList.records && ScheduleList.records.length > 0 && ScheduleList.records.map(row => {
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
                    <TableCell >{row.IS_RELEASED === "0"?"False":"True"}</TableCell>
                  </TableRow>
                );
              })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
            </TableBody>
          </Table>
      </Paper>
    );
  }
}

export default ScheduleTable;