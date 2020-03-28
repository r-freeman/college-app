import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import moment from 'vue-moment';
import './vee-validate';

require('typeface-nunito-sans');

Vue.use(moment);

const app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
