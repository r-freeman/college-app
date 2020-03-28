import Vue from 'vue';
import VueRouter from 'vue-router';
import tokenService from "@/services/token";

import Home from "@/views/Home";
import Login from "@/views/auth/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    }
];

const router = new VueRouter({
    routes
});

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
