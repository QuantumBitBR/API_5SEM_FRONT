// Service (AverageTimeService.ts)
import { api } from "@/services/apiConfig";

class AverageTimeService {
  async getAverageTime(projectId: any, userId: any) {
    try {
      const params: any = {};

      if (projectId !== undefined && projectId !== 0) {
        params.projetoId = projectId;
      }

      if (userId !== undefined && userId !== 0) {
        params.usuarioId = userId;
      }

      const response = await api.get("/fatoeficiencia/media-tempo", { params });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      throw error;
    }
  }
}

export default new AverageTimeService();
