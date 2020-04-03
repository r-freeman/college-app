import * as types from "../mutation-types";
import * as strings from "@/strings";
import _ from "lodash";
import {api} from "@/api";

export default {
    namespaced: true,
    state: {
        lecturer: {},
        _lecturer: {},
        name: "",
        address: "",
        email: "",
        phone: "",
        lecturers: [],
        addLecturerModal: false,
        editLecturerModal: false,
        deleteLecturerModal: false,
        loading: false
    },
    getters: {
        lecturer: state => {
            return state.lecturer;
        },
        lecturers: state => {
            return _.orderBy(state.lecturers, ['name']);
        },
        addLecturerModal: state => {
            return state.addLecturerModal;
        },
        editLecturerModal: state => {
            return state.editLecturerModal;
        },
        deleteLecturerModal: state => {
            return state.deleteLecturerModal;
        },
        isLoading: state => {
            return state.loading;
        }
    },
    mutations: {
        [types.FETCH_LECTURER](state, payload) {
            state.lecturer = payload;
        },
        [types.FETCH_LECTURERS](state) {
            state.loading = true;
        },
        [types.FETCH_LECTURERS_SUCCESS](state, payload) {
            state.lecturers = payload;
            state.loading = false;
        },
        [types.FETCH_LECTURERS_FAILURE](state) {
            state.lecturers = [];
            state.loading = false;
        },
        [types.TOGGLE_ADD_LECTURER_MODAL](state) {
            state.addLecturerModal = !state.addLecturerModal;

            if (!state.addLecturerModal) {
                // reset form if add lecturer was cancelled
                state.name = state.address = state.email = state.phone = "";
            }
        },
        [types.ADD_LECTURER_SUCCESS](state, payload) {
            // add new lecturer to lecturers
            state.lecturers.push(payload);
        },
        [types.ADD_LECTURER_FAILURE](state) {
            state.lecturer = {};
        },
        [types.TOGGLE_EDIT_LECTURER_MODAL](state) {
            state.editLecturerModal = !state.editLecturerModal;

            if (state.editLecturerModal) {
                // make a copy of the lecturer
                state._lecturer = _.clone(state.lecturer);
            }
        },
        [types.EDIT_LECTURER_SUCCESS](state) {
            // replace the original course with the updated course
            _.assign(state.lecturer, state._lecturer);
        },
        [types.EDIT_LECTURER_FAILURE](state) {
            state._lecturer = {};
        },
        [types.SET_LECTURER_NAME](state, payload) {
            state.name = payload;
        },
        [types.SET_LECTURER_ADDRESS](state, payload) {
            state.address = payload;
        },
        [types.SET_LECTURER_EMAIL](state, payload) {
            state.email = payload;
        },
        [types.SET_LECTURER_PHONE](state, payload) {
            state.phone = payload;
        },
        [types.EDIT_LECTURER_NAME](state, payload) {
            state._lecturer.name = payload;
        },
        [types.EDIT_LECTURER_ADDRESS](state, payload) {
            state._lecturer.address = payload;
        },
        [types.EDIT_LECTURER_EMAIL](state, payload) {
            state._lecturer.email = payload;
        },
        [types.EDIT_LECTURER_PHONE](state, payload) {
            state._lecturer.phone = payload;
        },
        [types.TOGGLE_DELETE_LECTURER_MODAL](state) {
            state.deleteLecturerModal = !state.deleteLecturerModal;
        },
        [types.DELETE_LECTURER_SUCCESS](state, payload) {
            state.lecturers.splice(state.lecturers.findIndex(lecturer => lecturer.id === payload), 1);
            state.deleteLecturerModal = false;
        },
        [types.DELETE_LECTURER_FAILURE](state) {
            state.deleteLecturerModal = false;
        }
    },
    actions: {
        fetchLecturer({commit, state}, id) {
            // find the lecturer in lecturers with a given id
            commit(types.FETCH_LECTURER, state.lecturers.find(lecturer => lecturer.id === id));
        },
        async fetchLecturers({commit, dispatch}) {
            commit(types.FETCH_LECTURERS);

            try {
                const response = await api.get('lecturers');
                commit(types.FETCH_LECTURERS_SUCCESS, response.data.data);
            } catch (e) {
                commit(types.FETCH_LECTURERS_FAILURE);

                dispatch('notifications/createNotification',
                    {
                        status: strings.ERROR.toLowerCase(),
                        title: strings.ERROR,
                        message: strings.LECTURERS_RETRIEVE_FAILED
                    },
                    {root: true}
                );
            }
        },
        toggleAddLecturerModal({commit}) {
            commit(types.TOGGLE_ADD_LECTURER_MODAL);
        },
        async addLecturer({commit, state, dispatch}) {
            try {
                const {name, address, email, phone} = state;
                const response = await api.post('lecturers',
                    {
                        name,
                        address,
                        email,
                        phone
                    }
                );
                commit(types.ADD_LECTURER_SUCCESS, response.data.data);

                dispatch('notifications/createNotification',
                    {
                        status: strings.SUCCESS.toLowerCase(),
                        title: strings.SUCCESS,
                        message: strings.LECTURER_ADDED
                    },
                    {root: true}
                );
            } catch (e) {
                commit(types.ADD_LECTURER_FAILURE);

                dispatch('notifications/createNotification',
                    {
                        status: strings.ERROR.toLowerCase(),
                        title: strings.ERROR,
                        message: strings.LECTURER_ADD_FAILED
                    },
                    {root: true}
                );
            }

            dispatch('toggleAddLecturerModal');
        },
        toggleEditLecturerModal({commit}) {
            commit(types.TOGGLE_EDIT_LECTURER_MODAL);
        },
        editLecturer({commit, state, dispatch}) {
            // commit(types.EDIT_LECTURER);

            // const {title, code, description, points, level} = state._course;

            // dispatch('toggleEditLecturerModal');

            // TODO: refactor code here to make put request to api with updated lecturer.
            //  If api responds with status 200, commit edit lecturer mutation with the response data
            //  containing the updated lecturer. Do the same for adding and deleting lecturers.
        },
        toggleDeleteLecturerModal({commit}) {
            commit(types.TOGGLE_DELETE_LECTURER_MODAL);
        },
        async deleteLecturer({commit, dispatch}, id) {
            try {
                await api.delete(`lecturers/${id}`);
                commit(types.DELETE_LECTURER_SUCCESS, id);
                dispatch('notifications/createNotification',
                    {
                        status: strings.SUCCESS.toLowerCase(),
                        title: strings.SUCCESS,
                        message: strings.LECTURER_DELETED
                    },
                    {root: true}
                );
            } catch (e) {
                commit(types.DELETE_LECTURER_FAILURE);
                dispatch('notifications/createNotification',
                    {
                        status: strings.ERROR.toLowerCase(),
                        title: strings.ERROR,
                        message: strings.LECTURER_DELETE_FAILED
                    },
                    {root: true}
                );
            }
        }
    }
}
