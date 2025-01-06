import { createApp } from 'vue';
import App from './App.vue';
import routes from './routes';
import 'izitoast/dist/css/iziToast.min.css';
import './style.css'; // Pastikan style.css diimpor di sini

const app = createApp(App);
app.use(routes);
app.mount('#app');