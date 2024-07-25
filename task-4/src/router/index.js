import { createRouter, createWebHistory } from 'vue-router';
import MapComponent from '../components/MapComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MapComponent, // Main component displaying the map
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
