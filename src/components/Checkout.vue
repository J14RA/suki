<template>
  <section id="checkout" aria-labelledby="checkout-heading">
    <h1 id="checkout-heading">Checkout</h1>
    <div v-if="cartItems.length" class="cart-items">
      <CartItem
        v-for="(item, index) in cartItems"
        :key="item.id"
        :item="item"
        @remove-item="removeFromCart"
        @update-quantity="updateItemQuantity"
      />
      <div class="checkout-actions">
        <p class="total">Total: ${{ totalPrice }}</p>
        <button
          class="checkout-btn"
          @click="handleCheckout"
          :disabled="isProcessing"
          aria-busy="isProcessing"
          :aria-label="
            isProcessing ? 'Processing your order' : 'Proceed to checkout'
          "
        >
          {{ isProcessing ? "Processing..." : "Proceed to Checkout" }}
        </button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty.</p>
    </div>

    <UserModal
      :showUserModal="showUserModal"
      @close="toggleUserModal"
      @login-success="handleLoginSuccess"
    />
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
import CartItem from "./CartItem.vue";
import UserModal from "./UserModal.vue";

export default {
  components: { CartItem, UserModal },
  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const isProcessing = ref(false);
    const showUserModal = ref(false);
    const cartItems = computed(() => cartStore.cart);
    const totalPrice = computed(() =>
      cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    const toggleUserModal = () => {
      showUserModal.value = !showUserModal.value;
    };

    const handleLoginSuccess = () => {
      showUserModal.value = false;
    };

    const removeFromCart = async (itemId) => {
      try {
        await cartStore.removeFromCart(itemId);
        alert("Item removed successfully");
      } catch (error) {
        console.error("Error removing item:", error);
        alert("Failed to remove item. Please try again.");
      }
    };

    const updateItemQuantity = ({ id, quantity }) => {
      cartStore.updateItemQuantity(id, quantity);
    };

    const handleCheckout = async () => {
      isProcessing.value = true;
      try {
        if (!authStore.user) {
          toggleUserModal();
          return;
        }
        await cartStore.clearCart();
        alert("Order placed successfully!");
      } catch (error) {
        console.error("Checkout failed:", error);
        alert("Checkout failed. Please try again.");
      } finally {
        isProcessing.value = false;
      }
    };

    return {
      cartItems,
      totalPrice,
      removeFromCart,
      updateItemQuantity,
      handleCheckout,
      isProcessing,
      showUserModal,
      toggleUserModal,
      handleLoginSuccess,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

#checkout {
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .checkout-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;

    .total {
      font-weight: bold;
      text-align: right;
      margin-top: 1rem;
    }
  }

  .checkout-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: v.$primary-color;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.3s, transform 0.1s;

    &:hover {
      background-color: color.scale(v.$primary-color, $lightness: -10%);
    }

    &:disabled {
      background-color: color.scale(v.$primary-color, $lightness: 15%);
      cursor: not-allowed;
    }
  }

  .empty-cart {
    text-align: center;
    padding: 2rem;
  }
}
</style>
