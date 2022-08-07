import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import './assets/tailwind.css'

import App from './App.vue'
import RepairsMain from "@/components/Repairs/RepairsMain";
import DashboardMain from "@/components/Dashboard/DashboardMain";
import ClientsMain from "@/components/Clients/ClientsMain";
import AuthMain from "@/components/Auth/AuthMain";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: DashboardMain },
        { path: '/repairs', component: RepairsMain },
        { path: '/clients', component: ClientsMain },
        { path: '/auth', component: AuthMain },
        ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 pointer-events-none',
});

const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);

app.mount('#app');
