// Service (AverageTimeService.ts)
import api from "@/services/apiConfig";

class AverageTimeService {
  async getAverageTime(projectId: any) {
    try {
      console.log("Buscando dados do projeto com ID:", projectId);
      const response = await api.get(`/fatoeficiencia/total?projetoId=${projectId}`);
      console.log("Dados do projeto:", response.data);
      return response.data;

    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
      throw error;
    }
  }
}


export default new AverageTimeService();

