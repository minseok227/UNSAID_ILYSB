// lib/hooks/useHintList.ts

import { API_BASE_URL } from '@/lib/constants'
import { authorizedFetch } from '@/lib/fetcher'
import { useQuery } from '@tanstack/react-query'

interface HintRow {
  user_id: string
  anonymous_tag: string
  basic: Record<string, unknown>
  premium_a: Record<string, unknown> | null
  premium_b: Record<string, unknown> | null
  sources: string[]
}

export function useHintList() {
  return useQuery<HintRow[]>({
    queryKey: ['hintList'],
    queryFn: async () => {
      const res = await authorizedFetch(`${API_BASE_URL}/api/hint/list`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '힌트 목록 불러오기 실패')
      }
      return res.json()
    },
  })
}