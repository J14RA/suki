<template>
    <transition name="slide-fade" mode="out-in">
        <div v-bind:class="{ 'cart-sidebar-open': showCart, 'cart-sidebar': true }">
            <button class="close-btn" @click="$emit('close')">X</button>
            <h2>Your Cart</h2>
            <div class="cart-content">
                <div v-if="cartItems.length" class="cart-items">
                    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
                        <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
                        <div class="cart-item-details">
                            <p>{{ item.name }} (x{{ item.quantity }})</p>
                            <p>Price: ${{ item.price }}</p>
                            <button class="remove-btn" @click="$emit('removeFromCart', item.id)">
                                Remove
                            </button>
                        </div>
                    </div>
                    <p class="total-price">Total: ${{ totalPrice }}</p>
                </div>
                <div v-else>
                    <p>Your cart is empty</p>
                </div>
            </div>
            <div class="checkout-container">
                <button class="checkout-btn">
                    <router-link to="/checkout" @click="$emit('close')">Go to Checkout</router-link>
                </button>
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
        totalPrice: Number,
    },
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

.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: auto;
    background-color: #f8f8f8;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 100;
    display: flex;
    flex-direction: column; // Ensure that content and button are stacked vertically
    overflow: hidden; // Prevent overflowing content
    transition: transform 0.5s ease;
    transform: translateX(100%);
}

.cart-sidebar-open {
    overflow: hidden;
    transform: translateX(0);
}

.cart-content {
    flex-grow: 1; // Allow this area to grow and take available space
    overflow-y: auto; // Make it scrollable if content exceeds the available height
}

.total-price {
    font-weight: bold;
    text-align: right;
    margin-top: 20px;
}

.checkout-container {
    padding-top: 10px;
    border-top: 1px solid #ddd; // Separate checkout button with a top border
    background-color: #fff;
    display: flex;
    justify-content: center;
}

.checkout-btn {
    width: 100%;
    padding: 10px;
    background-color: #3498db;
    border: none;
    color: white;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
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

    p {
        font-weight: bold;
        text-align: right;
        margin-top: 10px;
    }

    a {
        color: v.$primary-color;
        text-decoration: none;
        font-size: 1.2rem;
    }
}

.cart-item {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: space-around;
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

    p {
        margin: 5px 0;
    }
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
</style>
