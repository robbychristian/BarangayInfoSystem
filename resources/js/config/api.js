import axios from "axios";

export const DEV_URL = "http://127.0.0.1:8000/api/";
// export const DEV_URL = "http://192.168.254.190:8000/api/";

export const api = axios.create({
    baseURL: DEV_URL,
});

api.defaults.timeout = 60000;
