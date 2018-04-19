import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://76.107.46.211:8081/ScheduleRx.API/'
});