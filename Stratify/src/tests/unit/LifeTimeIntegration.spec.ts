import { describe, it, expect, vi, beforeEach } from 'vitest'
import lifeTimeService from '@/services/lifeTimeService'
import UserStoryService from '@/services/userStoryService'
import { api } from '@/services/apiConfig'

vi.mock('@/services/apiConfig', () => ({
  api: {
    get: vi.fn()
  }
}))

describe('Integração: LifeTimeService + UserStoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar tempo médio e total de cards corretamente', async () => {
    // Mocks encadeados
    ;(api.get as any)
      .mockResolvedValueOnce({ data: { tempoMedio: 4.5 } }) // LifeTimeService
      .mockResolvedValueOnce({ data: { total: 12 } }) // UserStoryService

    // Chamada para ambos os serviços
    const tempo = await lifeTimeService.quantityPerProject(1, 2)
    const total = await UserStoryService.getTotalCards(1, 2)

    // Verificações
    expect(api.get).toHaveBeenNthCalledWith(1, '/fatoeficiencia/projeto', {
      params: { projetoId: 1, usuarioId: 2 }
    })

    expect(api.get).toHaveBeenNthCalledWith(2, '/userStory/total-cards', {
      params: { idProjeto: 1, idUsuario: 2 }
    })

    expect(tempo.tempoMedio).toBe(4.5)
    expect(total.total).toBe(12)
  })
})
