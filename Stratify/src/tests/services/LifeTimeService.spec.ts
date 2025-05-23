import { describe, it, expect, vi, beforeEach } from 'vitest'
import lifeTimeService from '@/services/lifeTimeService'
import { api } from '@/services/apiConfig'

vi.mock('@/services/apiConfig', () => ({
  api: {
    get: vi.fn()
  }
}))

describe('LifeTimeService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar tempo médio com os parâmetros corretos', async () => {
    (api.get as any).mockResolvedValue({ data: { tempoMedio: 4.5 } })

    const result = await lifeTimeService.quantityPerProject(1, 2)

    expect(api.get).toHaveBeenCalledWith('/fatoeficiencia/projeto', {
      params: {
        projetoId: 1,
        usuarioId: 2
      }
    })
    expect(result.tempoMedio).toBe(4.5)
  })
})