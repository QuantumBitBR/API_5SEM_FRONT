import { api } from "./apiConfig";

type Role = "Admin" | "Gestor" | "Funcionário";

class ManagementService {
    async setNewRole(userId: number, role: Role) {
        try {
            const response = await api.put(`/usuario/${userId}`, {
                role: role
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar os dados de tempo médio:", error);
            throw new Error("Erro ao obter dados de tempo médio. Tente novamente mais tarde.");
        }
    }
}

export default new ManagementService();
