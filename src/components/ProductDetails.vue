<template>
    <div v-if="product">
        <div class="product-container">
            <div class="product-images">
                <swiper-container class="main-swiper" thumbs-swiper=".thumb-swiper" space-between="10"
                    navigation="true">
                    <swiper-slide v-for="(image, index) in product.images" :key="index">
                        <img :src="image" alt="Product image" />
                    </swiper-slide>
                </swiper-container>
                <swiper-container class="thumb-swiper" space-between="10" slides-per-view="4" free-mode="true"
                    watch-slides-progress="true">
                    <swiper-slide v-for="(image, index) in product.images" :key="index">
                        <img :src="image" alt="Thumbnail image" />
                    </swiper-slide>
                </swiper-container>
            </div>
            <div class="product-details">
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <p>Price: ${{ product.price }}</p>
                <button @click="addToCart(product)">Add to Cart</button>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Product not found.</p>
    </div>
</template>


<script>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product";
import { useCartStore } from "../stores/cart";

export default {
    setup() {
        const productStore = useProductStore();
        const cartStore = useCartStore();
        const route = useRoute();
        const productId = Number(route.params.id);
        const product = ref(null);

        onMounted(async () => {
            // If products are not loaded, load them
            if (productStore.products.length === 0) {
                await productStore.loadProducts();
            }

            // Fetch product by ID from store
            product.value = productStore.getProductById(productId);
        });

        // Watch for changes in products in case they load asynchronously
        watchEffect(() => {
            product.value = productStore.getProductById(productId);
        });

        const addToCart = (product) => {
            cartStore.addToCart(product);
        };

        return { product, addToCart };
    },
};

</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.product-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;

    @include respond-to(tablet) {
        flex-direction: row;
        align-items: flex-start;
    }
}

.product-images {
    width: 100%;
    margin-bottom: 16px;

    @include respond-to(tablet) {
        width: 60%;
    }
}

.product-details {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 8px;
    background-color: $background-color;
    padding: 16px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    @include respond-to(tablet) {
        width: 40%;
    }
}

.main-swiper img,
.thumb-swiper img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    border-radius: 10px;
}

.thumb-swiper {
    margin-top: 16px;
}

.thumb-swiper img {
    cursor: pointer;
    border-radius: 5px;
}

.thumb-swiper .swiper-slide-thumb-active {
    opacity: 0.5;
}

h1 {
    font-size: 2em;
    margin-bottom: 8px;
    color: $primary-color;
}

p {
    text-align: left;
    font-size: 1.1em;
    color: $secondary-color;
}

button {
    background-color: $primary-color;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: color.scale($primary-color, $lightness: -10%);
    }

    @include respond-to(desktop) {
        padding: 12px 24px;
    }
}

@include respond-to(desktop) {
    .product-container {
        padding: 32px;
    }

    .product-details {
        padding: 24px;
    }

    h1 {
        font-size: 2.5em;
    }
}
</style>
