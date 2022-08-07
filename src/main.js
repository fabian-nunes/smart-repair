import { createApp } from 'vue'
import './assets/tailwind.css'

import App from './App.vue'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import router from "@/router";
import store from './store/index';



const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueSweetalert2);

app.mount('#app');
