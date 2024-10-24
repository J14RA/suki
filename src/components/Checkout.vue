<template>
    <div>
        <h1>Checkout</h1>
        <div v-if="cartItems.length" class="cart-items">
            <CartItem v-for="(item, index) in cartItems" :key="index" :item="item" @remove-item="removeFromCart"
                @update-quantity="updateItemQuantity" />
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
        const totalPrice = computed(() => cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0));

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
        };
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
    z-index: 100;
    display: flex;
    flex-direction: column; // Stack elements vertically
    overflow: hidden; // Prevent overflowing content
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
.cart-content {
    flex-grow: 1; // Allow the content to grow and fill space
    overflow-y: auto; // Enable scrolling for long content
    margin-bottom: 20px; // Add spacing before checkout button
}

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

/* Total Price */
.total-price {
    font-weight: bold;
    text-align: right;
    margin-top: 20px;
}

/* Checkout Button */
.checkout-container {
    padding-top: 10px;
    border-top: 1px solid #ddd; // Separate checkout button from items
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
</style>
