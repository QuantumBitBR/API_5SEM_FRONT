// stores/chartStorage.ts
import { defineStore } from 'pinia';
import TimelineService from '@/services/TimelineService';
import TagService from '@/services/TagService';

interface TimelineItem {
  periodo: string;
  quantidadeCriadas: number;
  quantidadeFinalizadas: number;
}

interface TagItem {
  nomeTag: string;
  quantidade: number;
}

interface ChartState {
  timelineData: TimelineItem[];
  loadingTimeline: boolean;
  tags: TagItem[];
  loadingTags: boolean;
}

export const useChartStore = defineStore<'chart', ChartState>('chart', {
  state: (): ChartState => ({
    timelineData: [],
    loadingTimeline: false,
    tags: [],
    loadingTags: false,
  }),
  actions: {
    async fetchTimeline(projectId: number, userId: number) {
      this.loadingTimeline = true;
      try {
        const resp = await TimelineService.quantityPerTimeline(projectId, userId);
        this.timelineData = Array.isArray(resp) ? (resp as TimelineItem[]) : [];
      } catch (err) {
        console.error('Erro ao buscar timeline:', err);
        this.timelineData = [];
      } finally {
        this.loadingTimeline = false;
      }
    },

    async fetchTags(projectId: number, userId: number) {
      this.loadingTags = true;
      try {
        const resp = await TagService.quantityPerTag(projectId, userId);
        this.tags = Array.isArray(resp) ? (resp as TagItem[]) : [];
      } catch (err) {
        console.error('Erro ao buscar tags:', err);
        this.tags = [];
      } finally {
        this.loadingTags = false;
      }
    }
  }
});
