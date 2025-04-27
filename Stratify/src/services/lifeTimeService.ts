import { api } from "./apiConfig";

class LifeTimeService {
  async quantityPerProject(project_id: any, userId: any) {
    console.log(project_id)
    console.log(userId)
    try {
      const params: any = {};

      if (project_id !== undefined && project_id !== 0) {
        params.project_id = project_id;
      }

      if (userId !== undefined && userId !== 0) {
        params.user_id = userId;
      }

      const endpoint = "/fatoeficiencia/projeto";

      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      throw error;
    }
  }
}

export default new LifeTimeService();
