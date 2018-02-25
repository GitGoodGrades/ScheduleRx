import React from 'react';
import axios from "axios/index";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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
                <DropDownMenu value=this.state.value onChange={this.handleChange}>
                    {(courseList.records && courseList.records.length > 0 && courseList.records.map(row =>
                        {return (
                            <MenuItem value={row.COURSE_ID} primaryText={row.COURSE_ID}/>

                            )
                        }
                    ))
                    };
                </DropDownMenu>
            </div>
        );
    }
}
export default CourseDropDown;