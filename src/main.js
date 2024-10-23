import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import { register } from "swiper/element/bundle";
import { useAuthStore } from "./stores/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

// register Swiper custom elements
register();

// Create the Pinia instance
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

let app;
const auth = getAuth();
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(pinia);
    app.use(router);

    const authStore = useAuthStore();
    authStore.fetchUser();

    app.mount("#app");
  }
});
