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
        // Prevent mutation by deeply cloning the product object
        this.cart.push({ ...JSON.parse(JSON.stringify(product)), quantity });
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((p) => p.id !== productId);
    },
    updateItemQuantity(productId, quantity) {
      const item = this.cart.find((p) => p.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart() {
      this.cart = [];
    },
    // Optional: Add a method to check and clear the cart after expiration
    checkCartExpiration() {
      const currentTime = new Date().getTime();
      const expirationTime = this.cartExpirationTime;
      if (currentTime >= expirationTime) {
        this.clearCart();
      }
    },
  },
  getters: {
    totalPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalCartQuantity: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
  persist: {
    storage: sessionStorage, // Persisting to sessionStorage
    paths: ["cart"], // Only persist the 'cart' state
  },
});
