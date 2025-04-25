<template>
    <div class="login-container">
        <div class="flex flex-col items-center mb-3">
            <span class="text-black text-3xl mb-3">Welcome Back</span>
            <span class="text-black text-base">Enter your credentials to access the system</span>
        </div>

        <form @submit.prevent="login" class="all_forms">
            <div class="form-group icon-input">
                <label for="email" class="text-black">E-Mail:</label>
                <div class="input-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#5739B4" viewBox="0 0 24 24" class="input-icon">
                        <path fill-rule="evenodd"
                            d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
                            clip-rule="evenodd" />
                    </svg>
                    <input type="text" id="email" v-model="email" required placeholder="Type here your E-Mail" />
                </div>
            </div>

            <div class="form-group icon-input">
                <label for="password" class="text-black">Password:</label>
                <div class="input-wrapper">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="#5739B4" viewBox="0 0 24 24" class="input-icon">
                        <path fill-rule="evenodd"
                            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                            clip-rule="evenodd" />
                    </svg>
                    <input type="password" id="password" v-model="password" required
                        placeholder="Type here your Password" />
                </div>
            </div>

            <button type="submit">Sign In</button>
        </form>

    </div>
</template>

<script>
import loginService from '@/services/loginService';
import { showToast } from '@/eventBus';
import Cookies from "js-cookie";

export default {
    data() {
        return {
            email: "admin@gmail.com",
            password: "QuantumBit321!",
        };
    },
    methods: {
        async login() {
            try {
                const user = await loginService.doLogin(this.email, this.password);


                if(user.changePassword){
                    Cookies.set("userMail", this.email);
                    Cookies.set("userId", user.userId);
                    this.$router.push("/reset");
                }else{
                    showToast({
                        severity: 'success',
                        summary: 'Login bem-sucedido',
                        detail: 'Login realizado com sucesso',
                        life: 3000
                    });
                    this.$router.push("/dashboard");
                }

            } catch (error) {
                console.error(error);

                if (error instanceof TypeError) {
                    showToast({
                        severity: 'error',
                        summary: 'Erro ao fazer login',
                        detail: 'Missing required fields',
                        life: 3000
                    });


                    this.$router.push("/dashboard");
                } else if (error instanceof Error && error.message) {
                    showToast({
                        severity: 'error',
                        summary: 'Erro ao fazer login',
                        detail: error.message,
                        life: 3000
                    });
                } else {
                    console.error('Erro interno no login:', error);
                }
            }
        }

    },
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
    /* espaço pro ícone */
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