import axios from "axios"
import rateLimit from "axios-rate-limit";
import router from "@/router";

const UNAUTHORISED = 401;

let baseUrl,
    env = process.env.NODE_ENV;

if (env === 'development') {
    baseUrl = 'http://localhost:8000/api/'
} else {
    baseUrl = 'http://ancient-stream-40225.herokuapp.com/api/'
}

// create axios client with rate limiting
export const api = rateLimit(axios.create({
        baseURL: baseUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    // limit requests to 1 per second
    {
        maxRequests: 1,
        perMilliseconds: 1000
    }
);

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
