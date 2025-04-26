<template>
    <div class="login-container">
        <div class="flex flex-col items-center mb-3">
            <span class="text-black text-3xl mb-3">Reset Password</span>
            <span class="text-black text-base">Enter your new password below</span>
        </div>

        <form @submit.prevent="resetPassword" class="all_forms">
            <div class="form-group icon-input">
                <label for="newPassword" class="text-black">New Password:</label>
                <div class="input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#5739B4" viewBox="0 0 24 24" class="input-icon">
                        <path fill-rule="evenodd"
                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    <input type="password" id="newPassword" v-model="newPassword" required placeholder="Type your new password" />
                </div>
            </div>

            <div class="form-group icon-input">
                <label for="confirmPassword" class="text-black">Confirm Password:</label>
                <div class="input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#5739B4" viewBox="0 0 24 24" class="input-icon">
                        <path fill-rule="evenodd"
                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required placeholder="Confirm your new password" />
                </div>
            </div>

            <button type="submit">Reset Password</button>
        </form>
    </div>
</template>

<script>
import { showToast } from '@/eventBus';
import loginService from '@/services/loginService';
import tokenService from '@/services/tokenService';
import Cookies from "js-cookie";


export default {
    data() {
        return {
            newPassword: "",
            confirmPassword: "",
        };
    },
    methods: {
        async resetPassword() {
            if (this.newPassword !== this.confirmPassword) {
                showToast({
                    severity: 'error',
                    summary: 'Passwords do not match',
                    detail: 'Please make sure both passwords are the same.',
                    life: 3000
                });
                return;
            }

            try {
                const id = Number(this.$route.query.id);
                const reseting = await loginService.changePassword(id, this.newPassword);

                if(reseting){
                    showToast({
                        severity: 'success',
                        summary: 'Password Reset',
                        detail: 'Your password has been successfully updated.',
                        life: 3000
                    });
                }else{
                    showToast({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'An error occurred to change password.',
                        life: 3000
                    });
                }

                this.$router.push("/");
            } catch (error) {
                console.error(error);
                showToast({
                    severity: 'error',
                    summary: 'Reset Error',
                    detail: error.message || 'Failed to reset password.',
                    life: 3000
                });
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 400px;
    padding: 30px;
    border-radius: 16px;
    text-align: left;
    background-color: #f9f9f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

.input-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    pointer-events: none;
}

input {
    width: 100%;
    padding: 8px 8px 8px 36px;
    box-sizing: border-box;
    border: 1px solid #5739B4;
    border-radius: 8px;
    color: #000;
    outline: none;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #5739B4;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

button:hover {
    background-color: #462d92;
}
</style>
