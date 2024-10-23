<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li @click="toggleUserModal" class="user-toggle">
                    <img src="/images/square-user-svgrepo-com.svg" alt="User Icon" class="user-icon">
                </li>
                <li @click="toggleCartSidebar" class="cart-toggle">
                    <img src="/images/cart-shopping-fast-svgrepo-com.svg" alt="Cart Image" class="cart-icon">
                    <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                </li>
            </ul>
        </nav>
        <transition name="slide-fade" mode="out-in">
            <div v-bind:class="{ 'cart-sidebar-open': showCart, 'cart-sidebar': true }">
                <button class="close-btn" @click="toggleCartSidebar">X</button>
                <h2>Your Cart</h2>
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
        <!-- User Modal -->
        <transition name="fade">
            <div v-if="showUserModal" class="modal" @click.self="closeUserModal">
                <div class="modal-content" @click.stop>
                    <h2 v-if="isRegister">Register</h2>
                    <h2 v-else>Login</h2>
                    <form @submit.prevent="handleSubmit">
                        <div class="input-field">
                            <label>Email</label>
                            <input type="email" v-model="email" required />
                        </div>
                        <div class="input-field">
                            <label>Password</label>
                            <input type="password" v-model="password" required />
                        </div>
                        <div v-if="isRegister" class="input-field">
                            <label>Confirm Password</label>
                            <input type="password" v-model="confirmPassword" required />
                        </div>
                        <button type="submit" class="submit-btn">{{ isRegister ? 'Register' : 'Login' }}</button>
                    </form>
                    <button class="close-btn" @click="closeUserModal">Close</button>
                    <p @click="toggleAuthMode">{{ isRegister ?
                        'Already have an account? Login' : "Don't have an account ? Register" }}</p>
                </div>
            </div>
        </transition>
    </header>
</template>



<script>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth'; // Assuming you have an auth store

export default {
    name: 'HeaderApp',
    setup() {
        const cartStore = useCartStore();
        const authStore = useAuthStore();
        const showCart = ref(false);
        const showUserModal = ref(false);
        const isRegister = ref(false);
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');

        const cartItemCount = computed(() => cartStore.cart.length);
        const cartItems = computed(() => cartStore.cart);
        const totalPrice = computed(() =>
            cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );

        const toggleCartSidebar = () => {
            showCart.value = !showCart.value;
        };

        const toggleUserModal = () => {
            showUserModal.value = !showUserModal.value;
        };

        const closeUserModal = () => {
            showUserModal.value = false;
        };

        const toggleAuthMode = () => {
            isRegister.value = !isRegister.value;
        };

        const handleSubmit = async () => {
            if (isRegister.value) {
                if (password.value !== confirmPassword.value) {
                    alert("Passwords do not match!");
                    return;
                }
                await authStore.register(email.value, password.value);
            } else {
                await authStore.login(email.value, password.value);
            }
            closeUserModal();
        };

        const removeFromCart = (productId) => {
            cartStore.removeFromCart(productId);
        };

        return {
            showCart,
            showUserModal,
            isRegister,
            email,
            password,
            confirmPassword,
            cartItemCount,
            cartItems,
            totalPrice,
            toggleCartSidebar,
            toggleUserModal,
            closeUserModal,
            toggleAuthMode,
            handleSubmit,
            removeFromCart,
        };
    },
};

</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

header {
    font-family: v.$font-stack;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

/* Navigation Bar Styles */
nav {
    background-color: v.$primary-color;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        padding: 0;

        li {
            margin: 0 15px;
            cursor: pointer;

            a {
                color: white;
                text-decoration: none;
                font-size: 18px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}

/* Icons */
.user-icon,
.cart-icon {
    width: 2rem;
}

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

/* Modal Styles */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
    cursor: pointer;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: default;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* Login & Register Form Styles */
.login-form,
.register-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input-field label {
    font-size: 16px;
    color: #333;
}

.input-field input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.submit-btn {
    padding: 10px;
    background-color: v.$primary-color;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: color.scale(v.$primary-color, $lightness: -10%);
    }
}

.close-btn {
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
