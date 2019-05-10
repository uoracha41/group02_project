import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import movie from '@/components/movie'
import buyticket from '@/components/buyticket'
import moviedetail from '@/components/moviedetail'
import movieadmin from '@/components/movieadmin'
import edit from '@/components/edit'
import add from '@/components/addmovie'
import aboutus from '@/components/aboutus'
import selectPosition from '@/components/selectPosition'
import Total from '@/components/Total'
import signin from '@/components/signin'
import signup from '@/components/signup'
import payment from '@/components/payment'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/buyticket/buyticket/selectPosition/:movieId/:round',
      name: 'selectPosition',
      component: selectPosition
    },
    {
      path: '/Total/:id/:round/:time/:price/:seat',
      name: 'Total',
      component: Total
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/movie',
      name: 'movie',
      component: movie
    },
    {
      path: '/buyticket/:movieId',
      name: 'buyticket',
      component: buyticket
    },
    {
      path: '/details/:movieId',
      name: 'moviedetail',
      component: moviedetail
    },
    {
      path: '/movieadmin',
      name: 'movieadmin',
      component: movieadmin
    },
    {
      path: '/edit/:movieId',
      name: 'edit',
      component: edit
    },
    {
      path: '/addmovie/:movieId',
      name: 'add',
      component: add
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: aboutus
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path:'/payment',
      name:'payment',
      component:payment
    }
  ]
})
