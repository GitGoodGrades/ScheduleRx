import axios from 'axios';


export function setUser(value) {
  return (dispatch) => axios.get(`https://api.github.com/users/${value}/repos`)
    .then(resp => {
      dispatch({
        type: 'UPDATE_USER',
        data: resp.data
      });
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

