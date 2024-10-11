import { createApp } from 'vue';
import './assets/css/main.css';

import App from './App.vue';
import router from './router/index';

import VueCookies from 'vue-cookies';

const app = createApp(App);
app.use(VueCookies);
app.use(router);
app.mount('#app')

// createApp(App).mount('#app');
