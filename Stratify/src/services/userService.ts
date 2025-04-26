// src/services/userService.ts
import {api} from './apiConfig';

export interface UsuarioInfo {
  id: number;
  nome: string;
  email: string;
  role: string;
  gestorNome: string | null;
  requireReset: boolean;
  isEnable: boolean;
}

export default {
  async listarUsuarios(): Promise<UsuarioInfo[]> {
    const { data } = await api.get<UsuarioInfo[]>('/usuario/listar');
    return data;
  }
};

export async function listarUsuarios(): Promise<UsuarioInfo[]> {
  const { data } = await api.get<UsuarioInfo[]>('/usuario/listar');
  return data;
}
