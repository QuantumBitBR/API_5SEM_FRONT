<template>
  <Card class="custom-card">
    <template #content>
      <div class="text-sm">Cards totais</div>
      <div class="total_number">
        {{ totalCards !== null ? totalCards : '0' }}
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import Card from 'primevue/card';
import { useQuantitativeStore } from '@/stores/QuantitativeCardsStorage';

const props = defineProps({
  selectedProject: {
    type: Object,
    default: null
  },
  selectedUser: {
    type: Object,
    default: null
  }
});

const store = useQuantitativeStore();

const totalCards = computed(() => store.totalCards);

function updateTotal() {
  const proj = props.selectedProject;
  const usr  = props.selectedUser;
  if (proj && usr) {
    store.fetchTotalCards(proj.id, usr.idUsuario);
  } else {
    store.totalCards = null;
  }
}

watch(
  () => [props.selectedProject, props.selectedUser],
  updateTotal
);

onMounted(() => {
  updateTotal();
});
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
