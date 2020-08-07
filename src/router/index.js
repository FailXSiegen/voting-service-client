import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLogin from './../views/Login'
import AppOverview from './../views/Overview'
import AppArticles from './../views/Articles'
import AppManufacturers from './../views/Manufacturers'
import AppMedia from './../views/Media'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: AppLogin
  },
  {
    path: '/overview',
    name: 'overview',
    component: AppOverview
    // meta: { requiresAuth: true }
  },
  {
    path: '/articles',
    name: 'articles',
    component: AppArticles
    // meta: { requiresAuth: true }
  },
  {
    path: '/manufacturers',
    name: 'manufacturers',
    component: AppManufacturers
    // meta: { requiresAuth: true }
  },
  {
    path: '/media',
    name: 'media',
    component: AppMedia
    // meta: { requiresAuth: true }
  },
  {
    path: '*',
    redirect: 'login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // Check if the user is logged i
//   const isUserLoggedIn = store.getters.isAuthenticated
//   console.log(store.state)
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isUserLoggedIn) {
//       store.dispatch('logOut')
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
