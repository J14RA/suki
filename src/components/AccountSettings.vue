<template>
    <div>
        <h1>Account Settings</h1>
        <form @submit.prevent="changePassword">
            <div class="input-field">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" v-model="currentPassword" required />
            </div>
            <div class="input-field">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" v-model="newPassword" required />
            </div>
            <button type="submit" class="submit-btn">Change Password</button>
        </form>
        <button @click="handleLogout" class="logout-btn">Logout</button>
        <UserModal :showUserModal="showUserModal" @close="toggleUserModal" v-if="!user" />
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
                await authStore.changePassword(newPassword.value);
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
            user: computed(() => authStore.user) // Fix: Added missing computed property
        };
    }
};
</script>

<style scoped>
.input-field {
    margin-bottom: 10px;
}

.submit-btn,
.logout-btn {
    display: block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.submit-btn:hover,
.logout-btn:hover {
    background-color: #2980b9;
}
</style>
