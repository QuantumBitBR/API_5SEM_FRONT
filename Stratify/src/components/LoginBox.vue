<template>
        <div class="login-container">
            <div class="flex flex-col items-center mb-6">
                <span class="text-black text-3xl">Welcome Back</span>
                <span class="text-black text-base">Enter your credentials to access the system</span>
            </div>
            <div class="all_forms">
                <div class="form-group">
                    <label for="email" class="text-black">E-Mail:</label>
                    <input type="text" id="email" v-model="email" required placeholder="Type here your E-Mail" />
                </div>
                <div class="form-group">
                    <label for="password" class="text-black">Password:</label>
                    <input type="password" id="password" v-model="password" required placeholder="Type here your Password" />
                </div>
            </div>
            <button @click="login">Sign In</button>
        </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login() {
            console.log(`Usuário: ${this.email}, Senha: ${this.password}`);
            // você cuida do resto :)
        },
    },
};
</script>

<style lang="css">


.login-container {
    width: 400px;
    padding: 30px;
    border-radius: 16px;
    text-align: left;
    background-color: #f9f9f9;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
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
