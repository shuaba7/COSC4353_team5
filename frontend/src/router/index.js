
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileManagment from '../views/ProfileManagment.vue'



const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    { //404
      path: '/ProfileManagment',
      name: 'ProfileManagment',
      component: ProfileManagment
    },
  ]
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  export default router