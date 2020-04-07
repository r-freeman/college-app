import * as types from "../mutation-types";
import * as strings from "@/strings";
import {api} from "@/api";
import _ from "lodash";

export default {
    namespaced: true,
    state: {
        enrolment: {},
        _enrolment: {},
        date: null,
        time: null,
        status: "",
        course_id: null,
        lecturer_id: null,
        enrolments: [],
        addEnrolmentModal: false,
        editEnrolmentModal: false,
        deleteEnrolmentModal: false,
        loading: false
    },
    getters: {
        enrolment: state => {
            return state.enrolment;
        },
        enrolments: state => {
            return _.orderBy(state.enrolments, ['date'], 'desc');
        },
        addEnrolmentModal: state => {
            return state.addEnrolmentModal;
        },
        editEnrolmentModal: state => {
            return state.editEnrolmentModal;
        },
        deleteEnrolmentModal: state => {
            return state.deleteEnrolmentModal;
        },
        isLoading: state => {
            return state.loading;
        }
    },
    mutations: {
        [types.FETCH_ENROLMENT](state, payload) {
            state.enrolment = payload;
        },
        [types.FETCH_ENROLMENTS](state) {
            state.loading = true;
        },
        [types.FETCH_ENROLMENTS_SUCCESS](state, payload) {
            state.enrolments = payload;
            state.loading = false;
        },
        [types.FETCH_ENROLMENTS_FAILURE](state) {
            state.enrolments = [];
            state.loading = false;
        },
        [types.TOGGLE_ADD_ENROLMENT_MODAL](state) {
            state.addEnrolmentModal = !state.addEnrolmentModal;

            if (!state.addEnrolmentModal) {
                // reset form if add enrolment was cancelled
                state.date = state.time = state.course_id = state.lecturer_id = null;
                state.status = "";
            }
        },
        [types.ADD_ENROLMENT_SUCCESS](state, payload) {
            // add new enrolment to enrolments
            state.enrolments.push(payload);
        },
        [types.ADD_ENROLMENT_FAILURE](state) {
            state.enrolment = {};
        },
        [types.TOGGLE_EDIT_ENROLMENT_MODAL](state) {
            state.editEnrolmentModal = !state.editEnrolmentModal;

            if (state.editEnrolmentModal) {
                // make a copy of the enrolment
                state._enrolment = _.clone(state.enrolment);
            }
        },
        [types.EDIT_ENROLMENT_SUCCESS](state, payload) {
            // replace the original enrolment with updated enrolment
            _.assign(state.enrolment, payload);
        },
        [types.EDIT_ENROLMENT_FAILURE](state) {
            state._enrolment = {};
        },
        [types.SET_DATE](state, payload) {
            state.date = payload;
        },
        [types.SET_TIME](state, payload) {
            state.time = payload;
        },
        [types.SET_STATUS](state, payload) {
            state.status = payload;
        },
        [types.SET_COURSE_ID](state, payload) {
            state.course_id = payload
        },
        [types.SET_LECTURER_ID](state, payload) {
            state.lecturer_id = payload;
        },
        [types.EDIT_ENROLMENT_DATE](state, payload) {
            state._enrolment.date = payload;
        },
        [types.EDIT_ENROLMENT_TIME](state, payload) {
            state._enrolment.time = payload;
        },
        [types.EDIT_ENROLMENT_STATUS](state, payload) {
            state._enrolment.status = payload;
        },
        [types.EDIT_ENROLMENT_COURSE_ID](state, payload) {
            state._enrolment.course_id = payload;
        },
        [types.EDIT_ENROLMENT_LECTURER_ID](state, payload) {
            state._enrolment.lecturer_id = payload;
        },
        [types.TOGGLE_DELETE_ENROLMENT_MODAL](state) {
            state.deleteEnrolmentModal = !state.deleteEnrolmentModal;
        },
        [types.DELETE_ENROLMENT_SUCCESS](state, payload) {
            state.enrolments.splice(state.enrolments.findIndex(enrolment => enrolment.id === payload), 1);
            state.deleteEnrolmentModal = false;
        },
        [types.DELETE_ENROLMENT_FAILURE](state) {
            state.deleteEnrolmentModal = false;
        }
    },
    actions: {
        fetchEnrolment({commit, state}, id) {
            // find the enrolment in enrolments with a given id
            commit(types.FETCH_ENROLMENT, state.enrolments.find(enrolment => enrolment.id === id));
        },
        async fetchEnrolments({commit, dispatch}) {
            commit(types.FETCH_ENROLMENTS);

            try {
                const response = await api.get('enrolments');
                commit(types.FETCH_ENROLMENTS_SUCCESS, response.data.data);
            } catch (e) {
                commit(types.FETCH_ENROLMENTS_FAILURE);

                dispatch('notifications/createNotification',
                    {
                        status: strings.ERROR.toLowerCase(),
                        title: strings.ERROR,
                        message: strings.ENROLMENTS_RETRIEVE_FAILED
                    },
                    {root: true}
                );
            }
        },
        toggleAddEnrolmentModal({commit}) {
            commit(types.TOGGLE_ADD_ENROLMENT_MODAL);
        },
        async addEnrolment({commit, state, dispatch, rootState}) {
            try {
                const {date, time, status, course_id, lecturer_id} = state;
                const response = await api.post('enrolments',
                    {
                        date,
                        time,
                        status,
                        course_id,
                        lecturer_id
                    }
                );

                const enrolment = response.data.data;

                // add the course and lecturer to the enrolment
                // need to display course.title and lecturer.name in template
                enrolment.course =
                    rootState.courses.courses.find(course => course.id === course_id);
                enrolment.lecturer =
                    rootState.lecturers.lecturers.find(lecturer => lecturer.id === lecturer_id);

                commit(types.ADD_ENROLMENT_SUCCESS, enrolment);

                dispatch('notifications/createNotification',
                    {
                        status: strings.SUCCESS.toLowerCase(),
                        title: strings.SUCCESS,
                        message: strings.ENROLMENT_ADDED
                    },
                    {root: true}
                );


            } catch (e) {
                commit(types.ADD_ENROLMENT_FAILURE);

                dispatch('notifications/createNotification',
                    {
                        status: strings.ERROR.toLowerCase(),
                        title: strings.ERROR,
                        message: e.response.status === 422 ? strings.ENROLLED_ERROR : strings.ENROLMENT_UPDATE_FAILED
                    },
                    {root: true}
                );
            }

            dispatch('toggleAddEnrolmentModal');
        },
        toggleEditEnrolmentModal({commit}) {
            commit(types.TOGGLE_EDIT_ENROLMENT_MODAL);
        },
        async editEnrolment({commit, state, dispatch, rootState}) {
            try {
                const {id, date, time, status, course_id, lecturer_id} = state._enrolment;
                const response = await api.put(`enrolments/${id}`,
                    {
                        date,
                        time,
                        status,
                        course_id,
                        lecturer_id
                    }
                );

                const enrolment = response.data.data;
                enrolment.course =
                    rootState.courses.courses.find(course => course.id === enrolment.course_id);
                enrolment.lecturer =
                    rootState.lecturers.lecturers.find(lecturer => lecturer.id === enrolment.lecturer_id);

                commit(types.EDIT_ENROLMENT_SUCCESS, enrolment);
                dispatch('notifications/createNotification',
                    {
                        status: strings.SUCCESS.toLowerCase(),
                        title: strings.SUCCESS,
                        message: strings.ENROLMENT_UPDATED
                    },
                    {root: true}
                );

                // refresh courses and lecturers when enrolment is updated
                dispatch('courses/fetchCourses', null, {root: true});
                dispatch('lecturers/fetchLecturers', null, {root: true});
            } catch (e) {
                commit(types.EDIT_ENROLMENT_FAILURE);
                dispatch('notifications/createNotification',
                    {
                        status: strings.ERROR.toLowerCase(),
                        title: strings.ERROR,
                        message: e.response.status === 422 ? strings.ENROLLED_ERROR : strings.ENROLMENT_UPDATE_FAILED
                    },
                    {root: true}
                );
            }

            dispatch('toggleEditEnrolmentModal');
        },
        toggleDeleteEnrolmentModal({commit}) {
            commit(types.TOGGLE_DELETE_ENROLMENT_MODAL);
        },
        async deleteEnrolment({commit, dispatch}, {id, withNotification = true}) {
            try {
                await api.delete(`enrolments/${id}`);
                commit(types.DELETE_ENROLMENT_SUCCESS, id);
                if (withNotification) {
                    dispatch('notifications/createNotification',
                        {
                            status: strings.SUCCESS.toLowerCase(),
                            title: strings.SUCCESS,
                            message: strings.ENROLMENT_DELETED
                        },
                        {root: true}
                    );

                    // refresh courses and lecturers when enrolment is deleted
                    dispatch('courses/fetchCourses', null, {root: true});
                    dispatch('lecturers/fetchLecturers', null, {root: true});
                }
            } catch (e) {
                commit(types.DELETE_ENROLMENT_FAILURE);
                if (withNotification) {
                    dispatch('notifications/createNotification',
                        {
                            status: strings.ERROR.toLowerCase(),
                            title: strings.ERROR,
                            message: strings.ENROLMENT_DELETE_FAILED
                        },
                        {root: true}
                    );
                }
            }
        }
    }
}
