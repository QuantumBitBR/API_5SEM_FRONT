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

describe('LoginService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve fazer login com email e senha válidos', async () => {
    const mockToken = 'abc123token'
    const mockResponse = { data: { token: mockToken }, status: 200 }
    ;(login_api.post as any).mockResolvedValue(mockResponse)

    const result = await LoginService.doLogin('usuario@teste.com', 'senha123')

    expect(login_api.post).toHaveBeenCalledWith('/auth', {
      email: 'usuario@teste.com',
      senha: 'senha123'
    })
    expect(tokenService.storeToken).toHaveBeenCalledWith(mockToken)
    expect(result.token).toBe(mockToken)
  })

  it('deve lançar erro se campos estiverem vazios', async () => {
    await expect(LoginService.doLogin('', '')).rejects.toThrow('Missing required fields')
  })

  it('deve resetar senha corretamente', async () => {
    ;(api.put as any).mockResolvedValue({ status: 200 })

    const result = await LoginService.changePassword(1, 'novaSenha123')

    expect(api.put).toHaveBeenCalledWith('/usuario/resetar-senha', {
      idUsuario: 1,
      novaSenha: 'novaSenha123'
    })
    expect(result).toBe(true)
  })
})
