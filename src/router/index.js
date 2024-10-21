// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../components/ProductList.vue";
import Checkout from "../components/Checkout.vue";
import ProductDetails from "../components/ProductDetails.vue";

const routes = [
  { path: "/", component: ProductList },
  { path: "/checkout", component: Checkout },
  { path: "/product/:id", component: ProductDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
