import { api } from "./apiConfig";

interface UserStoryInfo {
  sprint: string;
  quantidade: number;
}

class UserStoryService {

  async getQuantityBySprint(
    projectId?: number,
    userId?: number
  ): Promise<UserStoryInfo[]> {
    try {
      const params: Record<string, any> = {};
      
      if (projectId !== undefined && projectId !== 0) {
        params.projetoId = projectId;
      }
      
      if (userId !== undefined && userId !== 0) {
        params.usuarioId = userId;
      }

      const response = await api.get<UserStoryInfo[]>(
        "/userStory/quantidade-por-sprint",
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching sprints data:", error);
      throw error;
    }
  }

  /**
   * Obtém o total de cards com filtros opcionais
   * @param projectId ID do projeto (opcional)
   * @param userId ID do usuário (opcional)
   * @returns Objeto com o total de cards
   */
  async getTotalCards(
    projectId?: number,
    userId?: number
  ): Promise<{ total: number }> {
    try {
      const params: Record<string, any> = {};
      
      if (projectId !== undefined && projectId !== 0) {
        params.idProjeto = projectId;
      }
      
      if (userId !== undefined && userId !== 0) {
        params.idUsuario = userId;
      }

      const response = await api.get<{ total: number }>(
        "/userStory/total-cards",
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching total cards:", error);
      throw error;
    }
  }
}

export default new UserStoryService();