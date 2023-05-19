import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import { isCookieExist, cookieValue } from '../utils/cookie'

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

/* router.beforeEach((to, from, next) => {
  if(to.name === 'login'){
    next()
    console.log('路由守卫', 'ok')
  }  else {
    if(isCookieExist()){
      console.log('beforeEach', '..error', cookieValue)
      next()
    } else {
      
      next({
        path: 'login'
      })
      console.log('beforeEach', '..error', cookieValue)
    }
  }
}) */

export default router