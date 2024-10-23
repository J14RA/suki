import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadProducts() {
      const storedProducts = localStorage.getItem("products");
      if (storedProducts) {
        this.products = JSON.parse(storedProducts);
      } else {
        try {
          const response = await fetch("/products.json");
          const products = await response.json();
          this.products = products;
          localStorage.setItem("products", JSON.stringify(products));
        } catch (error) {
          console.error("Failed to load products:", error);
        }
      }
    },
  },
  getters: {
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
  },
});
