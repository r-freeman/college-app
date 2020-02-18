import Vue from 'vue';
import App from './App';

require('./bootstrap');

// import BootstrapVue and IconsPlugin
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

// Install BootstrapVue and IconsPlugin
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const app = new Vue({
    render: h => h(App),
}).$mount('#app');
