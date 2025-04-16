import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/DashboardView.vue')
    },
    {
        path: '/management',
        name: 'management',
        component: () => import('../views/UserManagementView.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
