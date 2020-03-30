import axios from "axios"
import router from "@/router";

const UNAUTHORISED = 401;

let baseUrl,
    env = process.env.NODE_ENV;

if (env === 'development') {
    baseUrl = 'http://localhost:8000/api/'
} else if (env === 'production') {
    // baseUrl = example.com/api/
}

// define and export an axios client
export const api = axios.create({
    baseURL: baseUrl,
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
