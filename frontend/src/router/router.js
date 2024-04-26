
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileManagment from '../views/profile/ProfileManagment.vue'
import LoginClientRegistration from '../views/profile/LoginClientRegistration.vue'
import FuelQuote from '../views/fuel/FuelQuote.vue'
import QuoteHistory from '@/views/fuel/QuoteHistory.vue'


const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ProfileManagment/:ClientID',
      name: 'ProfileManagment',
      component: ProfileManagment
    },
    {
      path: '/loginClientRegistration',
      name: 'LoginClientRegistration',
      component: LoginClientRegistration
    },
    {
      path: '/FuelQuote/:ClientID',
      name: 'FuelQuote',
      component: FuelQuote
    },    
    {
      path: '/QuoteHistory/:ClientID',
      name: 'QuoteHistory',
      component: QuoteHistory
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router