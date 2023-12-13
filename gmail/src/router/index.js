import { createRouter, createWebHistory } from 'vue-router'
import preHome from '../views/preHome.vue'
import signUpForm from '../views/signUpForm.vue'
import loginForm from '../views/loginForm.vue'
import securityForm from '../views/securityForm.vue'
import newPassword from '../views/newPassword.vue'
import forgetPassword from '../views/forgetPassword.vue'
import inbox from '../views/inbox.vue'
import sent from '../views/sent.vue'
import messsage from '../views/message.vue'
import trash from '../views/trash.vue'
import draft from '../views/draft.vue'
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
  },
  {
    path: '/sent',
    name : 'sent',
    component : sent
  },
  {
    path: '/trash',
    name : 'trash',
    component : trash
  },
  {
    path: '/draft',
    name : 'draft',
    component : draft
  },
  {
    path: '/message/:id',
    name : 'message',
    component : messsage,
    props : true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
