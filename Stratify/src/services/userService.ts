import { api } from './apiConfig';

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
    const response = await api.get<UsuarioInfo[]>('/usuario/listar');
    return response.data;
  },

  async ativarUsuario(id: number): Promise<void> {
    await api.put(`/usuario/${id}/ativar`);
  },

  async desativarUsuario(id: number): Promise<void> {
    await api.put(`/usuario/${id}/desativar`);
  }
};

export default userService;
