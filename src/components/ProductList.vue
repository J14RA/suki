<template>
    <div id="product-list">
        <h1>Product List</h1>
        <div v-if="!loading && products.length" class="products-items">
            <div v-for="product in products" :key="product.id" class="product-item">
                <router-link :to="`/product/${product.id}`" class="product-link">
                    <img :src="product.images[0]" alt="Product image" class="product-image" />
                    <h3>{{ product.title }}</h3>
                    <p>Price: ${{ product.price }}</p>
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
        };

        onMounted(async () => {
            try {
                await productStore.loadProducts();
                console.log(productStore.products);
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

    @include respond-to(tablet) {
        flex: 1 1 calc(50% - 2.5rem);
        /* 2 columns on tablets */
    }

    @include respond-to(desktop) {
        flex: 1 1 calc(33.3333% - 2.5rem);
        /* 3 columns on desktops */
    }
}

.product-link {
    color: inherit;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.product-image {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 10px;
}
</style>
