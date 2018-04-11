import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Input, {InputLabel} from 'material-ui/Input';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui-pickers/DatePicker';
import TimePicker from 'material-ui-pickers/TimePicker';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import Option from './Option';
import Save from 'material-ui-icons/Save';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import {client} from "../configuration/client";
import EditConflictContinueDialog from '../Users/Admin/Event/components/EditConflictContinueDialog';

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

const mapStateToProps = (state) => ({
    redirect: state.redirected,
    registrationSchedule: state.registrationSchedule
})

class EventViewEditFull extends Component{
    state = {
        edit: false,
        date: null, 
        sectionChange: false,
        originalEvent: {},
        redirection: false,
        confirm: false,
        conflictDialogOpen: false,
        conflicts: [],
        isConflict: false,
        isRequest: false,
        message: ""
    }

    handleClose = () => {
    this.props.onClose();
    };

    handleSave = () => {
        let now = moment();
        let regStart = this.props.registrationSchedule.START_REG_DATE;
        let regEnd = this.props.registrationSchedule.END_REG_DATE;
        let regSemStart = this.props.registrationSchedule.START_SEM_DATE;
        let regSemEnd = this.props.registrationSchedule.END_SEM_DATE;
        if(now.isBetween(regStart, regEnd)){
            if(this.state.start.isBetween(regSemStart, regSemEnd)) {
                this.setState({
                    isRequest: false
                })
                this.checkForConflicts();
            }
            else{
                this.setState({
                    isConflict: false,
                    isRequest: true,
                    conflictDialogOpen: true
                })
            }
            //if event is between reg semester
                //and there are no conflicts
                    //createevent with new info and the regschedule id
                //if there are conflicts
                    //create conflict with message, conflictList, scheduleid is null
            //if event is not between reg semester 
                //create request
            
        }
        else {
            this.setState({
                isRequest: true,
                isConflict: false,
                conflictDialogOpen: true
            })
            //create request
        }
        
    }

     

