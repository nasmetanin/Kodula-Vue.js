import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';
import i18n from './i18n'


const app = createApp(App).use(i18n).use(router).use(VueCookies)
app.provide('baseURL', 'https://back.kodula.ee');
app.mount('#app')
