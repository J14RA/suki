import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [], // Array of items in the cart
    cartExpirationTime: 24 * 60 * 60 * 1000, // 24 hours expiration time
  }),
  actions: {
    addToCart(product, quantity = 1) {
      const item = this.cart.find((p) => p.id === product.id);
      if (item) {
        item.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity });
      }
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter((p) => p.id !== productId);
    },

    clearCart() {
      this.cart = [];
    },
  },
  getters: {
    totalPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartItemCount: (state) =>
      state.cart.reduce((count, item) => count + item.quantity, 0),
  },
  persist: {
    storage: sessionStorage, // Use sessionStorage
    paths: ["cart"], // Only persist the 'cart' state
  },
});
