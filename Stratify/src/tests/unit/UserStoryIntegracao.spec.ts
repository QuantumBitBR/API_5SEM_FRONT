import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserStoryService from '@/services/userStoryService'
import { api } from '@/services/apiConfig'

vi.mock('@/services/apiConfig', () => ({
  api: {
    get: vi.fn()
  }
}))

describe('UserStoryService - integração', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar total de cards, quantidade por sprint, por tag e percentual por status em conjunto', async () => {
    // Respostas simuladas
    const totalCardsResponse = { data: { total: 10 } }
    const porSprintResponse = { data: [{ sprint: 'Sprint 1', quantidade: 5 }] }
    const porTagResponse = { data: [{ tag: 'Bug', quantidade: 3 }] }
    const porStatusResponse = { data: [{ status: 'Done', percentual: 60 }] }

    // Mock sequencial das chamadas (ordem importa)
    ;(api.get as any)
      .mockResolvedValueOnce(totalCardsResponse)
      .mockResolvedValueOnce(porSprintResponse)
      .mockResolvedValueOnce(porTagResponse)
      .mockResolvedValueOnce(porStatusResponse)

    // Execução conjunta do fluxo
    const total = await UserStoryService.getTotalCards(1, 2)
    const sprint = await UserStoryService.getQuantidadePorSprint(1, 2)
    const tag = await UserStoryService.getQuantidadePorTag(1, 2)
    const status = await UserStoryService.getPercentualPorStatus(1, 2)

    // Verificações finais
    expect(api.get).toHaveBeenNthCalledWith(1, '/userStory/total-cards', {
      params: { idProjeto: 1, idUsuario: 2 }
    })
    expect(api.get).toHaveBeenNthCalledWith(2, '/userStory/quantidade-por-sprint', {
      params: { projetoId: 1, usuarioId: 2 }
    })
    expect(api.get).toHaveBeenNthCalledWith(3, '/userStory/quantidade-por-tag', {
      params: { projetoId: 1, usuarioId: 2 }
    })
    expect(api.get).toHaveBeenNthCalledWith(4, '/userStory/percentual-por-status', {
      params: { projetoId: 1, usuarioId: 2 }
    })

    expect(total.total).toBe(10)
    expect(sprint[0]).toEqual({ sprint: 'Sprint 1', quantidade: 5 })
    expect(tag[0]).toEqual({ tag: 'Bug', quantidade: 3 })
    expect(status[0]).toEqual({ status: 'Done', percentual: 60 })
  })
})
