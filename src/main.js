import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import './assets/tailwind.css'

import App from './App.vue'
import RepairsMain from "@/components/Repairs/RepairsMain";
import DashboardMain from "@/components/Dashboard/DashboardMain";
import ClientsMain from "@/components/Clients/ClientsMain";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: DashboardMain },
        { path: '/repairs', component: RepairsMain },
        { path: '/clients', component: ClientsMain },
        ]
});

const app = createApp(App);

app.use(router);

app.mount('#app');
