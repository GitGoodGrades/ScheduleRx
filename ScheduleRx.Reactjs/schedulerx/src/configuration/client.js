import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:63342/ScheduleRx/ScheduleRx.API/'
});