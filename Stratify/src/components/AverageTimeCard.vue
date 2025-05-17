<template>
  <Card class="custom-card">
    <template #content>
      <div class="text-sm">Média total de horas:</div>
      <div class="total_number">
        {{ averageTime !== null ? averageTime : '0' + 'h'}}
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';

defineProps<{
  averageTime: number|null
}>();
</script>

<style scoped>
.custom-card {
  background: #fff;
  border: 1px solid #5739B4;
  border-radius: 12px;
  width: 100%;
  height: 7em;
}
.total_number {
  font-weight: 600;
  font-size: 2em;
}
</style>
