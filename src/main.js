import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import { register } from "swiper/element/bundle";

// register Swiper custom elements
register();

const app = createApp(App);

// Create the Pinia instance
const pinia = createPinia();

// Use the persistence plugin in Pinia
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount("#app");
