import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';





const styles = theme => ({
  container: {
    minHeight: 300,
  },
});

class EventTopForm extends Component {
  state = {
      COURSE_ID: '',
      SECTION_ID: '',
      ROOM_ID: '',
  };


  handleChange = event => {
      this.setState({[event.target.name]: event.target.value});
  };


  render() {
    const {classes} = this.props;
    return (
      <Form className={classes.container}>
          <Dropdown
            placeholder="Select a course"
            name="COURSE_ID"
            fluid selection
            options={this.props.courseList}
          >


          </Dropdown>

      </Form>
    );
  }
}



export default withStyles(styles)(EventTopForm)
