import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const About = () => {
  return import(/* webpackChunkName: "about" */ '../views/About.vue')
}
const Dashboard = () => {
  return import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
}
const Memolist = () => {
  return import(/* webpackChunkName: "about" */ '../components/Memolist.vue')
}
const Todolist = () => {
  return import(/* webpackChunkName: "about" */ '../components/Todolist.vue')
}
const LoadImage = () => {
  return import(/* webpackChunkName: "about" */ '../components/loadImage.vue')
}
const practice = () => {
  return import(/* webpackChunkName: "about" */ '../components/practice.vue')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/memolist',
        name: 'memolist',
        component: Memolist
      },
      {
        path: '/todolist',
        name: 'todolist',
        component: Todolist
      },
      {
        path: '/loadImage',
        name: 'loadImage',
        component: LoadImage
      }
    ]
  },
  {
    path: '/dashboard:index',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    children: [
      {
        path: '/practice',
        name: 'practice',
        component: practice
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
