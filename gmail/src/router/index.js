import { createRouter, createWebHistory } from 'vue-router'
import preHome from '../views/preHome.vue'
import signUpForm from '../views/signUpForm.vue'
import loginForm from '../views/loginForm.vue'
import securityForm from '../views/securityForm.vue'
import newPassword from '../views/newPassword.vue'
import forgetPassword from '../views/forgetPassword.vue'
import inbox from '../views/inbox.vue'
const routes = [
  {
    path: '/',
    name: 'prehome',
    component: preHome
  },
  {
    path: '/signup',
    name: 'signup',
    component: signUpForm
  },
  {
    path: '/login',
    name: 'login',
    component: loginForm
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component : forgetPassword,
  },
  {
    path: '/security',
    name : 'securityForm',
    component : securityForm,
  },
  {
    path: '/newpassword',
    name : 'newPassword',
    component : newPassword,
  },
  {
    path: '/inbox',
    name : 'inbox',
    component : inbox
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
