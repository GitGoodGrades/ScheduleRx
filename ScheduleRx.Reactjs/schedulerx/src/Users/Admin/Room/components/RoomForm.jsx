import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import  {Dialog,   DialogActions,
    DialogContent,
    Typography, } from 'material-ui';
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
    
    width: 300,
  },
  input: {
    border: '1px solid rgb(204,204,204)',
    borderRadius: '4px',
    height: '36px',
    width: '98%',
    marginRight: 'none',
    marginLeft: '0px'
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
      <Typography style={{color: 'black', fontSize: 20, textAlign: 'center', marginBottom: 10 }}>Create New Room</Typography>
        <div>
            <InputLabel >Room Number:</InputLabel>
            <TextField
                
                id="ROOM_ID"
                placeholder={this.state.valid || (this.state.ROOM_ID && this.state.ROOM_ID != '') ? "" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                
                required={true}
                error={!(this.state.valid || this.state.ROOM_ID)}
                inputProps={{maxLength: 10}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)',  paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginBottom: 10, marginRight: 'none', marginLeft: '0px'}}
            />
            <InputLabel>Capacity:</InputLabel>
            <TextField
                id="CAPACITY"
                placeholder={this.state.valid || this.state.CAPACITY ? "" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                required={true}
                
                error={!(this.state.valid || this.state.CAPACITY)}
                type="number"
                inputProps={{max: 999}}
                InputProps={{disableUnderline: 'true'}}
                style={{border: '1px solid rgb(204,204,204)', paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginBottom: 10, marginRight: 'none', marginLeft: '0px'}}
            />
            <InputLabel style={{marginTop: 5}}>Room Name:</InputLabel>
            <TextField
                id="ROOM_NAME"
                className={classes.textField}
                onChange={this.handleChange}
                required={false}
                inputProps={{maxLength: 10}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginBottom: 10, marginRight: 'none', marginLeft: '0px'}}
            />
        <InputLabel >Location:</InputLabel>
        <TextField
                id="LOCATION"
                placeholder={this.state.valid || this.state.LOCATION ? "" : "*REQUIRED"}
                className={classes.textField}
                onChange={this.handleChange}
                error={!(this.state.valid || this.state.LOCATION)}
                required={true}
                inputProps={{maxLength: 15}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', paddingLeft: '2%', paddingRight: '2%', borderRadius: '4px', height: '36px', width: '96%', marginRight: 'none', marginLeft: '0px', marginBottom: 10}}
            />
            <InputLabel htmlFor="select-multiple" className={classes.label}>Select Capabilities:</InputLabel>
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
            InputProps={{disableUnderline: 'true'}}
            style={{ border: '1px solid rgb(204,204,204)', borderRadius: '4px', height: '38px', width: '100%', marginBottom: 10, marginRight: 'none', marginLeft: '0px'}}
            />
        
            <InputLabel>Description:</InputLabel>
            <TextField
                id="DESCRIPTION"
                className={classes.textField}
                onChange={this.handleChange}
                required={false}
                inputProps={{maxLength: 25}}
                InputProps={{disableUnderline: 'true'}}
                style={{ border: '1px solid rgb(204,204,204)', borderRadius: '4px', height: '36px', width: '96%', paddingLeft: '2%', paddingRight: '2%', marginBottom: 10, marginRight: 'none', marginLeft: '0px'}}
            />
        </div>

            <div style={{float: 'right', marginTop: 10, }}>
          <Button
                style={{marginLeft: 5}} 
                variant="raised"
                color="primary"
                onClick={this.cancel}>
            Cancel
          </Button>
          <Button
                style={{marginLeft: 5}} 
                variant="raised" 
                color="primary"
              onClick={this.handleSave}
          >
            Submit
          </Button>
          </div>
       </DialogContent>
      </Dialog>
   );
}
}

export default withStyles(styles)(RoomForm);
