// components/TotalCards.vue
<template>
  <Card class="text-white custom-card" id="totalCards" @click="updateTotalCards">
    <template #content>
      <div class="text-sm">Cards totais</div>
      <div class="total_number">{{ totalCards }}</div>
    </template>
  </Card>
</template>

<script>
import Card from "primevue/card";
import TotalCardsService from "@/services/TotalCardsService";

export default {
  components: { Card },
  data() {
    return {
      totalCards: "---",
    };
  },
  props: {
        selectedProject: null,
        selectedUser: null,
    },
  methods: {
    async updateTotalCards() {
      this.totalCards = await TotalCardsService.fetchTotalCards(this.selectedProject.id, this.selectedUser.idUsuario);
    }
  },
  watch:{
        selectedProject: "updateTotalCards",
        selectedUser: "updateTotalCards",
  },
  mounted() {
    this.updateTotalCards();
  }
};
</script>

<style scoped>
.custom-card {
  background: #fff;
  border-radius: 0;
  color: black;
  width: 100%;
  height: 7em;
  border: 1px solid #5739B4;
  border-radius: 12px;
}

.total_number{
  font-weight: 600;
  font-size: 2em;
}
</style>
