import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertyView from '../views/PropertyView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import AllProperties from '../views/AllProperties.vue'
import SearchView from '../views/SearchView.vue'
import Privacy from '../views/PrivacyView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/search', name: 'search', component: SearchView },
  { path: '/privacy', name: 'privacy', component: Privacy },
  { path: '/properties', name: 'properties', component: AllProperties },
  { path: '/property/:id', name: 'property', component: PropertyView },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
