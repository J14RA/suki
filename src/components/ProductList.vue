<template>
  <div id="product-list">
    <h1>Product List</h1>
    <div v-if="!loading && products.length" class="products-items">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item card"
      >
        <router-link :to="`/product/${product.id}`" class="product-link">
          <img
            :src="product.images[0]"
            alt="Product image"
            class="product-image"
          />
          <div class="product-tag">
            <h4>{{ product.title }}</h4>
            <p>Price: ${{ product.price }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else-if="loading">
      <p>Loading products...</p>
    </div>
    <div v-else>
      <p>No products found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "../stores/product";
import { useCartStore } from "../stores/cart";

export default {
  setup() {
    const productStore = useProductStore();
    const cartStore = useCartStore();
    const loading = ref(true); // Controls loading state
    const products = computed(() => productStore.products);

    const addToCart = (product) => {
      cartStore.addToCart(product); // Add product to cart
      console.log(productStore.products);
    };

    onMounted(async () => {
      try {
        await productStore.loadProducts();
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        loading.value = false;
      }
    });

    return { products, loading, addToCart }; // Return data and methods to template
  },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

#product-list {
  padding: 1rem 2rem;
}

.products-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;
  text-decoration: none;
}

.product-item {
  flex: 1 1 calc(100% - 2.5rem);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 20rem;
  margin: auto;
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: $background-color;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Ensures content is spaced evenly
  @include respond-to(tablet) {
    flex: 1 1 calc(50% - 2.5rem);
  }

  @include respond-to(desktop) {
    flex: 1 1 calc(33.3333% - 2.5rem);
  }
}

.product-image {
  width: 100%;
  height: 15rem; // Define fixed height
  object-fit: contain;
  display: block;
  border-radius: 8px;
  margin-bottom: 10px;
  aspect-ratio: 4 / 3; // Maintain a consistent ratio
}

.product-tag {
  flex-grow: 1; // Take up available space
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4 {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  p {
    text-align: right;
    margin-top: auto; // Push the price to the bottom
  }
}
</style>
