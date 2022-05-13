import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    meta: {
    },
  },
  {
    path: '/panel',
    name: 'panel',
    component: () => import('../views/Panel.vue'),
    meta: {
    },
  },
  {
    path: '/config',
    name: 'config',
    component: () => import('../views/Config.vue'),
    meta: {
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
