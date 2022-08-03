import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import './assets/tailwind.css'

import App from './App.vue'
import RepairsMain from "@/components/Repairs/RepairsMain";
import DashboardMain from "@/components/Dashboard/DashboardMain";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: DashboardMain },
        { path: '/repairs', component: RepairsMain },
        ]
});

const app = createApp(App);

app.use(router);

app.mount('#app');
