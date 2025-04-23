<template>
  <Toast />
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { Toast } from 'primevue';
import { useToast } from 'primevue/usetoast';
import { RouterView } from 'vue-router';
import { onToast, offToast } from '@/eventBus';

const toast = useToast();

function handleToast(payload: any) {
  toast.add(payload);
}

onMounted(() => {
  onToast(handleToast);
});

onBeforeUnmount(() => {
  offToast(handleToast);
});
</script>

<style>
@import 'primeicons/primeicons.css';
</style>
