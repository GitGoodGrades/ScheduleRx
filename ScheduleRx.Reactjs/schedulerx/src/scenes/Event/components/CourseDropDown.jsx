import React from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

class CourseDropDown extends React.Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    };

    handleChange = (event, index, value) => this.setState({value: value});


    render(){
        const courseList = this.props.courseList;
        return (
            <div>
                <Select value={this.state.value} onChange={this.handleChange}>
                    {(courseList.records && courseList.records.length > 0 && courseList.records.map(row => {
                        return (
                            <MenuItem value={row.COURSE_ID}>{row.COURSE_ID}</MenuItem>
                        )
                        }
                    ))
                    };
                </Select>
            </div>
        );
    }
}
export default CourseDropDown;