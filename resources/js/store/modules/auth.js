import * as types from "../mutation-types";
import authService from "@/services/auth";

export default {
    namespaced: true,
    state: {
        user: {},
        token: "",
        email: "",
        password: "",
        isLoggingIn: false,
        loginAttempts: 0
    },
    getters: {
        user: state => {
            return state.user;
        },
        email: state => {
            return state.email;
        },
        password: state => {
            return state.password;
        },
        isLoggedIn: state => {
            return !!state.token;
        },
        isLoggingIn: state => {
            return state.isLoggingIn;
        }
    },
    mutations: {
        [types.SET_EMAIL](state, payload) {
            state.email = payload;
        },
        [types.SET_PASSWORD](state, payload) {
            state.password = payload;
        },
        [types.RESET_LOGIN](state) {
            state.email = state.password = "";
        },
        [types.ATTEMPT_LOGIN](state) {
            state.loginAttempts++;
            state.isLoggingIn = true;
        },
        [types.LOGIN_SUCCESS](state, payload) {
            state.email = state.password = "";
            state.loginAttempts = 0;
            state.user = payload;
            state.isLoggingIn = false;
        },
        [types.LOGIN_FAILURE](state) {
            state.isLoggingIn = false;
        },
        [types.SET_TOKEN](state, payload) {
            state.token = payload;
        },
        [types.LOGOUT](state) {
            state.user = {};
            state.token = "";
        },
        [types.FETCH_USER_SUCCESS](state, payload) {
            state.user = payload;
        },
        [types.FETCH_USER_FAILURE](state) {
            state.user = {};
        }
    },
    actions: {
        login({commit, state, dispatch}) {
            return new Promise((resolve, reject) => {
                commit(types.ATTEMPT_LOGIN);

                authService.login({
                    "email": state.email,
                    "password": state.password
                })
                    .then(user => {
                        commit(types.LOGIN_SUCCESS, user);
                        dispatch('setToken');
                        resolve(user);
                    }).catch(e => {
                    commit(types.LOGIN_FAILURE);
                    reject(e);
                })
            })
        },
        setToken({commit, state}) {
            commit(types.SET_TOKEN, state.user.token);
        },
        async fetchUser({commit}) {
            try {
                await authService.user()
                    .then(user => {
                        commit(types.FETCH_USER_SUCCESS, user);
                    })
            } catch (e) {
                commit(types.FETCH_USER_FAILURE);
            }
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                authService.logout()
                    .then(response => {
                        commit(types.LOGOUT);
                        resolve(response);
                    }).catch(e => reject(e));
            })
        }
    }
}
