<template>
    <div v-if="product">
        <div class="product-container">
            <!-- Main Swiper for large product images -->
            <div class="product-images">
                <swiper :spaceBetween="10" :navigation="true" :thumbs="{ swiper: thumbsSwiper }"
                    modules="[Thumbs, Navigation, FreeMode]" class="main-swiper">
                    <swiper-slide v-for="(image, index) in product.images" :key="index">
                        <img :src="image" alt="Product image" />
                    </swiper-slide>
                </swiper>
                <!-- Thumbnail Swiper -->
                <swiper @swiper="onSwiper" :spaceBetween="10" :slidesPerView="4.5" :watchSlidesProgress="true"
                    :grabCursor="true" modules="[Thumbs, Navigation, FreeMode]" class="thumb-swiper">
                    <swiper-slide v-for="(image, index) in product.images" :key="index">
                        <img :src="image" alt="Thumbnail image" />
                    </swiper-slide>
                </swiper>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../stores/product';
import { useCartStore } from '../stores/cart';
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const productStore = useProductStore();
        const cartStore = useCartStore();
        const route = useRoute();
        const productId = Number(route.params.id);
        const product = ref(null);
        // Reactive reference for the thumbs swiper
        const thumbsSwiper = ref(null);
        // Set thumbsSwiper on the thumbnail swiper instance
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
@import "@/assets/styles/variables.scss";

.product-container {
    display: flex;
    flex-direction: column;
    gap: $product-container-gap;
    padding: $product-container-padding;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
    }
}

.product-images {
    width: 100%;
    margin-bottom: 20px;

    @media (min-width: 768px) {
        width: $product-width;
    }
}

.product-details {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 10px;
    background-color: $details-background;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px $details-box-shadow;

    @media (min-width: 768px) {
        width: $details-width;
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

/* Styling for the thumbnail Swiper */
.thumb-swiper {
    margin-top: 20px;
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
    margin-bottom: 10px;
    color: #333;
}

p {
    text-align: left;
    font-size: 1.1em;
    color: #555;
}

button {
    background-color: #ff5722;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #e64a19;
    }
}
</style>
