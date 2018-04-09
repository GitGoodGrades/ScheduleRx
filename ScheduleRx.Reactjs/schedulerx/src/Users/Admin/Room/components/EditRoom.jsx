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


class EditRoom extends React.Component {
    state = {
      ROOM_ID: '',
      CAPACITY: null,
      ROOM_NAME: null,
      LOCATION: null,
      CAPABILITIES: [],
      DESCRIPTION: null,
    };
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            ROOM_ID: nextProps.room && nextProps.room.ROOM_ID,
            CAPACITY: nextProps.room && nextProps.room.CAPACITY,
            ROOM_NAME: nextProps.room && nextProps.room.ROOM_NAME,
            LOCATION: nextProps.room && nextProps.room.LOCATION,
            CAPABILITIES: nextProps.room && nextProps.room.CAPABILITIES,
            DESCRIPTION: nextProps.room && nextProps.room.DESCRIPTION,
            CAPABILITY_LIST: nextProps.capList
        })
    };
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    };
    handleCapChange = (event) => {
        this.setState({CAPABILITIES: event})
        
    };
    handleSave = () => {
        
        this.props.onUpdate(this.state);
        
    };
    cancel = () => {
        this.props.onCancel();
    };
render() {
    const room = this.props.room;
    const {classes} = this.props;
return (
    
    <Dialog
        className={classes.container}
        open={this.props.open}
    >
    <DialogContent className={classes.content}>
      <h2 style={{color: 'rgb(111, 0, 41)', paddingTop: 10, textAlign: 'center'}}>Edit room: {this.state.ROOM_ID}</h2>
        <div>
            <TextField
                id="CAPACITY"
                label="Capacity"
                defaultValue = {this.state.CAPACITY}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={true}
            />
        </div>
        <div>
            <TextField
                id="ROOM_NAME"
                label="Room Name"
                defaultValue = {this.state.ROOM_NAME}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={false}
            />
        </div>
        <div>
        <TextField
                id="LOCATION"
                label="Location"
                defaultValue = {this.state.LOCATION}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                required={false}
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
                                simpleValue
                                value={this.state.CAPABILITIES}
                                optionComponent={Option}
                              />
                        </div>
        <div>
            <TextField
                id="DESCRIPTION"
                label="Description"
                defaultValue = {this.state.DESCRIPTION}
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

export default withStyles(styles)(EditRoom);
