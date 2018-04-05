import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import  {Dialog,   DialogActions,
    DialogContent, } from 'material-ui';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 230,
    justifyContent: 'center',
    alignItems: 'middle',
  },
  menu: {
    width: 230,
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'middle',
    width: 300,
  }
});


class RoomForm extends React.Component {
    state = {
      ROOM_ID: '',
      CAPACITY: null,
      ROOM_NAME: null,
      LOCATION: null,
      DESCRIPTION: null,
    };
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    };
    handleSave = () => {
        this.props.onSave(this.state), this.props.resubmit(this.state);
        
    };
    cancel = () => {
        this.props.onCancel();
    };
render() {

    const {classes} = this.props;
return (
    <Dialog
        className={classes.container}
        open={this.props.open}
    >
    <DialogContent className={classes.content}>
      <h2 style={{color: 'rgb(111, 0, 41)', paddingTop: 10, textAlign: 'center'}}>Create New Room</h2>
        <div>
            <TextField
                id="ROOM_ID"
                label="Room Number"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={true}
            />
        </div>
        <div>
            <TextField
                id="CAPACITY"
                label="Capacity"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={true}
            />
        </div>
        <div>
            <TextField
                id="ROOM_NAME"
                label="Room Name (ex:'Auditorium')"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={false}
            />
        </div>
        <div>
        <TextField
                id="LOCATION"
                label="Location (ex: 'nursing' for Kitty Degree)"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={false}
            />
        </div>
        <div>
            <TextField
                id="DESCRIPTION"
                label="Description"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={false}
            />
        </div>
        </DialogContent>
            <DialogActions>
          <Button
              className={classes.btn}
              onClick={this.cancel}>
            Cancel
          </Button>
          <Button
              className={classes.btn}
              onClick={this.handleSave}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
   );
}
}

export default withStyles(styles)(RoomForm);
