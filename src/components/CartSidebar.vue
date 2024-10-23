<template>
    <transition name="slide-fade" mode="out-in">
        <div v-bind:class="{ 'cart-sidebar-open': showCart, 'cart-sidebar': true }">
            <button class="close-btn" @click="$emit('close')">X</button>
            <h2>Your Cart</h2>
            <div v-if="cartItems.length" class="cart-items">
                <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
                    <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
                    <div class="cart-item-details">
                        <p>{{ item.name }} (x{{ item.quantity }})</p>
                        <p>Price: ${{ item.price }}</p>
                        <button class="remove-btn" @click="$emit('removeFromCart', item.id)">Remove</button>
                    </div>
                </div>
                <p>Total: ${{ totalPrice }}</p>
                <router-link to="/checkout" @click="$emit('close')">Go to Checkout</router-link>
            </div>
            <div v-else>
                <p>Your cart is empty</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "CartSidebar",
    props: {
        showCart: Boolean,
        cartItems: Array,
        totalPrice: Number
    }
};
</script>
<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

/* Cart Toggle */
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
    width: 40%;
    height: 100%;
    background-color: #f8f8f8;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    overflow-y: auto;
    z-index: 100;
    transition: transform 0.5s ease;
    transform: translateX(100%);
}

.cart-sidebar-open {
    transform: translateX(0);
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

/* Cart Items */
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

    &:hover {
        background-color: #c0392b;
    }
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
    color: v.$primary-color;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
}
</style>
