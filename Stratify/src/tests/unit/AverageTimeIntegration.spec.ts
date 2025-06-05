import { describe, it, expect, vi, beforeEach } from 'vitest'
import AverageTimeService from '@/services/AverageTimeService'
import UserStoryService from '@/services/userStoryService'
import { api } from '@/services/apiConfig'

vi.mock('@/services/apiConfig', () => ({
  api: {
    get: vi.fn()
  }
}))

describe('Integração: AverageTimeService + UserStoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar tempo médio e total de cards e calcular eficiência', async () => {
    // Simula resposta do tempo médio
    ;(api.get as any)
      .mockResolvedValueOnce({ data: { tempoMedio: 5 } }) // AverageTimeService
      .mockResolvedValueOnce({ data: { total: 20 } }) // UserStoryService

    // Chamada para os dois serviços
    const tempoMedio = await AverageTimeService.getAverageTime(1, 2)
    const totalCards = await UserStoryService.getTotalCards(1, 2)

    // Simulação de cálculo de eficiência (exemplo simples)
    const eficiencia = totalCards.total / tempoMedio.tempoMedio

    // Verificações
    expect(api.get).toHaveBeenNthCalledWith(1, '/fatoeficiencia/media-tempo', {
      params: { projetoId: 1, usuarioId: 2 }
    })

    expect(api.get).toHaveBeenNthCalledWith(2, '/userStory/total-cards', {
      params: { idProjeto: 1, idUsuario: 2 }
    })

    expect(tempoMedio.tempoMedio).toBe(5)
    expect(totalCards.total).toBe(20)
    expect(eficiencia).toBe(4)
  })
})
