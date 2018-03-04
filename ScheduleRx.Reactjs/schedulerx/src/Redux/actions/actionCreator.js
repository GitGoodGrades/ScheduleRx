import axios from 'axios';
import {client} from '../../configuration/client';

export function searchSchedules() {
    let scheduleList = [];
    let currentSchedule = {};
    let registrationSchedule = {};
    return (dispatch) =>
    client.get(`Schedule/Index.php`)
    .then(res => {    
        scheduleList = res.data.records
        }
    )

    for(let obj of scheduleList){
        if(!obj.IS_RELEASED && !obj.IS_ARCHIVED){
            registrationSchedule = obj;
        } else if (obj.IS_RELEASED && !obj.IS_ARCHIVED){
            currentSchedule = obj;
        }
    }
    
    dispatch({
        type: 'SEARCH_SCHEDULE',
        current: currentSchedule,
        registration: registrationSchedule
    })
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

export function logout() {
    return (dispatch) =>
        dispatch({
            type: 'REMOVE_USER'
        });
}

