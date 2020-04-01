import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import moment from 'vue-moment';
import './vee-validate';

const VueTruncate = require('vue-truncate-filter');
require('typeface-nunito-sans');

Vue.use(moment);
Vue.use(VueTruncate);

const app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
