<template>
  <Card class="p-4 text-white custom-card" id="totalCards">
    <template #content>
      <div class="text-sm">Cards totais</div>
      <div class="text-3xl font-bold">{{ totalCards }}</div>
    </template>
  </Card>
</template>

<script lang="js">
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
        const response = await axios.get(''); // API endpoint
        this.totalCards = response.data.total || '---';
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        this.totalCards = '---';
      }
    },
  },
  mounted() {
    this.fetchTotalCards();
  },
};
</script>

<style scoped>
.custom-card {
  background: #fff;
  border-radius: 0;
  color: black;
  width: 100%;
  height: 7em;
}
</style>
