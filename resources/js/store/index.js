import Vue from 'vue';
import Vuex from 'vuex';
import auth from "./modules/auth";
import notifications from "./modules/notifications";
import courses from "./modules/courses";
import lecturers from "./modules/lecturers";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        notifications,
        courses,
        lecturers
    }
});
