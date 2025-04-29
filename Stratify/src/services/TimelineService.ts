import { api } from "./apiConfig";

class TimelineService {
    async quantityPerTimeline(project_id: any, userId: any) {
        try {
            const params: any = {};
            if (project_id !== undefined && project_id !== 0) {
                params.idProjeto = project_id;
            }
            if (userId !== undefined && userId !== 0) {
                params.idUsuario = userId;
            }
            const endpoint = "temporais/projeto";
            const response = await api.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}

export default new TimelineService();
