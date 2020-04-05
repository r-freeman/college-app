import Vue from 'vue';
import VueRouter from 'vue-router';
import tokenService from "@/services/token";

import Home from "@/views/Home";
import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import Courses from "@/views/courses/Courses";
import Course from "@/views/courses/Course";
import Lecturers from "@/views/lecturers/Lecturers";
import Lecturer from "@/views/lecturers/Lecturer";
import Enrolments from "@/views/enrolments/Enrolments";
import Enrolment from "@/views/enrolments/Enrolment";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Dashboard',
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Sign in to your account',
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Create an account',
            requiresAuth: false
        }
    },
    {
        path: '/courses',
        name: 'courses',
        component: Courses,
        meta: {
            title: 'Courses',
            requiresAuth: true
        }
    },
    {
        path: '/courses/:id',
        name: 'viewCourse',
        component: Course,
        meta: {
            title: 'View Course',
            requiresAuth: true
        }
    },
    {
        path: '/lecturers',
        name: 'lecturers',
        component: Lecturers,
        meta: {
            title: 'Lecturers',
            requiresAuth: true
        }
    },
    {
        path: '/lecturers/:id',
        name: 'viewLecturer',
        component: Lecturer,
        meta: {
            title: 'View Lecturer',
            requiresAuth: true
        }
    },
    {
        path: '/enrolments',
        name: 'enrolments',
        component: Enrolments,
        meta: {
            title: 'Enrolments',
            requiresAuth: true
        }
    },
    {
        path: '/enrolments/:id',
        name: 'viewEnrolment',
        component: Enrolment,
        meta: {
            title: 'View Enrolment',
            requiresAuth: true
        }
    },
    {
        path: '*',
        component: NotFound,
        meta: {
            title: '404 Not Found',
            requiresAuth: false
        }
    }
];

const router = new VueRouter({
    routes
});

// fix for duplicate navigation error in console
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(e => e);
};

// navigation guard
router.beforeEach((to, from, next) => {
    // redirect to login if trying to access protected route
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = tokenService.getToken();
        if (!token) {
            next({
                path: '/login'
            })
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
