import TokenService from '@/services/TokenService';
import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import { showToast } from '@/eventBus';

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
        path: '/profile',
        name: 'profile',
        component: () => import('../views/UserProfileView.vue')
    },
    {
        path: '/management',
        name: 'management',
        component: () => import('../views/UserManagementView.vue'),
        beforeEnter: (
            to: RouteLocationNormalized,
            from: RouteLocationNormalized,
            next: NavigationGuardNext
        ) => {
            const token = TokenService.getToken();

            if (!token) {
                showToast({
                    severity: 'error',
                    summary: 'Session expired',
                    detail: 'Your session has expired. Please, log in again',
                    life: 3000
                });
                next('/');
                return;
            }

            const role = TokenService.decodeToken(token)?.role;

            if (role === 'ADMIN') {
                next();
            } else {
                showToast({
                    severity: 'error',
                    summary: 'Unauthorized',
                    detail: 'You are not allowed to access this page',
                    life: 3000
                });
                next('/dashboard');
            }
        }
    },
    {
        path: '/reset',
        name: 'reset',
        component: () => import('../views/ChangeInfoView.vue')
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
