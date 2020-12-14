import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Informatyka from '../views/Informatyka.vue'
import Kryptologia from '../views/Kryptologia.vue'
import Soon from '../views/Soon.vue'
import SingleSurvey from '../views/SingleSurvey.vue'
import SurveySubmit from '../views/SurveySubmit.vue'
import ThanksForAnswers from '../views/ThanksForAnswers.vue'
import Socket from '../views/Socket.vue'
import Socket_copy from '../views/Socket_copy.vue'
import Results from '../views/Results.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/socket',
    name: 'socket',
    component: Socket
  },
  {
    path: '/results',
    name: 'results',
    component: Results
  },
  {
    path: '/socketcpy',
    name: 'socketcpy',
    component: Socket_copy
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/informatyka',
    name: 'Informatyka',
    component: Informatyka
  },
  {
    path: '/kryptologia',
    name: 'Kryptologia',
    component: Kryptologia
  },
  {
    path: '/comingSoon',
    name: 'comingSoon',
    component: Soon
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
    path: '/pageNotFound',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
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
