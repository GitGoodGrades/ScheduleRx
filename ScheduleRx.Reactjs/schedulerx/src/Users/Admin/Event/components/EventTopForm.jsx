import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import {Form, Select} from 'antd';
import {connect} from 'react-redux';

const FormItem = Form.Item;
const Option = Select.Option;
const styles = theme => ({
  container: {
    minHeight: 300,
  },
});

class EmptyTopForm extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Form className={classes.container}>
        <FormItem>
          <Select
            style={{ width: 200 }}
            placeholder="Select a course"
            optionFilterProp="course"
          >
            <Option value='1'>1</Option>
            <Option value='2'>2</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select
            style={{ width: 200 }}
            placeholder="Select a room"
            optionFilterProp="room"
          >
            <Option value='1'>1</Option>
            <Option value='2'>2</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select
            style={{ width: 200 }}
            placeholder="Select a course"
            optionFilterProp="course"
          >
            <Option value='1'>1</Option>
            <Option value='2'>2</Option>
          </Select>
        </FormItem>
      </Form>
    );
  }
}

const EventTopForm = (EmptyTopForm);

export default withStyles(styles)(EventTopForm)
