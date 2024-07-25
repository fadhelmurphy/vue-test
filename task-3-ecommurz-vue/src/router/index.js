import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/components/product/ProductsPage.vue';
import ProductDetail from '@/components/product/ProductDetail.vue';
import CategoryList from '@/components/category/CategoryList.vue';
import CategoryDetail from '@/components/category/CategoryDetail.vue';
import CalculateComponent from '@/components/CalculateComponent.vue';

const routes = [
  { path: '/', component: CalculateComponent },
  { path: '/products', component: ProductList },
  { path: '/product/:id', component: ProductDetail },
  { path: '/categories', component: CategoryList },
  { path: '/category/:id', component: CategoryDetail },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
