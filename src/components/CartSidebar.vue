<template>
  <transition name="slide-fade" mode="out-in">
    <div v-bind:class="{ 'cart-sidebar-open': showCart, 'cart-sidebar': true }">
      <button
        class="close-btn"
        @click="$emit('close')"
        aria-label="Close Cart Sidebar"
      >
        X
      </button>
      <h2>Your Cart</h2>
      <div class="cart-content">
        <div v-if="cartItems.length" class="cart-items">
          <CartItem
            v-for="(item, index) in cartItems"
            :key="index"
            :item="item"
            @update-quantity="updateQuantity"
            @remove-item="removeItem"
          />
        </div>
        <div v-else class="empty-cart">
          <p>Your cart is empty</p>
        </div>
        <p class="total-price">Total: ${{ totalPrice }}</p>
      </div>
      <div class="checkout-container">
        <router-link to="/checkout">
          <button
            class="checkout-btn"
            aria-label="Proceed to Checkout"
            @click="$emit('close')"
          >
            Go to Checkout
          </button></router-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { useCartStore } from "../stores/cart";
import CartItem from "./CartItem.vue";
import { computed } from "vue";

export default {
  name: "CartSidebar",
  components: { CartItem },
  props: {
    showCart: Boolean,
  },
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cart);
    const totalPrice = computed(() => cartStore.totalPrice);

    const updateQuantity = ({ id, quantity }) => {
      cartStore.updateItemQuantity(id, quantity);
    };

    const removeItem = (itemId) => {
      cartStore.removeFromCart(itemId);
    };

    return {
      cartItems,
      totalPrice,
      updateQuantity,
      removeItem,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;

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
}

.total-price {
  font-weight: bold;
  text-align: right;
  margin-top: 20px;
}

.checkout-container {
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.checkout-btn {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  border: none;
  color: white;
  font-size: 1rem;
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
    width: 80%;
  }
}
</style>
