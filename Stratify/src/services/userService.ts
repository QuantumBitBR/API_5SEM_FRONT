import { api } from '@/services/apiConfig';

export interface UsuarioInfo {
  id: number;
  nome: string;
  email: string;
  role: string;
  gestorNome: string | null;
  requireReset: boolean;
  isEnable: boolean;
}

const userService = {
  async listarUsuarios(): Promise<UsuarioInfo[]> {
    // Garante que usa a instância do api com interceptores de token
    const response = await api.get<UsuarioInfo[]>('/usuario/listar');
    return response.data;
  },

  async ativarUsuario(id: number): Promise<void> {
    await api.put(`/usuario/${id}/ativar`);
  },

  async desativarUsuario(id: number): Promise<void> {
    await api.put(`/usuario/${id}/desativar`);
  },

  async resetarSenha(id: number): Promise<void> {
    await api.put(`/admin-reset-senha/${id}`);
  }
};

export default userService;
