// stores/chartStorage.ts
import { defineStore } from 'pinia';
import TimelineService from '@/services/TimelineService';
import TagService      from '@/services/TagService';
import StatusService   from '@/services/StatusService';
import LifeTimeService from '@/services/lifeTimeService';
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

interface LifetimeItem {
  descricao: string;
  tempoMedio: number;
}

interface ChartState {
  timelineData: TimelineItem[];
  loadingTimeline: boolean;
  tags: TagItem[];
  loadingTags: boolean;
  statusData: StatusItem[];
  loadingStatus: boolean;
  lifetimeData: LifetimeItem[];
  loadingLifetime: boolean;
}

export const useChartStore = defineStore<'chart', ChartState>('chart', {
  state: (): ChartState => ({
    timelineData: [],
    loadingTimeline: false,
    tags: [],
    loadingTags: false,
    statusData: [],
    loadingStatus: false,
    lifetimeData: [],
    loadingLifetime: false,
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


    async fetchLifetime(projectId: number, userId: number) {
      this.loadingLifetime = true;
      try {
        const resp = await LifeTimeService.quantityPerProject(projectId, userId);
        this.lifetimeData = Array.isArray(resp)
          ? resp.map(item => ({
              descricao: item.descricao,
              tempoMedio: item.tempoMedio,
              quantidadeRetrabalhos: item.quantidadeRetrabalhos
            }))
          : [];
      } catch {
        this.lifetimeData = [];
      } finally {
        this.loadingLifetime = false;
      }},

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
