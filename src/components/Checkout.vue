<template>
    <div>
        <h1>Checkout</h1>
        <div v-if="cartItems.length" class="cart-items">
            <CartItem v-for="(item, index) in cartItems" :key="index" :item="item" @remove-item="removeFromCart" />
            <p class="total">Total: ${{ totalPrice }}</p>
            <div class="checkout-actions">
                <button class="checkout-btn" @click="handleCheckout" :disabled="isProcessing">
                    {{ isProcessing ? 'Processing...' : 'Proceed to Checkout' }}
                </button>
            </div>
        </div>
        <div v-else>
            <p>Your cart is empty.</p>
        </div>
        <UserModal :showUserModal="showUserModal" @close="toggleUserModal" />
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
import CartItem from "./CartItem.vue";
import UserModal from "./UserModal.vue"; // Import the UserModal component

export default {
    components: { CartItem, UserModal },
    setup() {
        const cartStore = useCartStore();
        const authStore = useAuthStore();
        const isProcessing = ref(false);
        const showUserModal = ref(false);

        const cartItems = computed(() => cartStore.cart);
        const totalPrice = computed(() => cartStore.totalPrice);

        const toggleUserModal = () => {
            showUserModal.value = !showUserModal.value;
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
            handleCheckout,
            isProcessing,
            showUserModal,
            toggleUserModal,
        };
    },
};
</script>

<style lang="scss" scoped>
.cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.total {
    font-weight: bold;
    margin-top: 15px;
}

.checkout-actions {
    margin-top: 20px;
}

.checkout-btn {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 16px;

    &:hover {
        background-color: #2980b9;
    }

    &:disabled {
        background-color: #95a5a6;
        cursor: not-allowed;
    }
}
</style>
