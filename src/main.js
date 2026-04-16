import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies';
import i18n from './i18n'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import VueLazyload from 'vue-lazyload'


const app = createApp(App).use(VueLazyload, {
    preLoad: 1.3,       // pre-load height ratio
    attempt: 2,         // retry attempts
    observer: true,     // use IntersectionObserver
    observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
    }
}).use(i18n).use(router).use(VueViewer).use(VueCookies)
app.provide('baseURL', 'https://back.kodula.ee');
app.mount('#app')
