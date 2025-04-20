// services/TotalCardsService.ts
import {api} from "@/services/apiConfig";

class TotalCardsService {
  async fetchTotalCards(project_id: number): Promise<string | number> {
    try {
      let endpoint = " ";
      if (project_id !== 0) {
        endpoint = `/userStory/total-cards?projetoId=${project_id}`;
      }
      else {
        endpoint = "/userStory/total-cards";
      }
      const response = await api.get<{ quantidadeUserStories: number }>(endpoint);
      return response.data.quantidadeUserStories;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      return "---";
    }
  }
}

export default new TotalCardsService();