    checkForConflicts = () => {
        let conflicts = [];
        let room = this.state.room;
        let end = moment(this.state.end).format('YYYY-MM-DD HH:mm:ss');
        let start = moment(this.state.start).format('YYYY-MM-DD HH:mm:ss');

        client.post('Bookings/Conflict.php', {
            START_TIME:  moment(this.state.start).format('YYYY-MM-DD HH:mm:ss'),
            END_TIME:   moment(this.state.end).format('YYYY-MM-DD HH:mm:ss'),
            ROOM_ID: this.state.room
        })
            .then(res => {
                if (res.data === "" || this.state.confirm) {
                    this.setState({
                        conflicts: conflicts,
                        isConflict: false
                    })
                    this.handleDelete(this.state.originalEvent.BOOKING_ID);
                    this.setState({confirm:  false});
                    this.createEditedEvent();
                   // this.handleSave();
                   //createEvent with new info and schedule ID
                }
                else {
                    res.data && res.data.map(event => {
                        conflicts.push(event.BOOKING_ID);
                    })
                    this.setState({
                        conflictDialogOpen: true,
                        conflicts: conflicts,
                        isConflict: true,
                        isRequest: false
                    })
                }
            });
    };
    
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.redirect){
            this.setState({
                edit: true,
                redirection: true
            })
        }

        let sections = [];
        nextProps.event.SECTIONS && nextProps.event.SECTIONS.records[0] && this.props.sectionList.map(section => {
                if(section.COURSE_ID === nextProps.event.SECTIONS.records[0].COURSE_ID) {
                sections.push({label: section.SECTION_ID, value: section.SECTION_ID})
                }
            });
        let selectSections = []; 
        nextProps.event.SECTIONS && nextProps.event.SECTIONS.records.map(section => selectSections.push({label: section.SECTION_ID, value: section.SECTION_ID}));
        
        let original = {
            BOOKING_ID: nextProps.event.BOOKING_ID,
            room: nextProps.event.ROOM_ID,
            course: nextProps.event.SECTIONS && nextProps.event.SECTIONS.records[0] && nextProps.event.SECTIONS.records[0].COURSE_ID,
            sections: selectSections,
            title: nextProps.event.BOOKING_TITLE,
            details: nextProps.event.NOTES ? nextProps.event.NOTES : '',
            start: nextProps.event.START_TIME,
            end: nextProps.event.END_TIME,
            sectionOptions: sections,
            date: moment(nextProps.event.START_TIME).format("YYYY-MM-DD")
        };

        this.setState({ 
            BOOKING_ID: nextProps.event.BOOKING_ID,
            room: nextProps.event.ROOM_ID,
            course: nextProps.event.SECTIONS && nextProps.event.SECTIONS.records[0] && nextProps.event.SECTIONS.records[0].COURSE_ID,
            sections: selectSections,
            title: nextProps.event.BOOKING_TITLE,
            details: nextProps.event.NOTES ? nextProps.event.NOTES : '',
            start: nextProps.event.START_TIME,
            end: nextProps.event.END_TIME,
            sectionOptions: sections,
            date: moment(nextProps.event.START_TIME).format("YYYY-MM-DD"),
            originalEvent: original
        })
    }
  
    handleCourseChange = event => {
        let sections = [];
            this.props.sectionList.map(section => {
                if(section.COURSE_ID === event.value) {
                sections.push({label: section.SECTION_ID, value: section.SECTION_ID})
                }
            }) 
        this.setState({sectionOptions: sections, course: event.value, sections: []});
    }

    handleSectionChange = (event) => {
        this.setState({sections: event, sectionChange: true})
    };

    handleRoomChange = event => {
        this.setState({room: event.value})
    };

    cancel = () => {
        this.setState({edit: false})
    };
    
    handleBlur = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleContinue = () => {

        this.props.delete(this.state.originalEvent.BOOKING_ID);
        this.createEditedEvent();
    }

    handleConflictCancel = () => {
        this.setState({
            conflictDialogOpen: false
        })
    }
    
    
    createEditedEvent = () => {
        let sections = [];
        let check = this.state.sections;
        if(!Array.isArray(check)){
            sections = this.state.sections.split(',');
        } else {
            this.state.sections && this.state.sections.map(element => {
                sections.push(element.value)
            })
        }

        if(this.state.isConflict == false && this.state.isRequest == false) {
            client.post(`Bookings/Create.php`, {
                SCHEDULE_ID: this.props.registrationSchedule.SCHEDULE_ID,
                COURSE_ID: this.state.course,
                SECTION_ID: sections,
                ROOM_ID: this.state.room,
                START_TIME: moment(this.state.start).format('YYYY-MM-DD HH:mm:ss'),
                END_TIME:moment(this.state.end).format('YYYY-MM-DD HH:mm:ss'),
                BOOKING_TITLE: this.state.title,
                NOTES: this.state.details
            })
        }
        else if(this.state.isConflict == true && this.state.isRequest == false) {
            client.post(`Bookings/Create.php`, {
                SCHEDULE_ID: null,
                COURSE_ID: this.state.course,
                SECTION_ID: sections,
                ROOM_ID: this.state.room,
                START_TIME: moment(this.state.start).format('YYYY-MM-DD HH:mm:ss'),
                END_TIME:moment(this.state.end).format('YYYY-MM-DD HH:mm:ss'),
                BOOKING_TITLE: this.state.title,
                NOTES: this.state.details,
                BOOKING_ID: this.state.conflicts,
                MESSAGE: this.state.message
            })
        }
        else if(this.state.isConflict == false && this.state.isRequest == true) {
            client.post(`Bookings/Create.php`, {
                SCHEDULE_ID: null,
                COURSE_ID: this.state.course,
                SECTION_ID: sections,
                ROOM_ID: this.state.room,
                START_TIME: moment(this.state.start).format('YYYY-MM-DD HH:mm:ss'),
                END_TIME:moment(this.state.end).format('YYYY-MM-DD HH:mm:ss'),
                BOOKING_TITLE: this.state.title,
                NOTES: this.state.details,
                BOOKING_ID: this.state.conflicts,
                MESSAGE: this.state.message
            })
        }
        this.setState({
            conflictDialogOpen: false
        })
    }

    handleMessageBlur = (message) => {
        this.setState({
            message: message
        })
    }

    selectEdit = () => {
        this.setState({ edit: true })
    }

    handleDuplicate = () => {
        this.setState({ edit: true, BOOKING_ID: null, date: null })
    }

    handleDelete = () => {
        this.props.delete(this.state.BOOKING_ID)
    }

    handleChangeDate = (event) => {
        this.setState({
            date: moment(event._d).format("YYYY-MM-DD"),
            start: moment(event._d).format("YYYY-MM-DD") + " " + moment(this.state.start).format('h:mm a'),
            end: moment(event._d).format("YYYY-MM-DD") + " " + moment(this.state.end).format('h:mm a')
    })
    }

    handleChangeStart = (event) => {
        let date = this.state.date;
        this.setState({start: date + " " + moment(event._d).format('h:mm a')})
    }

    handleChangeEnd = (event) => {
        let date = this.state.date;
        this.setState({end: date + " " + moment(event._d).format('h:mm a')})
    }

  render(){
    const { classes, event, onClose } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    
    return (
    <div>
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
              <IconButton variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.selectEdit}>
                <Icon>edit_icon</Icon>
              </IconButton>
              <IconButton variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.handleDuplicate}>
                <Icon>queue_icon</Icon>
              </IconButton>
              <IconButton variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.handleDelete}>
                <Icon>delete_forever_icon</Icon>
              </IconButton>
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
                    <input
                    id="details"
                    onBlur={this.handleBlur}
                    placeholder={event && event.DETAILS}
                    >
                    </input>
              </Typography>
              <div className={classes.control}>
                    <InputLabel htmlFor="section-helper" className={classes.label}>Select Room</InputLabel>
                    <Select
                        className={classes.Select}
                        onChange={this.handleRoomChange}
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
                        value={this.state.course}
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
                <DatePicker
                    id="date"
                    value={this.state.date}
                    placeholder="select a date"
                    onChange={this.handleChangeDate}
                />
                <br />
                <TimePicker
                    id="start"
                    value={this.state.start}
                    onChange={this.handleChangeStart}
                    disabled={this.state.date == null}
                />
                <TimePicker
                    id="end"
                    value={this.state.end}
                    onChange={this.handleChangeEnd}
                    disabled={this.state.date == null}
                />
              </Typography>
              
               
            </CardContent>
            <CardActions className={this.state.edit ? '' : classes.hidden}>
                 <Button variant="raised" size="small" onClick={this.cancel}>
                    Cancel
                </Button> 
                <Button variant="raised" size="small" onClick={this.handleSave}>
                    Save
                </Button>
            </CardActions>
          </Card>
        </div>
      </ Dialog>
        <EditConflictContinueDialog
            onContinue={this.handleContinue}
            onCancel={this.handleConflictCancel}
            open={this.state.conflictDialogOpen}
            onMessageBlur={this.handleMessageBlur}
            
        />
    </div>
  );
  }
  
}

export default connect(mapStateToProps)(withStyles(styles)(EventViewEditFull));