import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2'; // https://sweetalert2.github.io/
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSweetalert2);
window.Swal = app.config.globalProperties.$swal

app.mount('#app_')