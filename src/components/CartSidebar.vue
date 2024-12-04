<template>
    <transition name="slide-fade" mode="out-in">
        <div v-bind:class="{ 'cart-sidebar-open': showCart, 'cart-sidebar': true }">
            <button class="close-btn" @click="$emit('close')" aria-label="Close Cart Sidebar">X</button>
            <h2>Your Cart</h2>
            <div class="cart-content">
                <div v-if="cartItems.length" class="cart-items">
                    <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
                        <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
                        <div class="cart-item-details">
                            <p>{{ item.name }}</p>
                            <p>Price: ${{ item.price }}</p>

                            <!-- Quantity Controls -->
                            <div class="quantity-controls">
                                <button class="decrease-btn" @click="decreaseQuantity(item)"
                                    aria-label="Decrease quantity">-</button>
                                <span>{{ item.quantity }}</span>
                                <button class="increase-btn" @click="increaseQuantity(item)"
                                    aria-label="Increase quantity">+</button>
                                <button class="remove-btn" @click="removeItem(item.id)"
                                    aria-label="Remove item">Remove</button>
                            </div>
                        </div>
                    </div>
                    <p class="total-price">Total: ${{ totalPrice }}</p>
                </div>
                <div v-else class="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            </div>
            <div class="checkout-container">
                <button class="checkout-btn" aria-label="Proceed to Checkout">
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
    methods: {
        increaseQuantity(item) {
            this.$emit('update-quantity', { id: item.id, quantity: item.quantity + 1 });
        },
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                this.$emit('update-quantity', { id: item.id, quantity: item.quantity - 1 });
            }
        },
        removeItem(itemId) {
            this.$emit('removeFromCart', itemId);
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 400px;
    height: 100%;
    background-color: #f8f8f8;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transform: translateX(100%);
    transition: transform 0.5s ease;
}

.cart-sidebar-open {
    transform: translateX(0);
}

.cart-content {
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 10px;
}

.total-price {
    font-weight: bold;
    text-align: right;
    margin-top: 20px;
}

.checkout-container {
    padding-top: 10px;
    border-top: 1px solid #ddd;
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

    a {
        color: white;
        text-decoration: none;
        width: 100%;
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
    color: #333;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cart-item {
    display: flex;
    gap: 15px;
    justify-content: flex-start;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
}

.cart-item-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    p {
        margin: 5px 0;
    }
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 10px;

    .increase-btn,
    .decrease-btn {
        width: 30px;
        height: 30px;
        border-radius: 4px;
        background-color: v.$primary-color;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: color.scale(v.$primary-color, $lightness: -10%);
        }

        &:disabled {
            background-color: color.scale(v.$primary-color, $lightness: 20%);
            cursor: not-allowed;
        }
    }

    span {
        font-size: 1rem;
        min-width: 24px;
        text-align: center;
    }

    .remove-btn {
        width: auto;
        height: 30px;
        align-self: flex-start;
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
}

.empty-cart {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

@media (max-width: 768px) {
    .cart-sidebar {
        width: 100%;
    }

    .cart-item {
        flex-direction: column;
    }
}
</style>
