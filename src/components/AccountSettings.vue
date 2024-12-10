<template>
  <div id="account-settings">
    <h1>Account Settings</h1>
    <form @submit.prevent="changePassword">
      <div class="input-field">
        <label for="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          v-model="currentPassword"
          required
        />
      </div>
      <div class="input-field">
        <label for="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          required
        />
      </div>
      <button type="submit" class="submit-btn">Change Password</button>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </form>
    <UserModal
      :showUserModal="showUserModal"
      @close="toggleUserModal"
      v-if="!user"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import UserModal from "./UserModal.vue";

export default {
  name: "AccountSettings",
  components: { UserModal },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const currentPassword = ref("");
    const newPassword = ref("");
    const showUserModal = ref(false);

    const toggleUserModal = () => {
      showUserModal.value = !showUserModal.value;
    };

    const changePassword = async () => {
      try {
        // Pass both current and new passwords to changePassword method
        await authStore.changePassword(
          currentPassword.value,
          newPassword.value
        );
        alert("Password changed successfully!");
      } catch (error) {
        console.error("Error changing password:", error.message);
        alert("Failed to change password. Please try again.");
      }
    };

    const handleLogout = async () => {
      await authStore.logout();
      toggleUserModal(); // Show login modal
      router.push("/"); // Redirect to home after logout
    };

    return {
      currentPassword,
      newPassword,
      changePassword,
      handleLogout,
      showUserModal,
      toggleUserModal,
      user: computed(() => authStore.user),
    };
  },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

#account-settings {
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

.submit-btn,
.logout-btn {
  width: 100%;
  padding: 10px;
  margin: 10px;
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
