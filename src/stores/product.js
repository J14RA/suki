import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    isLoading: false,
  }),
  actions: {
    async loadProducts() {
      try {
        console.log("Fetching products...");
        const response = await fetch(
          "https://dummyjson.com/products/search?q=phone"
        );
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        console.log("Fetched data:", data);
        this.products = data.products;
        localStorage.setItem("products", JSON.stringify(data.products));
      } catch (error) {
        console.error("Failed to load products:", error);
        this.products = [];
      }
    },
  },
  getters: {
    getProductById: (state) => (id) =>
      state.products.find((product) => product.id === id),
    getCategories: (state) => {
      return [
        ...new Set(state.products.map((product) => product.category?.name)),
      ];
    },
  },
});
