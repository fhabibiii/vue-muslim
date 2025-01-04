//import createApp from Vue
import { createApp } from 'vue';

//import component App
import App from './App.vue';

//import config router
import routes from './routes'

//import iziToast styles
import 'izitoast/dist/css/iziToast.min.css';

//create App Vue
const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(routes);

app.mount('#app');