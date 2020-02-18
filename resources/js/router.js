import Vue from 'vue';
import VueRouter from 'vue-router';

import Courses from './views/Courses';
import Enrolments from './views/Enrolments';
import Lecturers from './views/Lecturers';

import Login from './views/Login';
import Register from './views/Register';

const routes = [
    {
        path: '/courses',
        name: 'courses',
        component: Courses,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/enrolments',
        name: 'enrolments',
        component: Enrolments,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/lecturers',
        name: 'lecturers',
        component: Lecturers,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
];

const router = new VueRouter({
    history: true,
    base: null,
    routes: routes
});

// replace this later
const auth = {
    loggedIn: () => {
        return true
    }
};

// navigation guard for protected routes
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

Vue.use(VueRouter);

export default router;