<template>
    <div class="cart-item">
        <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
        <div class="cart-item-details">
            <p>{{ item.name }} (x{{ item.quantity }})</p>
            <p>Price: ${{ item.price }}</p>
            <div class="quantity-controls">
                <button @click="decreaseQuantity" aria-label="Decrease quantity">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-btn" @click="removeItem" aria-label="Remove item">Remove</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    emits: ['remove-item', 'update-quantity'],
    methods: {
        removeItem() {
            this.$emit('remove-item', this.item.id);
        },
        increaseQuantity() {
            this.$emit('update-quantity', { id: this.item.id, quantity: this.item.quantity + 1 });
        },
        decreaseQuantity() {
            if (this.item.quantity > 1) {
                this.$emit('update-quantity', { id: this.item.id, quantity: this.item.quantity - 1 });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
    width: 80px;
    height: auto;
    border-radius: 4px;
}

.cart-item-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.quantity-controls {
    display: flex;
    align-items: center;
    gap: 5px;
}

.remove-btn {
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
