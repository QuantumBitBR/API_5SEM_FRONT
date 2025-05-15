// stores/chartStorage.ts
import { defineStore } from 'pinia';
import TimelineService from '@/services/TimelineService';

interface TimelineItem {
  periodo: string;
  quantidadeCriadas: number;
  quantidadeFinalizadas: number;
}

interface ChartState {
  timelineData: TimelineItem[];
  loadingTimeline: boolean;
}

export const useChartStore = defineStore<'chart', ChartState>('chart', {
  state: (): ChartState => ({
    timelineData: [],
    loadingTimeline: false,
  }),
  actions: {
    async fetchTimeline(projectId: number, userId: number) {
      this.loadingTimeline = true;
      try {
        const resp = await TimelineService.quantityPerTimeline(projectId, userId);
        this.timelineData = Array.isArray(resp)
          ? (resp as TimelineItem[])
          : [];
      } catch (err) {
        console.error('Erro ao buscar timeline:', err);
        this.timelineData = [];
      } finally {
        this.loadingTimeline = false;
      }
    }
  }
});
