<template>
    <transition name="fade">
        <div v-if="showUserModal" class="modal" @click.self="$emit('close')">
            <div class="modal-content" @click.stop>
                <h2>{{ isRegister ? "Register" : "Login" }}</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="input-field">
                        <label>Email</label>
                        <input type="email" v-model="email" required />
                        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                    </div>
                    <div class="input-field">
                        <label>Password</label>
                        <input type="password" v-model="password" required />
                        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
                    </div>
                    <div v-if="isRegister" class="input-field">
                        <label>Confirm Password</label>
                        <input type="password" v-model="confirmPassword" required />
                        <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
                    </div>
                    <button type="submit" class="submit-btn" :disabled="authStore.loading">
                        {{ authStore.loading ? "Processing..." : isRegister ? "Register" : "Login" }}
                    </button>
                </form>
                <button class="close-btn" @click="$emit('close')">Close</button>
                <p @click="toggleAuthMode">
                    {{ isRegister ? "Already have an account? Login" : "Don't have an account? Register" }}
                </p>
                <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
            </div>
        </div>
    </transition>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

export default {
    name: "UserModal",
    props: {
        showUserModal: Boolean,
    },
    setup() {
        const authStore = useAuthStore();
        const isRegister = ref(false);
        const email = ref("");
        const password = ref("");
        const confirmPassword = ref("");
        const errors = ref({ email: "", password: "", confirmPassword: "" });

        const toggleAuthMode = () => {
            isRegister.value = !isRegister.value;
        };

        const validateForm = () => {
            errors.value.email = email.value ? "" : "Email is required";
            errors.value.password = password.value ? "" : "Password is required";
            if (isRegister.value) {
                errors.value.confirmPassword = password.value === confirmPassword.value ? "" : "Passwords do not match";
            }
            return !errors.value.email && !errors.value.password && (!isRegister.value || !errors.value.confirmPassword);
        };

        const handleSubmit = async () => {
            if (!validateForm()) return;
            try {
                if (isRegister.value) {
                    await authStore.register(email.value, password.value);
                } else {
                    await authStore.login(email.value, password.value);
                }
            } catch (error) {
                console.error("Authentication error: ", error.message);
            }
        };

        return {
            authStore,
            isRegister,
            email,
            password,
            confirmPassword,
            errors,
            toggleAuthMode,
            handleSubmit,
        };
    },
};
</script>


<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as v;
@use "@/assets/styles/mixins" as m;

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