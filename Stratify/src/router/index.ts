import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
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
