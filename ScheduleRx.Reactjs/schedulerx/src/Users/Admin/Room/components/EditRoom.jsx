import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
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
      ROOM_ID: null,
      CAPACITY: null,
      ROOM_NAME: null,
      LOCATION: null,
      CAPABILITIES: [],
      DESCRIPTION: null,
      capability_Labels: [], 
      valid: true
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

    handleCapChange = event => {
        this.setState({ CAPABILITIES: event })
    };

    handleSave = () => {
        if(this.state.CAPACITY && this.state.LOCATION){
            this.props.onUpdate(this.state);
        } else {
            this.setState({valid: false})
        }
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
    <DialogContent style={{minWidth: 275}}>
      <Typography align="center" style={{fontSize: 20, marginBottom: 10}}>Edit room: {this.state.ROOM_ID}</Typography>
        <div>
            <InputLabel>Capacity:</InputLabel>
            <TextField
                id="CAPACITY"
                defaultValue = {this.state.CAPACITY}
                placeholder={this.state.valid || this.state.CAPACITY ? "Capacity" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                type="number"
                error={!(this.state.valid || this.state.CAPACITY)}
                required={true}
                inputProps={{max: 999}}
                InputProps={{disableUnderline: 'true'}}
                style={{border: '1px solid rgb(204,204,204)',paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginRight: 'none', marginLeft: '0px', marginBottom: 10}}
            />
            <InputLabel>Room Name:</InputLabel>
            <TextField
                id="ROOM_NAME"
                defaultValue = {this.state.ROOM_NAME}
                className={classes.textField}
                onChange={this.handleChange}
                required={false}
                inputProps={{maxLength: 10}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginRight: 'none', marginLeft: '0px', marginBottom: 10}}
            />
        <InputLabel>Location:</InputLabel>
        <TextField
                id="LOCATION"
                defaultValue = {this.state.LOCATION}
                className={classes.textField}
                placeholder={this.state.valid || this.state.LOCATION ? "Location" : "*REQUIRED"}
                onChange={this.handleChange}
                error={!(this.state.valid || this.state.LOCATION)}
                required={false}
                inputProps={{maxLength: 15}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginRight: 'none', marginLeft: '0px', marginBottom: 10}}
            />
            <InputLabel htmlFor="select-multiple" className={classes.label}>Select Capabilities</InputLabel>
            <Select
                className={classes.Select}
                closeOnSelect={true}
                removeSelected={true}
                multi
                onChange={this.handleCapChange}
                options={this.props.capabilityOptions}
                value={this.state.CAPABILITIES}
                optionComponent={Option}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', borderRadius: '4px', height: '36px', width: '100%', marginRight: 'none', marginLeft: '0px', marginBottom: 10}}
            />
            <InputLabel>Description:</InputLabel>
            <TextField
                id="DESCRIPTION"
                defaultValue = {this.state.DESCRIPTION}
                className={classes.textField}
                onChange={this.handleChange}
                required={false}
                inputProps={{maxLength: 25}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', borderRadius: '4px',paddingLeft: '2%', paddingRight: '2%', height: '36px', width: '96%', marginRight: 'none', marginLeft: '0px', marginBottom: 10}}
            />
        </div>
        <div style={{float: 'right', marginTop: 10}}>
          <Button
            variant="raised" 
            color="primary"
              className={classes.btn}
              onClick={this.cancel}>
            Cancel
          </Button>
          <Button
            variant="raised"
            color="primary"
              className={classes.btn}
              onClick={this.handleSave}
              style={{marginLeft: 5}}
          >
            Submit
          </Button>
          </div>
        </DialogContent>
      </Dialog>
   );
}
}

export default withStyles(styles)(EditRoom);
