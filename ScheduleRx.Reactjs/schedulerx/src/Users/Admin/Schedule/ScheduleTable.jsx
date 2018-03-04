import React, { Component } from 'react';
import Table, { TableBody, TableCell, TableRow, TableHead } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import theme from '../../../MaterialUI/theme/index';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  dialogSelect: {
    width: '80%',
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
    this.setState({id, open: true})
  };

  handleChange = (event) => {
    this.props.save(this.state.id, event.target.value, moment().format("YYYY-MM-DD hh:mm:ss"))
    this.setState({open: false})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  render() {
    const ScheduleList = this.props.scheduleList;
    const {classes} = this.props;
    return (
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
                <TableCell>Semester</TableCell>
                <TableCell>Event Registration Begin Date</TableCell>
                <TableCell>Event Registration End Date</TableCell>
                <TableCell>Semester Begin Date</TableCell>
                <TableCell>Semester End Date</TableCell>
                <TableCell>Schedule is Visible?</TableCell>
              </TableRow>
            </TableHead>
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
                    <TableCell >{row.IS_RELEASED === "0"?"No":"Yes"}</TableCell>
                  </TableRow>
                );
              })) || <TableRow><TableCell>No Results</TableCell></TableRow>}
            </TableBody>
          </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(ScheduleTable);
