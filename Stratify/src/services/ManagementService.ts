import { api } from "./apiConfig";
import userService from "./userService";

type Role = "Admin" | "Gestor" | "Funcionário";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: Role;
  gestorId?: number;
}

class ManagementService {
  private gestoresCache: Usuario[] | null = null;

  async setNewRole(userId: number, role: Role): Promise<Usuario> {
    try {
      const response = await api.put(`/usuario/${userId}`, { role });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o papel do usuário:", error);
      throw new Error("Erro ao atualizar o papel do usuário. Tente novamente mais tarde.");
    }
  }

  async fetchGestores(): Promise<Usuario[]> {
    try {
      // Se já temos os gestores em cache, retornamos
      if (this.gestoresCache) {
        return this.gestoresCache;
      }

      const data = await userService.listarGestores();

      // Formatamos os dados e armazenamos em cache
      this.gestoresCache = data.map((u: any) => ({
        ...u,
        role: u.role as Role,
        label: u.nome,
        value: u.id
      }));

      return this.gestoresCache;
    } catch (error) {
      console.error('Erro ao buscar gestores:', error);
      throw new Error('Falha ao carregar a lista de gestores.');
    }
  }

  async atribuirGestor(userId: number, newGestorId: number): Promise<void> {
    try {
      await userService.atribuirGestor(userId, newGestorId);

      // Limpa o cache de gestores para garantir dados atualizados
      this.gestoresCache = null;
    } catch (error) {
      console.error('Erro ao atualizar gestor:', error);
      throw new Error('Erro ao atribuir gestor. Verifique os dados e tente novamente.');
    }
  }

  // Método para limpar o cache quando necessário
  clearGestoresCache(): void {
    this.gestoresCache = null;
  }
}

export default new ManagementService();
