<template>
    <div class="login-box">
        <LoginBox />
    </div>
</template>

<script>
import LoginBox from '@/components/LoginBox.vue';


export default {
    components: {
        LoginBox,
    },
};
</script>

<style scoped>
.login-box {
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    background: #3D3A72;
    background: linear-gradient(180deg, rgba(61, 58, 114, 1) 0%, rgba(255, 255, 255, 1) 100%);
}
</style>