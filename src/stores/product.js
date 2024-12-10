import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async loadProducts() {
      try {
        // Clear localStorage to ensure fresh data is fetched
        localStorage.removeItem("products");

        // // Fetch products from the server
        // const response = await fetch(
        //   "https://api.escuelajs.co/api/v1/products/?categoryId=3"
        // );

        //if not the api not working
        const response = await fetch("/products.json");
        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();
        this.products = products;

        // Save fetched products to localStorage
        localStorage.setItem("products", JSON.stringify(products));
      } catch (error) {
        console.error("Failed to load products:", error);
        // Clear localStorage in case of error or corrupted data
        localStorage.removeItem("products");
        this.products = []; // Fallback in case of an error
      }
    },
  },
  getters: {
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
  },
});
