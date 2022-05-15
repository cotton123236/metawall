import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('./../pages/Index.vue'),
      children: [
        {
          path: '',
          component: () => import('./../pages/Home.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./../pages/Login.vue')
    }
  ]
})

export default router