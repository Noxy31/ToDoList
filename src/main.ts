import './assets/main.css';
import { createState } from '../src/store/store';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.provide('state', createState());

app.mount('#app');
