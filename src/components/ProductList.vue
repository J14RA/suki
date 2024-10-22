<template>
    <div>
        <h1>Product List</h1>
        <div v-if="!loading && products.length" class="products-items">
            <div v-for="product in products" :key="product.id" class="product-item">
                <router-link :to="`/product/${product.id}`" class="product-link">
                    <img :src="product.images[0]" alt="Product image" class="product-image" />
                    <h3>{{ product.name }}</h3>
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
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';

export default {
    setup() {
        const productStore = useProductStore();
        const cartStore = useCartStore();
        const loading = ref(true);
        const products = computed(() => productStore.products);
        const addToCart = (product) => {
            cartStore.addToCart(product);
        };

        onMounted(async () => {
            await productStore.loadProducts();
            loading.value = false;
        });

        return { products, loading, addToCart };
    }
};

</script>


<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

.products-items {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    text-decoration: none;
}

.product-item {
    flex: 1 1 calc(100% - 40px);
    /* 100% width minus the gap */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    text-decoration: none;

    @include m.respond-to(tablet) {
        flex: 1 1 calc(50% - 40px);
        /* 2 columns on tablets */
    }

    @include m.respond-to(desktop) {
        flex: 1 1 calc(33.3333% - 40px);
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

.product-item--cta {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.product-item--cta button {
    padding: 10px 20px;
    background-color: v.$primary-color;
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: color.scale(v.$primary-color, $lightness: -10%);
    }
}

.product-item--cta a {
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}
</style>
