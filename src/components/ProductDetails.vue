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
import { ref, onMounted } from "vue";
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
        const thumbsSwiper = ref(null);
        const onSwiper = (swiperInstance) => {
            thumbsSwiper.value = swiperInstance;
        };
        onMounted(async () => {
            if (productStore.products.length === 0) {
                await productStore.loadProducts();
            }
            product.value = productStore.getProductById(productId);
        });
        const addToCart = (product) => {
            cartStore.addToCart(product);
        };
        return { product, addToCart, thumbsSwiper, onSwiper };
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

.product-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    /* Replaced v.$spacing-unit * 3 */
    padding: 24px;
    /* Replaced v.$spacing-unit * 3 */
    max-width: 1200px;
    margin: 0 auto;

    @include m.respond-to(tablet) {
        flex-direction: row;
        align-items: flex-start;
    }
}

.product-images {
    width: 100%;
    margin-bottom: 16px;
    /* Replaced v.$spacing-unit * 2 */

    @include m.respond-to(tablet) {
        width: 60%;
    }
}

.product-details {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 8px;
    /* Replaced v.$spacing-unit */
    background-color: v.$details-background;
    padding: 16px;
    /* Replaced v.$spacing-unit * 2 */
    border-radius: 10px;
    box-shadow: 0 4px 8px v.$details-box-shadow;

    @include m.respond-to(tablet) {
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
    /* Replaced v.$spacing-unit * 2 */
}

.thumb-swiper img {
    cursor: pointer;
    border-radius: 5px;
}

.thumb-swiper .swiper-slide {
    opacity: 0.5;
}

.thumb-swiper .swiper-slide-thumb-active {
    opacity: 1;
}

h1 {
    font-size: 2em;
    margin-bottom: 8px;
    /* Replaced v.$spacing-unit */
    color: v.$primary-color;
}

p {
    text-align: left;
    font-size: 1.1em;
    color: v.$secondary-color;
}

button {
    background-color: v.$primary-color;
    color: white;
    border: none;
    padding: 10px 20px;
    /* Direct values */
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: color.scale(v.$primary-color, $lightness: -10%);
    }

    @include m.respond-to(desktop) {
        padding: 12px 24px;
        /* Adjust for desktop */
    }
}

@include m.respond-to(desktop) {
    .product-container {
        padding: 32px;
        /* Adjust for desktop */
    }

    .product-details {
        padding: 24px;
        /* Adjust for desktop */
    }

    h1 {
        font-size: 2.5em;
        /* Adjust for desktop */
    }
}
</style>
