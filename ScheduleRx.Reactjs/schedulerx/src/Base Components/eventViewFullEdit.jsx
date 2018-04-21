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
import ReactToPrint from "react-to-print";
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  label: {
    
    color: 'black'
  },
  title: {
    marginBottom: 5
  },
  pos: {
    
  },
  hidden: {
      display: 'none'
  },
  content: {
      marginBottom: 5,
      fontSize: 15
  },
  control: {
      marginBottom: 10
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
        sectionOptions: [],
        sectionChange: false,
        originalEvent: {},
        redirection: false,
        confirm: false,
        conflictDialogOpen: false,
        conflicts: [],
        isConflict: false,
        isRequest: false,
        room: '',
        course: '',
        sections: [],
        title: "",
        details: '',
        start: '',
        end: '',
        message: "",
        timeChange: 'false',
        roomChange: 'false'
    }

    handleClose = () => {
        this.setState({
            edit: false
        })
        this.props.onClose();
    };

    handleSave = () => {
        if(this.state.start && this.state.end && this.state.room && this.state.course && this.state.sections && this.state.title){
            let now = moment();
        let regStart = this.props.registrationSchedule.START_REG_DATE;
        let regEnd = this.props.registrationSchedule.END_REG_DATE;
        let regSemStart = this.props.registrationSchedule.START_SEM_DATE;
        let regSemEnd = this.props.registrationSchedule.END_SEM_DATE;
        if(now.isBetween(regStart, regEnd)){
            if(this.state.roomChange == true || this.state.timeChange == true || this.state.duplicate == true) {
                if(moment(this.state.start).isBetween(regSemStart, regSemEnd)) {
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
            }
            else {
                this.updateEvent();
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
            if(this.state.timeChange == 'true' || this.state.roomChange == 'true') {
                this.setState({
                    isRequest: true,
                    isConflict: false,
                    conflictDialogOpen: true
                })
            }
            else {
                this.updateEvent();
            }
        }
        
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
            ROOM_ID: this.state.room,
            BOOKING_ID: this.state.originalEvent.BOOKING_ID
        })
            .then(res => {
                if (res.data === "" || this.state.confirm) {
                    this.setState({
                        conflicts: conflicts,
                        isConflict: false
                    }, this.handleContinue())
                    
                   // this.handleSave();
                   //createEvent with new info and schedule ID
                }
                else {
                    res.data && res.data.map(event => {
                        if(event.BOOKING_ID !== this.state.originalEvent.BOOKING_ID)
                        {conflicts.push(event.BOOKING_ID)};
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
    
    componentDidMount = () => {
        this.setState({
            room: this.state.originalEvent.ROOM_ID
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.redirect){
            this.setState({
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
            ROOM_ID: nextProps.event.ROOM_ID,
            COURSE_ID: nextProps.event.SECTIONS && nextProps.event.SECTIONS.records[0] && nextProps.event.SECTIONS.records[0].COURSE_ID,
            SECTION_ID: selectSections,
            BOOKING_TITLE: nextProps.event.BOOKING_TITLE,
            NOTES: nextProps.event.NOTES ? nextProps.event.NOTES : '',
            START_TIME: nextProps.event.START_TIME,
            END_TIME: nextProps.event.END_TIME,
            sectionOptions: sections,
            date: moment(nextProps.event.START_TIME).format("YYYY-MM-DD"),
            SCHEDULE_ID: nextProps.event.SCHEDULE_ID
        };

        this.setState({ 
            sectionOptions: sections,
            originalEvent: original
        })

        if(nextProps.redirect){
            this.selectEdit();
        }
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
        this.setState({room: event.value, roomChange: 'true'})
    };

    cancel = () => {
        const event = this.state.originalEvent;
        this.setState({
            edit: false,
            room: event.ROOM_ID,
            course: event.COURSE_ID,
            sections: event.SECTION_ID,
            title: event.BOOKING_TITLE,
            details: event.NOTES ? event.NOTES : '',
            start: event.START_TIME,
            end: event.END_TIME,
            date: moment(event.START_TIME).format("YYYY-MM-DD")
        })
    };
    
    handleBlur = (event) => {
        this.setState({[event.target.id]: event.target.value});
    };

    handleContinue = () => {
        if(!this.state.duplicate) {
            this.props.delete(this.state.originalEvent.BOOKING_ID);
        }
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
                BOOKING_IDs: this.state.conflicts,
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
                BOOKING_IDs: this.state.conflicts,
                MESSAGE: this.state.message
            })
        }
        let temp = {
            SCHEDULE_ID: this.state.message ? null : this.state.originalEvent.SCHEDULE_ID,
            SECTIONS: {records: [{
                COURSE_ID: this.state.course
            }]},
            SECTION_ID: sections,
            ROOM_ID: this.state.room,
            START_TIME: moment(this.state.start).format('YYYY-MM-DD HH:mm:ss'),
            END_TIME:moment(this.state.end).format('YYYY-MM-DD HH:mm:ss'),
            BOOKING_TITLE: this.state.title,
            DETAILS: this.state.details,
            BOOKING_ID: this.state.duplicate? null : this.state.originalEvent.BOOKING_ID
        }

        this.props.spliceEvent(temp);

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
        const event = this.state.originalEvent;
        this.setState({ 
            edit: true,
            room: event.ROOM_ID,
            course: event.COURSE_ID,
            sections: event.SECTION_ID,
            title: event.BOOKING_TITLE,
            details: event.NOTES ? event.NOTES : '',
            start: event.START_TIME,
            end: event.END_TIME,
            date: moment(event.START_TIME).format("YYYY-MM-DD")
        })
    }

    handleDuplicate = () => {
        const event = this.state.originalEvent;
        this.setState({ 
            edit: true,
            BOOKING_ID: null,
            date: null,
            room: event.ROOM_ID,
            course: event.COURSE_ID,
            sections: event.SECTION_ID,
            title: event.BOOKING_TITLE,
            details: event.NOTES ? event.NOTES : '',
            start: event.START_TIME,
            end: event.END_TIME,
            duplicate: true
        })

    }

    handleDelete = () => {
        this.props.delete(this.state.originalEvent.BOOKING_ID)
    }

    handleChangeDate = (event) => {
        this.setState({
            date: moment(event._d).format("YYYY-MM-DD"),
            start: moment(event._d).format("YYYY-MM-DD") + " " + moment(this.state.start).format('h:mm a'),
            end: moment(event._d).format("YYYY-MM-DD") + " " + moment(this.state.end).format('h:mm a'),
            timeChange: 'true'
    })
    }

    handleChangeStart = (event) => {
        let date = this.state.date;
        this.setState({
            start: date + " " + moment(event._d).format('h:mm a'),
            timeChange: 'true'
        })
    }

    handleChangeEnd = (event) => {
        let date = this.state.date;
        this.setState({
            end: date + " " + moment(event._d).format('h:mm a'),
            timeChange: 'true'
        })
    }

    updateEvent = () => {
        let sections = [];
        let check = this.state.sections;
        if(!Array.isArray(check)){
            sections = this.state.sections.split(',');
        } else {
            this.state.sections && this.state.sections.map(element => {
                sections.push(element.value)
            })
        }

        client.post(`Bookings/Update.php`, {
            SCHEDULE_ID: this.state.originalEvent.SCHEDULE_ID,
            SECTIONS: sections,
            BOOKING_ID: this.state.originalEvent.BOOKING_ID,
            BOOKING_TITLE: this.state.title,
            DETAILS: this.state.details
        })
        this.setState({
            edit: 'false'
        })

        this.handleClose();

        let newEvent = {
            SCHEDULE_ID: this.state.originalEvent.SCHEDULE_ID,
            SECTIONS: {records: [{
                COURSE_ID: this.state.course
            }]},
            SECTION_ID: sections,
            ROOM_ID: this.state.room,
            START_TIME: this.state.start,
            END_TIME: this.state.end,
            BOOKING_TITLE: this.state.title,
            DETAILS: this.state.details,
            BOOKING_ID: this.state.originalEvent.BOOKING_ID
        }

        this.props.spliceEvent(newEvent);
    }

  render(){
    const { classes, event, onClose, mine, past } = this.props;
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
              
              <Typography variant="headline" component="h2">
                {event && event.BOOKING_TITLE}
              </Typography>
              <Typography className={classes.content}>Course: {(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}</Typography>
              <Typography className={classes.content}>In Room {event && event.ROOM_ID}</Typography>
              <Typography className={classes.content} component="p">
                On {event && moment(event.START_TIME).format('MMMM Do YYYY')}
              </Typography>
              <Typography className={classes.content} component="p">
                From {event && moment(event.START_TIME).format('h:mm a')} - 
                {event && moment(event.END_TIME).format('h:mm a')}
              </Typography>
              <Typography className={classes.content} component="p">
                Details: {event && event.DETAILS}
              </Typography>
              <div hidden={!mine}>
              <Tooltip title="Edit" hidden={past}>
              <IconButton hidden={past} variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.selectEdit}>
                <Icon>edit_icon</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy Event">
              <IconButton variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.handleDuplicate}>
                <Icon>queue_icon</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" hidden={past}>
              <IconButton hidden={past} variant="fab" color="secondary" aria-label="edit" className={classes.button} onClick={this.handleDelete}>
                <Icon>delete_forever_icon</Icon>
              </IconButton>
            </Tooltip>
            </div>
            </CardContent>
            <CardContent className={this.state.edit ? '' : classes.hidden}>
                <Typography variant="headline" component="h2" align='center' >Edit Event</Typography>
                <InputLabel className={classes.content} htmlFor="course-helper">Title:</InputLabel>
                    <input
                        style={{height: '36px', width: '98%', borderRadius: "4px", border: '1px solid #ccc', position: 'relative', paddingLeft: '10px'}}
                        id="title"
                        onBlur={this.handleBlur}
                        maxLength={50}
                        defaultValue={event && event.BOOKING_TITLE}
                        className={classes.content}
                    >
                    </input>
              
              <div className={classes.control}>
                    <InputLabel htmlFor="section-helper" className={classes.content}>Select Room:</InputLabel>
                    <Select
                        className={classes.Select}
                        onChange={this.handleRoomChange}
                        closeOnSelect
                        options={this.props.roomList && this.props.roomList.map( row => 
                            row = {label: row.ROOM_ID, value: row.ROOM_ID}
                        )}
                        value={this.state.room}
                        optionComponent={Option}
                        value={event && event.ROOM_ID}
                        clearable={false}
                    />
                </div>
              
                <div className={classes.control}  style={{zIndex: 100}}>
                    <InputLabel className={classes.content} htmlFor="course-helper">Select Course:</InputLabel>
                    <Select
                        className={classes.Select}
                        onChange={this.handleCourseChange}
                        options={this.props.courseList && this.props.courseList.map( row => 
                            row = {label: row.COURSE_ID, value: row.COURSE_ID}
                        )}
                        value={this.state.course}
                        value={(event && event.SECTIONS && event.SECTIONS.records.length > 0)? event.SECTIONS.records[0].COURSE_ID: 'None'}
                        optionComponent={Option}
                        clearable={false}
                    />
                </div>
                <div className={classes.control}>
                    <InputLabel htmlFor="select-multiple" className={classes.content}>Select Section(s):</InputLabel>
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
                <div>
                <InputLabel htmlFor="select-multiple" className={classes.content}>Date:</InputLabel>
                <DatePicker 
                    dialogContainerStyle={{alignContent: 'center'}}
                    id="date"
                    style={{height: '36px', width: '98%', borderRadius: "4px", border: '1px solid #ccc', position: 'relative', paddingLeft: '10px'}}
                    InputProps={{disableUnderline: true }}
                    value={this.state.date}
                    placeholder="select a date"
                    onChange={this.handleChangeDate}
                    className={classes.content}
                />
                <InputLabel>Start Time:</InputLabel>
                <TimePicker
                    id="start"
                    style={{height: '36px', width: '98%', borderRadius: "4px", border: '1px solid #ccc', position: 'relative', paddingLeft: '10px'}}
                    InputProps={{disableUnderline: true }}
                    value={this.state.start}
                    onChange={this.handleChangeStart}
                    disabled={this.state.date == null}
                    className={classes.content}
                    
                />
                <InputLabel>End Time:</InputLabel>
                <TimePicker
                    id="end"
                    style={{height: '36px', width: '98%', borderRadius: "4px", border: '1px solid #ccc', position: 'relative', paddingLeft: '10px'}}
                    InputProps={{disableUnderline: true }}
                    value={this.state.end}
                    onChange={this.handleChangeEnd}
                    disabled={this.state.date == null}
                    className={classes.content}
                />
              
              </div>
              <InputLabel  htmlFor="select-multiple" className={classes.content}>Details:</InputLabel>
              <textarea
                    id="details"
                    onChange={this.handleBlur}
                    defaultValue={event && event.DETAILS}
                    maxLength={250}
                    style={{height: '60px', width: '97%', borderRadius: "4px", border: '1px solid #ccc', position: 'relative', paddingLeft: '10px'}}
                    >
                </textarea>         
       
               
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