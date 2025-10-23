import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/home/Index.vue'),
        },
        {
          path: '/episode',
          name: 'episode',
          component: () => import('../views/episode/Index.vue'),
        },
      ],
    },
  ],
})

export default router
