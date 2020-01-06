import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './components/Dashboard'
import Events from './components/Events'
import Venues from './components/Venues'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: `/`,
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: `/dogodki`,
      name: 'events',
      component: Events,
    },
    {
      path: `/dvorane`,
      name: 'venues',
      component: Venues,
    },
  ],
})