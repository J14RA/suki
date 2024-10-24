<template>
    <header>
        <nav>
            <router-link to="/">Home</router-link>
            <ul>
                <li v-if="!user" @click="toggleUserModal" class="user-toggle">
                    <img src="/images/square-user-svgrepo-com.svg" alt="User Icon" class="user-icon" />
                </li>
                <li v-else class="user-menu" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
                    <img src="/images/square-user-svgrepo-com.svg" alt="User Icon" class="user-icon" />
                    <div v-if="showDropdown" class="dropdown">
                        <p>Welcome, {{ user.email }}</p>
                        <router-link to="/account-settings">Account Settings</router-link>
                        <button @click="logout">Logout</button>
                    </div>
                </li>
                <li @click="toggleCartSidebar" class="cart-toggle">
                    <img src="/images/cart-shopping-fast-svgrepo-com.svg" alt="Cart Image" class="cart-icon" />
                    <span v-if="totalCartQuantity > 0" class="cart-count">{{ totalCartQuantity }}</span>
                </li>
            </ul>
        </nav>
        <CartSidebar :showCart="showCart" @close="toggleCartSidebar" :cartItems="cartItems" :totalPrice="totalPrice"
            @removeFromCart="removeFromCart" />
        <UserModal :showUserModal="showUserModal" @close="toggleUserModal" v-if="!user" />
    </header>
</template>

<script>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
import CartSidebar from './CartSidebar.vue';
import UserModal from './UserModal.vue';

export default {
    name: "HeaderApp",
    components: {
        CartSidebar,
        UserModal
    },
    setup() {
        const cartStore = useCartStore();
        const authStore = useAuthStore();
        const showCart = ref(false);
        const showUserModal = ref(false);
        const showDropdown = ref(false);

        const toggleUserModal = () => {
            showUserModal.value = !showUserModal.value;
        };

        const toggleCartSidebar = () => {
            showCart.value = !showCart.value;
        };

        const logout = async () => {
            await authStore.logout();
        };

        return {
            showCart,
            showUserModal,
            toggleUserModal,
            toggleCartSidebar,
            logout,
            user: computed(() => authStore.user),
            totalCartQuantity: computed(() => cartStore.totalCartQuantity),
            cartItems: computed(() => cartStore.cart),
            totalPrice: computed(() => cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)),
            removeFromCart: cartStore.removeFromCart,
            showDropdown
        };
    }
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
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;

        &:hover {
            text-decoration: underline;
        }
    }

    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        padding: 0;
        margin: 0;

        li {
            margin: 0 1rem;
            cursor: pointer;
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
    height: 0;
    position: relative;
}

.cart-count {
    background-color: red;
    color: white;
    font-size: 0.8rem;
    border-radius: 50%;
    padding: 2px 6px;
    position: absolute;
    top: -10px;
    right: -10px;
}

.user-menu {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: v.$details-background;
    border: 1px solid #ddd;
    padding: 0.8rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;

    p {
        margin: 0;
    }

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        text-align: left;
        padding: 5px 0;
        transition: color 0.3s;

        &:hover {
            color: red;
        }
    }

    a {
        text-decoration: none;
        color: black;
        transition: color 0.3s;

        &:hover {
            color: blue;
        }
    }
}
</style>
