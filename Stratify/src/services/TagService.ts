import { api } from "./apiConfig";

class TagService {
    async quantityPerTag(project_id: any, userId: any) {
        try {
            const params: any = {};
            if (project_id !== undefined && project_id !== 0) {
                params.projetoId = project_id;
            }
            if (userId !== undefined && userId !== 0) {
                params.usuarioId = userId;
            }
            const endpoint = "userStory/quantidade-por-tag";
            const response = await api.get(endpoint, { params });
            return response.data;
        } catch (error) {
            console.error("Erro to get data:", error);
            return [];
        }
    }
}

export default new TagService();
