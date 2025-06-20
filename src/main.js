import { createApp } from 'vue';
import '@/assets/styles/style.css';
import App from './App.vue';
import router from '@/router/router.js';

const app = createApp(App);

app.use(router).mount('#app');
