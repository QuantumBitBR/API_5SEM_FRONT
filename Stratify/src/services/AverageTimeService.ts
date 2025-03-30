// Service (AverageTimeService.ts)
import api from "@/services/apiConfig";

class AverageTimeService {
  async getAverageTime(projectId: any) {
    if(projectId !== 0){
      try {
        const response = await api.get(`/fatoeficiencia/total?projetoId=${projectId}`);
        return response.data;

      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        throw error;
      }
    }
  }
}


export default new AverageTimeService();

