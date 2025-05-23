import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserStoryService from '@/services/userStoryService'
import { api } from '@/services/apiConfig'

vi.mock('@/services/apiConfig', () => ({
  api: {
    get: vi.fn()
  }
}))

describe('UserStoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve buscar total de cards com filtros', async () => {
    const mockResponse = { data: { total: 10 } }
    ;(api.get as any).mockResolvedValue(mockResponse)

    const result = await UserStoryService.getTotalCards(1, 2)

    expect(api.get).toHaveBeenCalledWith('/userStory/total-cards', {
      params: { idProjeto: 1, idUsuario: 2 }
    })
    expect(result.total).toBe(10)
  })

  it('deve buscar quantidade por sprint', async () => {
    const mockResponse = { data: [{ sprint: 'Sprint 1', quantidade: 5 }] }
    ;(api.get as any).mockResolvedValue(mockResponse)

    const result = await UserStoryService.getQuantidadePorSprint(1, 2)

    expect(api.get).toHaveBeenCalledWith('/userStory/quantidade-por-sprint', {
      params: { projetoId: 1, usuarioId: 2 }
    })
    expect(result[0].sprint).toBe('Sprint 1')
    expect(result[0].quantidade).toBe(5)
  })

  it('deve buscar quantidade por tag', async () => {
    const mockResponse = { data: [{ tag: 'Bug', quantidade: 3 }] }
    ;(api.get as any).mockResolvedValue(mockResponse)

    const result = await UserStoryService.getQuantidadePorTag(1, 2)

    expect(api.get).toHaveBeenCalledWith('/userStory/quantidade-por-tag', {
      params: { projetoId: 1, usuarioId: 2 }
    })
    expect(result[0].tag).toBe('Bug')
    expect(result[0].quantidade).toBe(3)
  })

  it('deve buscar percentual por status', async () => {
    const mockResponse = { data: [{ status: 'Done', percentual: 60 }] }
    ;(api.get as any).mockResolvedValue(mockResponse)

    const result = await UserStoryService.getPercentualPorStatus(1, 2)

    expect(api.get).toHaveBeenCalledWith('/userStory/percentual-por-status', {
      params: { projetoId: 1, usuarioId: 2 }
    })
    expect(result[0].status).toBe('Done')
    expect(result[0].percentual).toBe(60)
  })
})
