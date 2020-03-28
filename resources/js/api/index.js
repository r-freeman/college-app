import axios from "axios"
import router from "@/router";

const BASE_URL = 'http://localhost:8000/api/';
const UNAUTHORISED = 401;

// define and export an axios client
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if (status === UNAUTHORISED) {
            router.push('/login').catch(err => {
            });
        }
        return Promise.reject(error);
    }
);

export const setAuthHeader = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeHeaders = () => {
    api.defaults.headers.common = {};
};
