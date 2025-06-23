import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Rent from './components/Rent.vue'
import Cart from './components/Cart.vue'
import ClientDashboard from './components/ClientDashboard.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/usersStore.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'

// Store
const pinia = createPinia()

//Rutas
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/rent', component: Rent},
    { path: '/cart', component: Cart },
    {
    path: '/clientdashboard',
    component: ClientDashboard,
    meta: { requiresAuth: true }
  }, 
    {path: '/admindashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, isAdmin: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')   


export default router