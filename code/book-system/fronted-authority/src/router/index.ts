import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: () => import('../views/Home.vue')
    },
    { 
      path: '/:pathMatch(.*)*', 
      name: 'not-found', 
      component: () => import('../views/Error.vue') 
    },
  ],
})

router.beforeEach((to, from, next) => {
  if(to.name === 'login'){
    next()
  } else {
    // 验证cookie有效
    next()
    
  }
  
})

export default router