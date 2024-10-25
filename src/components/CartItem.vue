<template>
    <div class="cart-item">
        <img :src="item.images[0]" alt="Product image" class="cart-item-image" />
        <div class="cart-item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-price">Price: ${{ item.price }}</p>
            <div class="quantity-controls">
                <button class="decrease-btn" @click="decreaseQuantity" aria-label="Decrease quantity">-</button>
                <span>{{ item.quantity }}</span>
                <button class="increase-btn" @click="increaseQuantity" aria-label="Increase quantity">+</button>
                <button class="remove-btn" @click="removeItem" aria-label="Remove item">Remove</button>
            </div>
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
    gap: 15px;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: box-shadow 0.2s;

    &:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
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
    align-items: self-end;

    .item-name {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .item-price {
        color: v.$secondary-color;
        margin-bottom: 10px;
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
}



/* Responsive */
@mixin respond-to($breakpoint) {
    @if $breakpoint ==tablet {
        @media (min-width: 768px) {
            @content;
        }
    }

    @else if $breakpoint ==desktop {
        @media (min-width: 1024px) {
            @content;
        }
    }
}

@include respond-to(tablet) {
    .cart-item {
        flex-direction: row;
    }
}

@include respond-to(desktop) {
    .cart-item {
        gap: 20px;
    }

    .cart-item-image {
        width: 100px;
        height: 100px;
    }
}
</style>
