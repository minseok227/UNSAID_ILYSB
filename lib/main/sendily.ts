// lib/fetch/useSendIly.ts
import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export async function sendIly(to_user_id: string): Promise<'success' | 'duplicate' | 'error'> {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/ily/send`, {
      method: 'POST',
      body: JSON.stringify({ to_user_id }),
    })

    const body = await res.json()

    if (res.status === 409) return 'duplicate'
    if (res.status === 200) return 'success'

    console.error(`❌ /api/ily/send failed [${res.status}]:`, body)
    return 'error'
  } catch (err) {
    console.error('❌ Error sending ILY:', err)
    return 'error'
  }
}

export function useSendIly() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendIly,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ilyList'] }) // ILY 리스트 갱신
    }
  })
}