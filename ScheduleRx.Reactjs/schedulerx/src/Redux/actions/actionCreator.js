//import axios from 'axios';
import {client} from '../../configuration/client';
import { Lead, Faculty } from '../../configuration/variables';


function formatEvents(events){
    let formattedEvents = [];

    for(let obj of events){
      obj.START_TIME = new Date(obj.START_TIME);
      obj.END_TIME = new Date(obj.END_TIME);
      formattedEvents.push(obj);
    }

    return formattedEvents;
}

export function adminCalendar() {
    return (dispatch) =>
    client.get(`Bookings/Index.php`)
    .then(res => {
        const events = formatEvents(res.data);
        dispatch({
            type: 'ADMIN_CALENDAR',
            data: events
        })
    });
}

export function userCalendar(user, role) {
    let QUERY = null;
    return (dispatch) =>
    
    {if(role === Lead){
        QUERY = `Bookings/LeadIndex.php`;
    } else{
        QUERY = `Bookings/MyEvents.php`;
    }    
        client.post(QUERY,
            {
                USER_ID: user,
                ROLE_ID: role
            })
            .then(res => {
                const events = formatEvents(res.data);
                dispatch({
                    type: 'USER_CALENDAR',
                    data: events
                })
            });
    }
    
}

export function searchConflicts(start, end, room) {
    return (dispatch) =>
        client.post(`Bookings/Conflict.php`, {
            START_TIME:start,
            END_TIME:end,
            ROOM_ID:room
        })
            .then(res => {
                dispatch({
                    type: 'SEARCH_CONFLICTS',
                    data: res.data.records
                })
            });
}

export function searchSchedules() {
    let scheduleList = [];
    let currentSchedule = {};
    let registrationSchedule = {};
    return (dispatch) =>
    client.get(`Schedule/Index.php`)
    .then(res => {
        scheduleList = res.data.records

        for(let obj of scheduleList){
            if(obj.IS_RELEASED === "0" && obj.IS_ARCHIVED === "0"){
                registrationSchedule = obj;
            } else if (obj.IS_RELEASED === "1" && obj.IS_ARCHIVED === "0"){
                currentSchedule = obj;
            }
        }

        dispatch({
            type: 'SEARCH_SCHEDULES',
            current: currentSchedule,
            registration: registrationSchedule
        })    
    })
}

export function searchLeadsCourses(){
    return (dispatch) =>
        client.get(`LeadsCourse/Index.php`) //client.get(`bookings/LeadIndex.php`)
            .then(res => {
                dispatch({
                    type: 'SEARCH_LEADS_COURSES',
                    data: res.data.records
                })
            });
}

export function searchLeadCourses(user){
    return (dispatch) =>
        client.get(`LeadsCourse/Index.php`) //client.get(`bookings/LeadIndex.php`)
            .then(res => {
                let myCourses = [];
                const courses = res.data.records;
                for(let obj in courses){
                    if(courses[obj].USER_ID === user){
                        myCourses.push({COURSE_ID: courses[obj].COURSE_ID})
                    }
                }    

                dispatch({
                    type: 'SEARCH_LEAD_COURSES',
                    data: myCourses
                })
            });
}

export function searchSections() {
    return (dispatch) =>
    client.get(`Section/Index.php`)
    .then(res => {
        dispatch({
            type: 'SEARCH_SECTIONS',
            data: res.data.records
        })});
}

export function searchRooms() {
    return (dispatch) =>
    client.get(`Room/Index.php`)
    .then(res => {
        dispatch({
            type: 'SEARCH_ROOMS',
            data: res.data.records
        })});
}

export function searchCourses() {
    return (dispatch) =>
    client.get(`Courses/Index.php`)
    .then(res => {
        dispatch({
            type: 'SEARCH_COURSES',
            data: res.data.records
        })});
}

export function setUser(name, role, sem) {
  return (dispatch) =>
      dispatch({
        type: 'UPDATE_USER',
        name: name,
        role: role,
        semester: sem
      });
}

export function setEditGlobals(event) {
    let date = new Date(event.START_TIME);
    return (dispatch) =>
        dispatch({
            type: 'SET_EDIT',
            redirect_date: date,
            event: event
        });
}

export function clearEditGlobals() {
    return (dispatch) =>
        dispatch({
            type: 'CLEAR_EDIT'
        });
}

export function changeSchedules(registrationSchedule, currentSchedule) {
    return (dispatch) =>
        dispatch({
            type: 'UPDATE_SCHEDULE',
            current: currentSchedule,
            reg: registrationSchedule
        })
}

export function updateRegistration(registrationSchedule) {
    return (dispatch) =>
        dispatch({
            type: 'CHANGE_REGISTRATION',
            reg: registrationSchedule
        })
}

export function searchScheduleList(){
    return (dispatch) =>
        client.get(`Schedule/Index.php`)
        .then(res => {
        dispatch({
            type: 'SEARCH_SCHEDULE_LIST',
            data: res.data.records
        })
        });
}

export function searchUsers() {
    let userList = [];
    let facultyList = [];
    return (dispatch) =>
        client.get(`users/Index.php`)
            .then(res => {
                userList = res.data.records


                for(let obj of userList){
                    if(obj.ROLE_ID === Lead || obj.ROLE_ID === Faculty){
                        facultyList.push(obj);
                    }
                }

                dispatch({
                    type: 'SEARCH_USERS',
                    users: userList,
                    faculty: facultyList
                })    }
            )
}

export function getConflictList(){
    let conflicts = [];
    let formattedConflictList = [];
    return (dispatch) =>
        client.get(`Conflict/Index.php`)
            .then(res => {
                conflicts = res.data.records;
                if(!Array.isArray(conflicts)){
                    conflicts = null;
                }
                dispatch({
                    type: 'SEARCH_CONFLICT_LIST',
                    data: conflicts
                })    }
            )
}

export function logout() {
    return (dispatch) =>
        dispatch({
            type: 'REMOVE_USER'
        });
}
