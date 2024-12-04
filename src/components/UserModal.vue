<template>
    <transition name="fade">
        <div v-if="showUserModal" class="modal" @click.self="$emit('close')">
            <div class="modal-content" @click.stop>
                <h2>{{ isRegister ? "Register" : "Login" }}</h2>
                <form @submit.prevent="handleSubmit">
                    <div class="input-field">
                        <label>Email</label>
                        <input type="email" v-model="email" required placeholder="Enter your email" />
                        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                    </div>
                    <div class="input-field">
                        <label>Password</label>
                        <div class="password-container">
                            <input :type="showPassword ? 'text' : 'password'" v-model="password" required
                                placeholder="Enter your password" />
                            <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                                <img :src="showPassword
                                    ? '/images/eye-svgrepo-com.svg'
                                    : '/images/eye-off-svgrepo-com.svg'
                                    " :alt="showPassword ? 'Hide Icon' : 'Show Icon'"
                                    class="password-container__icon" />
                            </button>
                        </div>
                        <p v-if="errors.password" class="error-message">
                            {{ errors.password }}
                        </p>
                    </div>
                    <div v-if="isRegister" class="input-field">
                        <label>Confirm Password</label>
                        <div class="password-container">
                            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" required
                                placeholder="Confirm your password" />
                            <button type="button" class="toggle-password" @click="toggleConfirmPasswordVisibility">
                                <img :src="showConfirmPassword
                                    ? '/images/eye-svgrepo-com.svg'
                                    : '/images/eye-off-svgrepo-com.svg'
                                    " :alt="showConfirmPassword ? 'Hide Icon' : 'Show Icon'"
                                    class="password-container__icon" />
                            </button>
                        </div>
                        <p v-if="errors.confirmPassword" class="error-message">
                            {{ errors.confirmPassword }}
                        </p>
                    </div>
                    <button type="submit" class="submit-btn button-55" :disabled="authStore.loading">
                        {{
                            authStore.loading
                                ? "Processing..."
                                : isRegister
                                    ? "Register" : "Login"
                        }}
                    </button>
                </form>
                <p>{{
                    isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"
                }}
                    <a @click="toggleAuthMode">
                        {{
                            isRegister
                                ? "Login"
                                : "Register"
                        }}
                    </a>
                </p>
                <p v-if="authStore.error" class="error-message">
                    {{ authStore.error }}
                </p>
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
        const showPassword = ref(false); // State to toggle password visibility
        const showConfirmPassword = ref(false); // State for confirm password visibility
        const errors = ref({ email: "", password: "", confirmPassword: "" });

        const togglePasswordVisibility = () => {
            showPassword.value = !showPassword.value;
        };

        const toggleConfirmPasswordVisibility = () => {
            showConfirmPassword.value = !showConfirmPassword.value;
        };

        const toggleAuthMode = () => {
            isRegister.value = !isRegister.value;
        };

        const validateForm = () => {
            errors.value.email = email.value ? "" : "Email is required";
            errors.value.password = password.value ? "" : "Password is required";
            if (isRegister.value) {
                errors.value.confirmPassword =
                    password.value === confirmPassword.value
                        ? ""
                        : "Passwords do not match";
            }
            return (
                !errors.value.email &&
                !errors.value.password &&
                (!isRegister.value || !errors.value.confirmPassword)
            );
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
            showPassword,
            showConfirmPassword,
            errors,
            togglePasswordVisibility,
            toggleConfirmPasswordVisibility,
            toggleAuthMode,
            handleSubmit,
        };
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

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

    p {
        padding: 1rem
    }
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
    padding: 1rem 0;
}

.input-field label {
    text-align: left;
    font-size: 16px;
    color: #333;
}

.input-field input {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.password-container {
    display: flex;
    align-items: center;
    position: relative;

    &__icon {
        width: 2rem;
    }

    input {
        flex: 1;
    }

    .toggle-password {
        background: none;
        border: none;
        color: $primary-color;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
        padding: 5px;

        &:hover {
            color: color.scale($primary-color, $lightness: -10%);
        }
    }
}

.submit-btn {
    width: 100%;
    padding: 10px;
    background-color: $primary-color;
    border: none;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: color.scale($primary-color, $lightness: -10%);
    }
}
</style>
