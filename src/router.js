import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Panel from './views/Panel.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/entrar',
      component: Login
    },
    {
      path: '/cadastro',
      component: Register
      //component: () => import(/* webpackChunkName: "about" */ './views/Register.vue')
    },
    {
      path: '/painel',
      component: Panel
    },
    {
      path: '*',
      component: Login
    },
  ]
})
