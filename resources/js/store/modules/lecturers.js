import * as types from "../mutation-types";
import * as strings from "../strings";
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
            return state.lecturers;
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
        addLecturer({commit, state, dispatch}) {
            // let lecturer = {
            //     id: Math.max.apply(null, state.lecturers.map(t => t.id)) + 1,
            //     name: state.name,
            //     address: state.address,
            //     email: state.email,
            //     phone: state.phone
            // };
            //
            // commit(types.ADD_LECTURER, lecturer);
            // dispatch('toggleAddLecturerModal');

            // TODO: api
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
        deleteLecturer({commit}, id) {
            // commit(types.DELETE_LECTURER, id);

            // TODO: api
        }
    }
}
