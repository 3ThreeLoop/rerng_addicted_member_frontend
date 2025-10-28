import { createRouter, createWebHistory } from 'vue-router'
import { sonnerToast } from '@/utils/util'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
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
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/index.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

function isAuthenticated() {
  return !!localStorage.getItem('authToken')
}

router.beforeEach(async (to, from, next) => {
  const authKey = to.query.auth_key

  if (authKey && authKey !== '') {
    try {
      const res = await axios.post(`/auth/login/${authKey}`)

      if (res.data && res.data.data && res.data.data.auth && res.data.data.auth.token) {
        const tokenResponse = res.data.data.auth.token
        localStorage.setItem('authToken', tokenResponse)
        next({ path: '/' })
      } else {
        next({ name: 'login' })
      }
    } catch (error) {
      console.error('Error during authentication:', error)
      next({ name: 'login' })
    }
  } else if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
  } else if (to.path === '/login' && isAuthenticated()) {
    if (localStorage.getItem('authToken') == '') {
      sonnerToast('',"There no token", 'error');
      next({ name: 'login' })
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
