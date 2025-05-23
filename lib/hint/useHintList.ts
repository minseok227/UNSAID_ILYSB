// lib/hooks/useHintList.ts

import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
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
      const body = await res.json()

      if (!res.ok) {
        console.error(`❌ API /api/hint/list failed [${res.status}]:`, body)
        throw new Error(body.error || '힌트 목록 불러오기 실패')
      }

      if (!Array.isArray(body)) {
        console.warn('⚠️ API /api/hint/list 응답이 배열이 아님:', body)
        return []
      }

      if (body.length === 0) {
        console.log('ℹ️ API /api/hint/list 성공했지만 데이터 없음')
        return []
      }

      return body
    },
  })
}