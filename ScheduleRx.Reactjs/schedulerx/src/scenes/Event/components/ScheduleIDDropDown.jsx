import React from 'react';
import axios from "axios/index";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class ScheduleIDDropDown extends React.Component {
    constructor() {
      super();
      this.state = {
          value: 'fall'
      }
    };

  handleChange = (event, index, value) => this.setState({value: value});


  render(){
    return (
        <div>
            <DropDownMenu value=this.state.value onChange={this.handleChange}>
                <MenuItem value={'fall'} primaryText="Fall" />
                <MenuItem value={'spring'} primaryText="Spring" />
                <MenuItem value={'winter'} primaryText="Winter" />
                <MenuItem value={'summer'} primaryText="Summer" />
            </DropDownMenu>
          </div>
    );
  }
}
export default ScheduleIDDropDown;
