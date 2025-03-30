import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
