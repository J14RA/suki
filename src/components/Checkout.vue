<template>
    <div>
        <h1>Checkout</h1>
        <div v-if="cart.length">
            <div v-for="item in cart" :key="item.id">
                <h3>{{ item.name }} (x{{ item.quantity }})</h3>
                <p>${{ item.price * item.quantity }}</p>
                <button @click="removeFromCart(item.id)">Remove</button>
            </div>
            <h3>Total Price: ${{ totalPrice }}</h3>
            <button @click="checkout">Place Order</button>
        </div>
        <div v-else>
            <p>Cart is empty.</p>
        </div>
    </div>
</template>

<script>
import { useCartStore } from '../stores/cart'

export default {
    setup() {
        const cartStore = useCartStore()
        const removeFromCart = cartStore.removeFromCart
        const checkout = () => {
            alert('Order placed successfully!')
            cartStore.clearCart()
        }
        return {
            cart: cartStore.cart,
            totalPrice: cartStore.totalPrice,
            removeFromCart, checkout
        }
    }
}
</script>
