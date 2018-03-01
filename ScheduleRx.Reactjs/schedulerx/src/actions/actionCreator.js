import axios from 'axios';


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

