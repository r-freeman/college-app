import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

require('typeface-nunito-sans');

const app = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
