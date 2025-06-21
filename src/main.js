import { createApp } from 'vue';
import '@/assets/styles/style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router/router.js';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount('#app');
