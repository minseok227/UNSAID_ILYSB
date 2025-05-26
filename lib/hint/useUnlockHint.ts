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

      const body = await res.json()

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error('초대에 참여한 사용자만 힌트를 열람할 수 있어요.')
        } else if (res.status === 409) {
          throw new Error('이미 열람한 힌트입니다.')
        } else {
          throw new Error(body.error || '힌트 해금 실패')
        }
      }

      return body
    },
    onSuccess: (_, { target_id }) => {
      queryClient.invalidateQueries({ queryKey: ['hintList'] })
      queryClient.invalidateQueries({ queryKey: ['hintUnlocked', target_id] })
    }
  })
}