import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import Icon from 'material-ui/Icon';

import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Option from './Option';
import 'react-select/dist/react-select.css';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  hidden: {
      display: 'none'
  }
});

class EventViewEditFull extends Component{
    state = {
        edit: false
    }
    handleClose = () => {
    this.props.onClose();
    };
    
    componentWillReceiveProps = (nextProps) => {
        let sections = [];
        nextProps.event.SECTIONS && nextProps.event.SECTIONS.records[0] && this.props.sectionList.map(section => {
                if(section.COURSE_ID === nextProps.event.SECTIONS.records[0].COURSE_ID) {
                sections.push({label: section.SECTION_ID, value: section.SECTION_ID})
                }
            });
        let selectSections = []; 
        nextProps.event.SECTIONS && nextProps.event.SECTIONS.records.map(section => selectSections.push({label: section.SECTION_ID, value: section.SECTION_ID}));
        this.setState({ 
            event: nextProps.event,
            room: nextProps.event.ROOM_ID,
            course: nextProps.event.SECTIONS && nextProps.event.SECTIONS.records[0] && nextProps.event.SECTIONS.records[0].COURSE_ID,
            sections: selectSections,
            title: nextProps.event.BOOKING_TITLE,
            details: nextProps.event.DETAILS,
            start: nextProps.event.START_TIME,
            end: nextProps.event.END_TIME,
            sectionOptions: sections
        })
    }
  
    handleCourseChange = event => {
        let sections = [];
            this.props.sectionList.map(section => {
                if(section.COURSE_ID === event.value) {
                sections.push({label: section.SECTION_ID, value: section.SECTION_ID})
                }
            }) 
            this.setState({sectionOptions: sections, course: event.value});
    }

    handleSectionChange = event => {
        this.setState({sections: event})
        this.props.onChange('sections', event);
    };

    handleRoomChange = event => {
        this.setState({room: event.value})
        this.props.onChange('room', event.value);
    };

    cancel = () => {
        this.props.onCancel();
    };
    
    handleBlur = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };
    
    handleSave = () => {
        this.props.onSave(this.state.title);
    };

    selectEdit = () => {
        this.setState({ edit: true })
    }

  render(){
    const { classes, event, onClose } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
      <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
      >
        <div>
          <Card className={classes.card}>
            <CardContent className={this.state.edit ? classes.hidden : ''}>
              <Typography className={classes.title}>Room: {event && event.ROOM_ID}</Typography>
              <Typography variant="headline" component="h2">
                {event && event.BOOKING_TITLE}
              </Typography>
              <Typography className={classes.pos}>Course: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}</Typography>
              <Typography component="p">
                {event && moment(event.START_TIME).format('MMMM Do YYYY')} <br />
                {event && moment(event.START_TIME).format('h:mm a')} - 
                {event && moment(event.END_TIME).format('h:mm a')}
              </Typography>
              <Typography component="p">
                {event && event.DETAILS}
              </Typography>
              <Button variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.selectEdit}>
                <Icon>edit_icon</Icon>
              </Button>
            </CardContent>
            <CardContent className={this.state.edit ? '' : classes.hidden}>
                <Typography variant="headline" component="h2">
                    <input
                        className={classes.field}
                        id="title"
                        onBlur={this.handleBlur}
                        placeholder={event && event.BOOKING_TITLE}
                    >
                    </input>
              </Typography>
              <div className={classes.control}>
                    <InputLabel htmlFor="section-helper" className={classes.label}>Select Room</InputLabel>
                    <Select
                        className={classes.Select}
                        closeOnSelect
                        options={this.props.roomList && this.props.roomList.map( row => 
                            row = {label: row.ROOM_ID, value: row.ROOM_ID}
                        )}
                        value={this.state.room}
                        optionComponent={Option}
                        placeholder={event && event.ROOM_ID}
                    />
                </div>
              
                <div className={classes.control}  style={{zIndex: 100}}>
                    <InputLabel className={classes.label} htmlFor="course-helper">Select Course</InputLabel>
                    <Select
                        className={classes.Select}
                        onChange={this.handleCourseChange}
                        options={this.props.courseList && this.props.courseList.map( row => 
                            row = {label: row.COURSE_ID, value: row.COURSE_ID}
                        )}
                        value={event.course}
                        placeholder={(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}
                        optionComponent={Option}
                    />
                </div>
                <div className={classes.control}>
                    <InputLabel htmlFor="select-multiple" className={classes.label}>Select Section(s)</InputLabel>
                    <Select
                        className={classes.Select}
                        closeOnSelect={true}
                        removeSelected={true}
                        multi
                        onChange={this.handleSectionChange}
                        options={this.state.sectionOptions}
                        simpleValue
                        value={this.state.sections}
                        optionComponent={Option}
                    />
                </div>
              <Typography component="p">
                {event && moment(event.START_TIME).format('MMMM Do YYYY')} <br />
                {event && moment(event.START_TIME).format('h:mm a')} - 
                {event && moment(event.END_TIME).format('h:mm a')}
              </Typography>
              <Typography component="p">
                {event && event.DETAILS}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </ Dialog>
  );
  }
  
}

export default withStyles(styles)(EventViewEditFull);