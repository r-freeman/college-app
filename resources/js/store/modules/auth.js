import * as types from "../mutation-types";
import authService from "@/services/auth";

export default {
    namespaced: true,
    state: {
        user: {},
        token: "",
        name: "",
        email: "",
        password: "",
        confirm: "",
        isLoggingIn: false,
        loginAttempts: 0,
        isRegistering: false
    },
    getters: {
        user: state => {
            return state.user;
        },
        isLoggedIn: state => {
            return !!state.token;
        },
        isLoggingIn: state => {
            return state.isLoggingIn;
        },
        isRegistering: state => {
            return state.isRegistering;
        }
    },
    mutations: {
        [types.SET_NAME](state, payload) {
            state.name = payload;
        },
        [types.SET_EMAIL](state, payload) {
            state.email = payload;
        },
        [types.SET_PASSWORD](state, payload) {
            state.password = payload;
        },
        [types.SET_CONFIRM](state, payload) {
            state.confirm = payload;
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
        },
        [types.ATTEMPT_REGISTER](state) {
            state.isRegistering = true;
        },
        [types.REGISTER_SUCCESS](state, payload) {
            state.name = state.email = state.password = "";
            state.user = payload;
            state.isRegistering = false;
        },
        [types.REGISTER_FAILURE](state) {
            state.isRegistering = false;
        },
        [types.RESET_REGISTER](state) {
            state.name = state.email = state.password = "";
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
        register({commit, state, dispatch}) {
            return new Promise((resolve, reject) => {
                commit(types.ATTEMPT_REGISTER);

                authService.register({
                    "name": state.name,
                    "email": state.email,
                    "password": state.password
                })
                    .then(user => {
                        commit(types.REGISTER_SUCCESS, user);
                        dispatch('setToken');
                        resolve(user);
                    }).catch(e => {
                    commit(types.REGISTER_FAILURE);
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
