import { api } from "./apiConfig";

interface QuantidadeCardsPorSprintDTO {
  sprint: string;
  quantidade: number;
}

interface QuantidadeCardsPorTagDTO {
  tag: string;
  quantidade: number;
}

interface PercentualStatusUsuarioDTO {
  status: string;
  percentual: number;
}

interface TotalCardsDTO {
  total: number;
}

class UserStoryService {
  /**
   * Obtém o total de cards com filtros opcionais
   * @param idProjeto ID do projeto (opcional)
   * @param idUsuario ID do usuário (opcional)
   * @returns Objeto com o total de cards
   */
  async getTotalCards(
    idProjeto?: number,
    idUsuario?: number
  ): Promise<TotalCardsDTO> {
    try {
      const params: Record<string, any> = {};
      
      if (idProjeto !== undefined && idProjeto !== 0) {
        params.idProjeto = idProjeto;
      }
      
      if (idUsuario !== undefined && idUsuario !== 0) {
        params.idUsuario = idUsuario;
      }

      const response = await api.get<TotalCardsDTO>(
        "/userStory/total-cards",
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching total cards:", error);
      throw error;
    }
  }

  /**
   * Obtém a quantidade de user stories por sprint
   * @param projetoId ID do projeto (opcional)
   * @param usuarioId ID do usuário (opcional)
   * @returns Lista de sprints com suas quantidades
   */
  async getQuantidadePorSprint(
    projetoId?: number,
    usuarioId?: number
  ): Promise<QuantidadeCardsPorSprintDTO[]> {
    try {
      const params: Record<string, any> = {};
      
      if (projetoId !== undefined && projetoId !== 0) {
        params.projetoId = projetoId;
      }
      
      if (usuarioId !== undefined && usuarioId !== 0) {
        params.usuarioId = usuarioId;
      }
      
      const response = await api.get<QuantidadeCardsPorSprintDTO[]>(
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
   * Obtém a quantidade de user stories por tag
   * @param projetoId ID do projeto (opcional)
   * @param usuarioId ID do usuário (opcional)
   * @returns Lista de tags com suas quantidades
   */
  async getQuantidadePorTag(
    projetoId?: number,
    usuarioId?: number
  ): Promise<QuantidadeCardsPorTagDTO[]> {
    try {
      const params: Record<string, any> = {};
      
      if (projetoId !== undefined && projetoId !== 0) {
        params.projetoId = projetoId;
      }
      
      if (usuarioId !== undefined && usuarioId !== 0) { 
        params.usuarioId = usuarioId;
      }

      const response = await api.get<QuantidadeCardsPorTagDTO[]>(
        "/userStory/quantidade-por-tag",
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching tags data:", error);
      throw error;
    }
  }

  /**
   * Obtém o percentual de user stories por status
   * @param projetoId ID do projeto (opcional)
   * @param usuarioId ID do usuário (opcional)
   * @returns Lista de status com seus percentuais
   */
  async getPercentualPorStatus(
    projetoId?: number,
    usuarioId?: number
  ): Promise<PercentualStatusUsuarioDTO[]> {
    try {
      const params: Record<string, any> = {};
      
      if (projetoId !== undefined && projetoId !== 0) {
        params.projetoId = projetoId;
      }
      
      if (usuarioId !== undefined && usuarioId !== 0) {
        params.usuarioId = usuarioId;
      }

      const response = await api.get<PercentualStatusUsuarioDTO[]>(
        "/userStory/percentual-por-status",
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching status data:", error);
      throw error;
    }
  }
}

export default new UserStoryService();