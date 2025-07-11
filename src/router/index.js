import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RulesView from '../views/RulesView.vue';
import LocationsView from '../views/LocationsView.vue';
import UnitsView from '../views/UnitsView.vue';
import SpellsView from '../views/SpellsView.vue';

const routes = [
  {
    path: '/',
    redirect: '/inicio'
  },
  {
    path: '/inicio',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/reglas',
    name: 'Rules',
    component: RulesView,
  },
  {
    path: '/locations',
    name: 'Locations',
    component: LocationsView,
  },
  {
    path: '/units',
    name: 'Units',
    component: UnitsView,
  },
  {
    path: '/spells',
    name: 'Spells',
    component: SpellsView,
  }
];

const router = createRouter({
  history: createWebHashHistory('/ow-codex/dist/'),
  routes,
  linkActiveClass: 'bg-gray-200 dark:bg-gray-700'
});

export default router;