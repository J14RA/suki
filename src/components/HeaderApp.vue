<!-- src/components/HeaderApp.vue -->
<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>

                <!-- Toggle the cart sidebar with cart item count -->
                <li @click="toggleCartSidebar" class="cart-toggle">
                    <span class="hamburger-icon">&#9776;</span>
                    <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                </li>
            </ul>
        </nav>

        <!-- Cart Sidebar with Slide Transition -->
        <transition name="slide-fade" mode="out-in">
            <div v-bind:class="{ 'cart-sidebar-open': showCart, 'cart-sidebar': true }">
                <button class="close-btn" @click="toggleCartSidebar">X</button>
                <h2>Your Cart</h2>

                <!-- Cart Items -->
                <div v-if="cartItems.length" class="cart-items">
                    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
                        <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
                        <div class="cart-item-details">
                            <p>{{ item.name }} (x{{ item.quantity }})</p>
                            <p>Price: ${{ item.price }}</p>
                            <button class="remove-btn" @click="removeFromCart(item.id)">Remove</button>
                        </div>
                    </div>
                    <p>Total: ${{ totalPrice }}</p>
                    <router-link to="/checkout" @click="toggleCartSidebar">Go to Checkout</router-link>
                </div>

                <div v-else>
                    <p>Your cart is empty</p>
                </div>
            </div>
        </transition>
    </header>
</template>

<script>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';

export default {
    name: 'HeaderApp',
    setup() {
        const cartStore = useCartStore();

        // Reactive state for cart visibility
        const showCart = ref(false);

        // Get the total number of items in the cart
        const cartItemCount = computed(() => cartStore.cart.length);

        // Get cart items and total price from the store
        const cartItems = computed(() => cartStore.cart);
        const totalPrice = computed(() =>
            cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );

        // Toggle the cart sidebar
        const toggleCartSidebar = () => {
            showCart.value = !showCart.value;
        };

        // Remove item from the cart
        const removeFromCart = (productId) => {
            cartStore.removeFromCart(productId);
        };

        return {
            showCart,
            cartItemCount,
            cartItems,
            totalPrice,
            toggleCartSidebar,
            removeFromCart,
        };
    },
};
</script>

<style scoped>
/* Global styles for the header */
header {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

/* Navigation Bar Styles */
nav {
    background-color: #42b983;
    padding: 15px;
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
}

nav ul li {
    margin: 0 15px;
    cursor: pointer;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
}

nav ul li a:hover {
    text-decoration: underline;
}

/* Hamburger Icon */
.hamburger-icon {
    font-size: 24px;
    cursor: pointer;
}

.cart-toggle {
    position: relative;
}

.cart-count {
    background-color: red;
    color: white;
    font-size: 12px;
    border-radius: 50%;
    padding: 2px 6px;
    position: absolute;
    top: -10px;
    right: -10px;
}

/* Cart Sidebar Styles */
.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    /* Ensure it’s off-screen initially */
    width: 40%;
    height: 100%;
    background-color: #f8f8f8;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    overflow-y: auto;
    transition: transform 0.5s ease;
    transform: translateX(100%);
    /* Slide it out of view */
}

.cart-sidebar-open {
    transform: translateX(0);
    /* Bring it back into view */
}

.close-btn {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}

/* Transition for sliding the cart */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

/* The sliding effect combined with fade */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease, opacity 0.3s ease;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.cart-item {
    display: flex;
    gap: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.cart-item-image {
    width: 80px;
    height: auto;
    border-radius: 4px;
}

.cart-item-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-item-details p {
    margin: 5px 0;
}

.remove-btn {
    align-self: flex-end;
    padding: 5px 10px;
    background-color: #e74c3c;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.remove-btn:hover {
    background-color: #c0392b;
}

.cart-items p {
    font-weight: bold;
    text-align: right;
    margin-top: 10px;
}

.cart-items .router-link {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #42b983;
    text-decoration: none;
    font-weight: bold;
}

.cart-items .router-link:hover {
    text-decoration: underline;
}
</style>
