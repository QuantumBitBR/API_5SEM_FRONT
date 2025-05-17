import { defineStore } from 'pinia';
import AverageTimeService from '@/services/AverageTimeService';
import TotalCardsService from '@/services/TotalCardsService';

export const useQuantitativeStore = defineStore('quantitative', {
  state: () => ({
    averageTime: null as number|null,
    loadingAverageTime: false,
    totalCards: null as number|null,
    loadingTotalCards: false,
  }),
  actions: {
    async fetchAverageTime(projectId: any, userId: any) {
      if (projectId == null || userId == null) {
        this.averageTime = null;
        return;
      }
      this.loadingAverageTime = true;
      try {
        const data = await AverageTimeService.getAverageTime(projectId, userId);
        this.averageTime = data?.tempoMedio
          ? parseFloat(data.tempoMedio.toFixed(1))
          : null;
      } catch (error) {
        console.error('Erro ao buscar média de tempo:', error);
        this.averageTime = null;
      } finally {
        this.loadingAverageTime = false;
      }
    },

    async fetchTotalCards(projectId: any, userId: any) {
      if (projectId == null || userId == null) {
        this.totalCards = null;
        return;
      }
      this.loadingTotalCards = true;
      try {
        const result = await TotalCardsService.fetchTotalCards(projectId, userId);
        this.totalCards = typeof result === 'number' ? result : parseInt(result, 10);
      } catch (error) {
        console.error('Erro ao buscar total de cards:', error);
        this.totalCards = null;
      } finally {
        this.loadingTotalCards = false;
      }
    }
  }
});
