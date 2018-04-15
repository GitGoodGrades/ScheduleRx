import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import  {Dialog,   DialogActions,
    DialogContent, } from 'material-ui';
import Select from 'react-select';
import Input, {InputLabel} from 'material-ui/Input';
import Option from '../../../../Base Components/Option';


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
      ROOM_ID: null,
      CAPACITY: null,
      ROOM_NAME: null,
      LOCATION: null,
      CAPABILITIES: [],
      DESCRIPTION: null, 
      valid: true
    };
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            CAPABILITY_LIST: nextProps.capList
        })
    };
    handleCapChange = (event) => {
        this.setState({CAPABILITIES: event})
    };
    handleSave = () => {
        if(this.state.ROOM_ID && this.state.CAPACITY && this.state.LOCATION){
           this.props.onSave(this.state);
            this.cancel(); 
        } else {
            this.setState({valid: false})
        }
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
                label={this.state.valid || (this.state.ROOM_ID && this.state.ROOM_ID != '') ? "Room Number" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={true}
                error={!(this.state.valid || this.state.ROOM_ID)}
                inputProps={{maxLength: 250}}
            />
        </div>
        <div>
            <TextField
                id="CAPACITY"
                label={this.state.valid || this.state.CAPACITY ? "Capacity" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={true}
                error={!(this.state.valid || this.state.CAPACITY)}
                type="number"
                inputProps={{maxLength: 3}}
            />
        </div>
        <div>
            <TextField
                id="ROOM_NAME"
                label="Room Name"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={false}
            />
        </div>
        <div>
        <TextField
                id="LOCATION"
                label={this.state.valid || this.state.LOCATION ? "Location" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                error={!(this.state.valid || this.state.LOCATION)}
                margin="normal"
                required={true}
            />
        </div>
        <div className={classes.control}>
                              <InputLabel htmlFor="select-multiple" className={classes.label}>Select Capabilities</InputLabel>
                              <Select
                                className={classes.Select}
                                closeOnSelect={true}
                                removeSelected={true}
                                multi
                                onChange={this.handleCapChange}
                                options={this.props.capabilityOptions}
                                placeholder="Capabilities"
                                value={this.state.CAPABILITIES}
                                optionComponent={Option}
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
