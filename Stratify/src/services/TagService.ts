import { api } from "./apiConfig";

class TagService {
    async quantityPerTag(project_id: any, userId: number) {
        try {
            const params: any = {};
            if (project_id.id !== 0) {
                params.projetoId = project_id.id;
            }
            if (userId !== undefined && userId !== 0) {
                params.userId = userId;
            }
            const endpoint = "fatoProgresso/quantidade-por-etiqueta";
            const response = await api.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error("Erro to get data:", error);
            throw error;
        }
    }
}

export default new TagService();
