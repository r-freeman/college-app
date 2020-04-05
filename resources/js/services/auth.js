import tokenService from "./token";
import {api, setAuthHeader, removeHeaders} from "@/api";

export default {
    token() {
        return tokenService.getToken();
    },
    isLoggedIn() {
        return new Promise((resolve, reject) => {
            const token = this.token();
            // check if token is not an empty string
            if (token !== "") {
                // make sure token is valid
                setAuthHeader(token);
                this.user().then(user => {
                    resolve(user);
                }).catch(e => tokenService.deleteToken() && reject(e)); // delete invalid token
            } else {
                // token not set
                reject();
            }
        })
    },
    login(credentials) {
        return new Promise((resolve, reject) => {
            api.post('login', credentials)
                .then(response => {
                    if (response.status === 200) {
                        setAuthHeader(response.data.token);
                        tokenService.setToken(response.data.token);
                        resolve(response.data);
                    }
                }).catch(e => reject(e));
        })
    },
    register(credentials) {
        return new Promise((resolve, reject) => {
            api.post('register', credentials)
                .then(response => {
                    if (response.status === 200) {
                        setAuthHeader(response.data.token);
                        tokenService.setToken(response.data.token);
                        resolve(response.data);
                    }
                }).catch(e => reject(e));
        })
    },
    user() {
        return new Promise((resolve, reject) => {
            api.get('user')
                .then(response => {
                    if (response.status === 200) {
                        resolve(response.data.user);
                    }
                }).catch(e => reject(e));
        })
    },
    logout() {
        return new Promise((resolve, reject) => {
            api.get('logout')
                .then(response => {
                    if (response.status === 200) {
                        removeHeaders();
                        tokenService.deleteToken();
                        resolve(response);
                    }
                }).catch(e => reject(e));
        })
    }
}
