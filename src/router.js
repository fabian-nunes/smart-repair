import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import DashboardMain from "@/components/Dashboard/DashboardMain";
import RepairsMain from "@/components/Repairs/RepairsMain";
import ClientsMain from "@/components/Clients/ClientsMain";
import AuthMain from "@/components/Auth/AuthMain";
import store from "@/store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: DashboardMain, meta: { requiresAuth: true } },
        { path: '/repairs', component: RepairsMain, meta: { requiresAuth: true } },
        { path: '/clients', component: ClientsMain, meta: { requiresAuth: true } },
        { path: '/auth', component: AuthMain, meta: { requiresUnauth: true } },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 pointer-events-none',
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['auth/getLoged']) {
            next({
                path: '/auth',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresUnauth)) {
        if (store.getters['auth/getLoged']) {
            next({
                path: '/',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});


export default router;