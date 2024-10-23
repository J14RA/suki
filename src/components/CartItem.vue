<template>
    <div class="cart-item">
        <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
        <div class="cart-item-details">
            <p>{{ item.name }} (x{{ item.quantity }})</p>
            <p>Price: ${{ item.price }}</p>
            <button class="remove-btn" @click="removeItem" aria-label="Remove item">
                Remove
            </button>
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
    emits: ['remove-item'],
    methods: {
        removeItem() {
            this.$emit('remove-item', this.item.id);
        }
    }
};
</script>

<style scoped>
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
