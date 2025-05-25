import { api } from '@/services/apiConfig';

export interface UsuarioInfo {
  habilitado: any;
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

  async listarGestores(): Promise<UsuarioInfo[]> {
    // Garante que usa a instância do api com interceptores de token
    const response = await api.get<UsuarioInfo[]>('/usuario/por-role/GESTOR');
    return response.data;
  },


  async ativarUsuario(id: number): Promise<void> {
    await api.put(`/usuario/${id}/ativar`);
  },

  async desativarUsuario(id: number): Promise<void> {
    await api.put(`/usuario/${id}/desativar`);
  },

  async resetarSenha(id: number): Promise<void> {
    await api.post('/usuario/admin-reset-senha', { idUsuario: id });
  },

  async atribuirGestor(userId: number, newGestorId: number): Promise<void> {
    await api.post('/usuario/lideradosgestor', { idUsuarioGestor: newGestorId, listaIdLiderados: [userId] });
  }

};

export default userService;
