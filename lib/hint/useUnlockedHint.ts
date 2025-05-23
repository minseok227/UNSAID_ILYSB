// app/hooks/useUnlockedHint.ts

import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

interface HintUnlockStatus {
  basic: boolean
  premium_a: boolean
  premium_b: boolean
  sources: string[]
}

export function useUnlockedHint(targetId: string) {
  return useQuery<HintUnlockStatus>({
    queryKey: ['hintUnlocked', targetId],
    queryFn: async () => {
      const res = await authorizedFetch(`${API_BASE_URL}/api/hint/unlocked?target_id=${targetId}`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '힌트 열람 상태 조회 실패')
      }
      return res.json()
    },
    enabled: !!targetId,
  })
}
