<!-- src/App.vue -->
<template>
  <main>
    <!-- Include HeaderApp component -->
    <HeaderApp />

    <!-- Render the current route component -->
    <router-view />
  </main>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';

export default {
  components: {
    HeaderApp,
  },
};
</script>

<style scoped>
/* Main app styles */
</style>
