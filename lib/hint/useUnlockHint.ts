// app/hooks/useUnlockHint.ts

import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UnlockHintParams {
  target_id: string
  hint_type: 'premium_a' | 'premium_b'
  source: 'invite' | 'payment'
}

export function useUnlockHint() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ target_id, hint_type, source }: UnlockHintParams) => {
      const res = await authorizedFetch(`${API_BASE_URL}/api/hint/view`, {
        method: 'POST',
        body: JSON.stringify({ target_id, hint_type, source })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '힌트 해금 실패')
      }

      return res.json()
    },
    onSuccess: (_, { target_id }) => {
      queryClient.invalidateQueries({ queryKey: ['hintList'] })
      queryClient.invalidateQueries({ queryKey: ['hintUnlocked', target_id] })
    }
  })
}
