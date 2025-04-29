// services/TotalCardsService.ts
import { api } from "@/services/apiConfig";

class TotalCardsService {
  async fetchTotalCards(project_id?: number, userId?: number): Promise<string | number> {
    try {
      const params: any = {};
      
      if (project_id !== undefined && project_id !== 0) {
        params.idProjeto = project_id;
      }
      if (userId !== undefined && userId !== 0) {
        params.idUsuario = userId;
      }

      const response = await api.get("/userStory/total-cards", { params });
      return response.data.quantidadeUserStories;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return "---";
    }
  }
}

export default new TotalCardsService();
