import React from 'react';
import { withStyles } from 'material-ui/styles';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import axios from "axios/index";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    /**textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },*/
    menu: {
        width: 200,
    },
    customWidth: {
        width: 200,

    }
});


class EventForm extends React.Component {
    state = {
        BOOKING_ID: '',
        SCHEDULE_ID: '',
        COURSE_ID: '',
        SECTION_ID: '',
        ROOM_ID: '',
        START_TIME: '',
        END_TIME: '',
        courseList: []
    };

    /**handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };*/

    handleChange = (event, index, value) => this.setState({value});

    handleSave = () => {
        this.props.onSave(this.state.SCHEDULE_ID,  this.state.COURSE_ID, this.state.SECTION_ID, this.state.ROOM_ID, this.state.START_TIME, this.state.END_TIME);
    };

    componentDidMount() {
        axios.get(`http://localhost:63342/ScheduleRx/ScheduleRx.API/Courses/Index.php`)
            .then(res => {
                const courseList = res.data;
                this.setState(courseList);
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper>
                <form className={classes.container}>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        {(this.state.courseList.records && this.state.courseList.records.length > 0 && this.state.courseList.records.map(row => {
                            return (
                                <MenuItem value={row.index} primaryText={row.COURSE_ID} />
                            );
                        })) || <MenuItem value={0} primaryText={'No Courses to Show'}/>}
                    </DropDownMenu>
                </form>
                <Button variant="raised" onClick={this.handleSave} >
                    Save
                </Button>
            </ Paper>
        );
    }
}

export default withStyles(styles)(EventForm);
