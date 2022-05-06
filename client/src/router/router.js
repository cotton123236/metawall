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
    }
  ]
})

export default router