<template>
  <div class="reset-password">
    <h2>Reset Password</h2>
    <form @submit.prevent="handlePasswordReset">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <button type="submit" :disabled="loading">Send Reset Link</button>
      <p v-if="message" class="success-message">{{ message }}</p>
      <p v-if="error" class="error-message">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

export default {
  name: "ResetPassword",
  setup() {
    const email = ref("");
    const message = ref(null);
    const error = ref(null);
    const loading = ref(false);
    const authStore = useAuthStore();

    const handlePasswordReset = async () => {
      loading.value = true;
      message.value = null;
      error.value = null;

      try {
        message.value = await authStore.resetPassword(email.value);
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      message,
      error,
      loading,
      handlePasswordReset,
    };
  },
};
</script>

<style scoped>
.reset-password {
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1rem;
  color: #28a745;
}

.error-message {
  margin-top: 1rem;
  color: #dc3545;
}
</style>
