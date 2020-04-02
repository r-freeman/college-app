import * as types from "../mutation-types";
import _ from "lodash";
import {api} from "@/api";

export default {
    namespaced: true,
    state: {
        course: {},
        _course: {},
        courses: [],
        title: "",
        code: "",
        description: "",
        points: null,
        level: null,
        addCourseModal: false,
        editCourseModal: false,
        deleteCourseModal: false,
        loading: false
    },
    getters: {
        course: state => {
            return state.course;
        },
        courses: state => {
            return _.orderBy(state.courses, ['title']);
        },
        addCourseModal: state => {
            return state.addCourseModal;
        },
        editCourseModal: state => {
            return state.editCourseModal;
        },
        deleteCourseModal: state => {
            return state.deleteCourseModal;
        }
    },
    mutations: {
        [types.FETCH_COURSE](state, payload) {
            state.course = payload;
        },
        [types.FETCH_COURSES](state) {
            state.loading = true;
        },
        [types.FETCH_COURSES_SUCCESS](state, payload) {
            state.courses = payload;
            state.loading = false;
        },
        [types.FETCH_COURSES_FAILURE](state) {
            state.courses = [];
            state.loading = false;
        },
        [types.TOGGLE_ADD_COURSE_MODAL](state) {
            state.addCourseModal = !state.addCourseModal;

            if (!state.addCourseModal) {
                // reset form if add course was cancelled
                state.title = state.code = state.description = "";
                state.points = state.level = null;
            }
        },
        [types.ADD_COURSE_SUCCESS](state, payload) {
            // add new course to courses
            state.courses.push(payload);
        },
        [types.ADD_COURSE_FAILURE](state) {
            state.course = {};
        },
        [types.TOGGLE_EDIT_COURSE_MODAL](state) {
            state.editCourseModal = !state.editCourseModal;

            if (state.editCourseModal) {
                // make a copy of the course
                state._course = _.clone(state.course);
            } else {
                state._course = {};
            }
        },
        [types.EDIT_COURSE](state) {
            // replace the original course with the updated course
            _.assign(state.course, state._course);
        },
        [types.SET_TITLE](state, payload) {
            state.title = payload;
        },
        [types.SET_CODE](state, payload) {
            state.code = payload;
        },
        [types.SET_DESCRIPTION](state, payload) {
            state.description = payload;
        },
        [types.SET_POINTS](state, payload) {
            state.points = payload
        },
        [types.SET_LEVEL](state, payload) {
            state.level = payload;
        },
        [types.EDIT_COURSE_TITLE](state, payload) {
            state._course.title = payload;
        },
        [types.EDIT_COURSE_CODE](state, payload) {
            state._course.code = payload;
        },
        [types.EDIT_COURSE_DESCRIPTION](state, payload) {
            state._course.description = payload;
        },
        [types.EDIT_COURSE_POINTS](state, payload) {
            state._course.points = payload;
        },
        [types.EDIT_COURSE_LEVEL](state, payload) {
            state._course.level = payload;
        },
        [types.TOGGLE_DELETE_COURSE_MODAL](state) {
            state.deleteCourseModal = !state.deleteCourseModal;
        },
        [types.DELETE_COURSE_SUCCESS](state, payload) {
            state.courses.splice(state.courses.findIndex(course => course.id === payload), 1);
            state.deleteCourseModal = false;
        },
        [types.DELETE_COURSE_FAILURE](state) {
            state.deleteCourseModal = false;
        }
    },
    actions: {
        fetchCourse({commit, state}, id) {
            // find the course in courses with a given id
            commit(types.FETCH_COURSE, state.courses.find(course => course.id === id));
        },
        async fetchCourses({commit, dispatch}) {
            commit(types.FETCH_COURSES);

            try {
                const response = await api.get('courses');
                commit(types.FETCH_COURSES_SUCCESS, response.data.data);
            } catch (e) {
                commit(types.FETCH_COURSES_FAILURE);

                dispatch('notifications/createNotification',
                    {
                        status: 'error',
                        title: 'Error',
                        message: 'Could not retrieve courses.'
                    },
                    {root: true}
                );
            }
        },
        toggleAddCourseModal({commit}) {
            commit(types.TOGGLE_ADD_COURSE_MODAL);
        },
        async addCourse({commit, state, dispatch}) {
            try {
                const response = await api.post('courses', {
                    "title": state.title,
                    "code": state.code,
                    "description": state.description,
                    "points": state.points,
                    "level": state.level
                });
                commit(types.ADD_COURSE_SUCCESS, response.data.data);

                dispatch('notifications/createNotification',
                    {
                        status: 'success',
                        title: 'Success',
                        message: 'Course was added successfully.'
                    },
                    {root: true}
                );
            } catch (e) {
                commit(types.ADD_COURSE_FAILURE);

                dispatch('notifications/createNotification',
                    {
                        status: 'error',
                        title: 'Error',
                        message: 'Failed to add course.'
                    },
                    {root: true}
                );
            }

            dispatch('toggleAddCourseModal');
        },
        toggleEditCourseModal({commit}) {
            commit(types.TOGGLE_EDIT_COURSE_MODAL);
        },
        editCourse({commit, dispatch}) {
            commit(types.EDIT_COURSE);

            // const {title, code, description, points, level} = state._course;

            dispatch('toggleEditCourseModal');

            // TODO: refactor code here to make put request to api with updated course.
            //  If api responds with status 200, commit edit course mutation with the response data
            //  containing the updated course. Do the same for adding and deleting courses.
        },
        toggleDeleteCourseModal({commit}) {
            commit(types.TOGGLE_DELETE_COURSE_MODAL);
        },
        async deleteCourse({commit, dispatch}, id) {
            try {
                await api.delete(`courses/${id}`);
                commit(types.DELETE_COURSE_SUCCESS, id);
                dispatch('notifications/createNotification',
                    {
                        type: 'success',
                        title: 'Success',
                        message: 'Course was deleted successfully'
                    },
                    {root: true}
                );
            } catch (e) {
                commit(types.DELETE_COURSE_FAILURE);
                dispatch('notifications/createNotification',
                    {
                        type: 'error',
                        title: 'Error',
                        message: 'Failed to delete course.'
                    },
                    {root: true}
                );
            }
        }
    }
}
