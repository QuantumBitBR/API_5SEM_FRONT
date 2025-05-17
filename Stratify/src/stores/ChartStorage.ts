// stores/chartStorage.ts
import { defineStore } from 'pinia';
import TimelineService from '@/services/TimelineService';
import TagService      from '@/services/TagService';
import StatusService   from '@/services/StatusService';

interface TimelineItem {
  periodo: string;
  quantidadeCriadas: number;
  quantidadeFinalizadas: number;
}

interface TagItem {
  nomeTag: string;
  quantidade: number;
}

interface StatusItem {
  nomeStatus: string;
  percentual: number;
}

interface ChartState {
  timelineData: TimelineItem[];
  loadingTimeline: boolean;
  tags: TagItem[];
  loadingTags: boolean;
  statusData: StatusItem[];
  loadingStatus: boolean;
}

export const useChartStore = defineStore<'chart', ChartState>('chart', {
  state: (): ChartState => ({
    timelineData: [],
    loadingTimeline: false,
    tags: [],
    loadingTags: false,
    statusData: [],
    loadingStatus: false,
  }),
  actions: {
    async fetchTimeline(projectId: number, userId: number) {
      this.loadingTimeline = true;
      try {
        const resp = await TimelineService.quantityPerTimeline(projectId, userId);
        this.timelineData = Array.isArray(resp) ? resp as TimelineItem[] : [];
      } catch {
        this.timelineData = [];
      } finally {
        this.loadingTimeline = false;
      }
    },
    async fetchTags(projectId: number, userId: number) {
      this.loadingTags = true;
      try {
        const resp = await TagService.quantityPerTag(projectId, userId);
        this.tags = Array.isArray(resp) ? resp as TagItem[] : [];
      } catch {
        this.tags = [];
      } finally {
        this.loadingTags = false;
      }
    },

    async fetchStatus(projectId: number, userId: number) {
      this.loadingStatus = true;
      try {
        const resp = await StatusService.quantityPerStatus(projectId, userId);
        this.statusData = Array.isArray(resp) ? resp as StatusItem[] : [];
      } catch {
        this.statusData = [];
      } finally {
        this.loadingStatus = false;
      }
    }
  }
});
