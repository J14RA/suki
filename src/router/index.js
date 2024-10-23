// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import ProductList from "../components/ProductList.vue";
import Checkout from "../components/Checkout.vue";
import ProductDetails from "../components/ProductDetails.vue";
import AccountSettings from "../components/AccountSettings.vue";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const routes = [
  { path: "/", component: ProductList },
  { path: "/checkout", component: Checkout },
  { path: "/product/:id", component: ProductDetails },
  {
    path: "/account-settings",
    name: "AccountSettings",
    component: AccountSettings,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    next("/"); // Redirect to home if not authenticated
  } else {
    next();
  }
});

export default router;
