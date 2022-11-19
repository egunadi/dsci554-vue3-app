import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/htmlchart',
      name: 'htmlchart',
      component: () => import('../views/HTMLChartView.vue')
    },
    {
      path: '/htmlchartcomp',
      name: 'htmlchartcomp',
      component: () => import('../views/HTMLChartCompView.vue')
    },
    {
      path: '/d3chart',
      name: 'd3chart',
      component: () => import('../views/D3ChartView.vue')
    },
    {
      path: '/d3chartcomp',
      name: 'd3chartcomp',
      component: () => import('../views/D3ChartCompView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
