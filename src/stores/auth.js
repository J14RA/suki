// src/stores/auth.js
import { defineStore } from "pinia";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
} from "firebase/auth";

// src/stores/auth.js
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    error: null,
    loading: false,
  }),

  actions: {
    async register(email, password) {
      this.loading = true;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
      } catch (error) {
        console.error("Error during registration:", error.code, error.message);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
      } catch (error) {
        console.error("Error during login:", error.code, error.message);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async changePassword(newPassword) {
      const user = getAuth().currentUser;
      if (user) {
        try {
          await updatePassword(user, newPassword);
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        throw new Error("No user is signed in.");
      }
    },

    async logout() {
      this.loading = true;
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error("Error during logout:", error.code, error.message);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    fetchUser() {
      this.loading = true;
      try {
        onAuthStateChanged(auth, (user) => {
          this.user = user ? user : null;
        });
      } catch (error) {
        console.error("Error fetching user:", error.code, error.message);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    requireLogin() {
      if (!this.user) {
        throw new Error("User not logged in");
      }
    },
  },
});
