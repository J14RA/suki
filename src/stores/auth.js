import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async register(email, password) {
      console.log("Registering user:", email);
      // Mock user registration
      this.user = { email };
    },
    async login(email, password) {
      console.log("Logging in user:", email);
      // Mock user login
      this.user = { email };
    },
    async logout() {
      console.log("Logging out user:", this.user.email);
      // Mock user logout
      this.user = null;
    },
  },
});
