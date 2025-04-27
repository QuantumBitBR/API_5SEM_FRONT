<template lang="">
    <div>
        <div class="info_box">
            <ChangePassBox/>
        </div>
    </div>
</template>
<script>
import ChangePassBox from '@/components/ChangePassBox.vue';

export default {
    components:{
        ChangePassBox
    }
}
</script>
<style lang="css">
    .info_box {
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