import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginService from '@/services/loginService'
import { api, login_api } from '@/services/apiConfig'
import tokenService from '@/services/TokenService'

vi.mock('@/services/apiConfig', () => ({
  api: {
    put: vi.fn()
  },
  login_api: {
    post: vi.fn()
  }
}))

vi.mock('@/services/TokenService', () => ({
  default: {
    storeToken: vi.fn()
  }
}))

describe('LoginService - integração', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve fazer login e em seguida alterar a senha com sucesso', async () => {
    const mockToken = 'tokenIntegracao123'
    // Mock login_api.post para retornar token
    ;(login_api.post as any).mockResolvedValue({ data: { token: mockToken }, status: 200 })
    // Mock api.put para alteração de senha
    ;(api.put as any).mockResolvedValue({ status: 200 })

    // Passo 1: login
    const loginResult = await LoginService.doLogin('user@integ.com', 'senhaInteg')

    expect(login_api.post).toHaveBeenCalledWith('/auth', {
      email: 'user@integ.com',
      senha: 'senhaInteg'
    })
    expect(tokenService.storeToken).toHaveBeenCalledWith(mockToken)
    expect(loginResult.token).toBe(mockToken)

    // Passo 2: alterar senha
    const changePassResult = await LoginService.changePassword(42, 'novaSenhaInteg')

    expect(api.put).toHaveBeenCalledWith('/usuario/resetar-senha', {
      idUsuario: 42,
      novaSenha: 'novaSenhaInteg'
    })
    expect(changePassResult).toBe(true)
  })
})
