import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Programmer from '../views/Programmer.vue'
import SingleSurvey from '../views/SingleSurvey.vue'
import SurveySubmit from '../views/SurveySubmit.vue'
import ThanksForAnswers from '../views/ThanksForAnswers.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/programmer',
    name: 'Programmer',
    component: Programmer
  },
  {
    path: '/singlesurvey/:hash',
    name: 'SingleSurvey',
    component: SingleSurvey,
    props: true,
  },
  {
    path: '/surveySubmit',
    name: 'surveySubmit',
    component: SurveySubmit,
    props: true,
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: ThanksForAnswers,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard/Dashboard.vue'),
  },
  {
    path: '/dashboard/survey',
    name: 'Survey',
    component: () => import('../views/Dashboard/Survey.vue'),
    children: [
      {
        path: '/dashboard/survey/addSurvey',
        name: 'Add Survey',
        component: () => import('../components/Dashboard/Survey/AddSurvey.vue')
      },
      {
        path: '/dashboard/survey/editSurvey/:id',
        name: 'Edit Survey',
        component: () => import('../components/Dashboard/Survey/EditSurvey.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
