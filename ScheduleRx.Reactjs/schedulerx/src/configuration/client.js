import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://10.32.44.157:8081/ScheduleRx.API/'
});