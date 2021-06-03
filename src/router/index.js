import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const About = () => {
  return import(/* webpackChunkName: "about" */ '../views/About.vue')
}
const Memolist = () => {
  return import(/* webpackChunkName: "about" */ '../components/Memolist.vue')
}
const Todolist = () => {
  return import(/* webpackChunkName: "about" */ '../components/Todolist.vue')
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
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
