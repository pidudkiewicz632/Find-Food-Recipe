import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/start',
    name: 'Start',
    component: () => import('../views/Start.vue'),
  },
  {
    path: '/recipe/details/:id',
    name: 'RecipeDetails',
    component: () => import('../views/RecipeDetails.vue'),
  },
  {
    path: '/favourite',
    name: 'Favourite',
    component: () => import('../views/Favourite.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
