<template>
  <Card class="p-4 text-white custom-card" id="totalCards" @click="fetchTotalCards">
    <template #content>
      <div class="text-sm">Cards totais</div>
      <div class="text-3xl font-bold">{{ totalCards }}</div>
    </template>
  </Card>
</template>

<script>
import axios from 'axios';
import Card from 'primevue/card';

export default {
  components: { Card },
  data() {
    return {
      totalCards: '---',
    };
  },
  methods: {
    async fetchTotalCards() {
      try {
        const response = await axios.get('http://localhost:8080/total-cards');
        this.totalCards = response.data;
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        this.totalCards = '---';
      }
    }
  },
  mounted() {
    this.fetchTotalCards();
  }
};
</script>

<style scoped>
.custom-card {
  background: linear-gradient(135deg, #5aa17e, #468f66);
  border-radius: 15px;
  color: white;
  width: 25em;
  height: 8em;
  cursor: pointer;
  transition: transform 0.2s;
}

.custom-card:hover {
  transform: scale(1.05);
}

.text-sm {
  font-size: 1.2rem;
}
</style>
