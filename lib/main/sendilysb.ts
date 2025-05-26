import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export interface SendIlysbParams {
  to_user_id: string
  message: string
  emotion_category: number
}

type SendIlysbResponse =
  | { status: 'success' }
  | { status: 'duplicate'; error: string }
  | { status: 'error'; error: string }

export async function sendIlysb(params: SendIlysbParams): Promise<SendIlysbResponse> {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/ilysb/send`, {
      method: 'POST',
      body: JSON.stringify(params),
    })

    const body = await res.json()

    if (res.status === 409) {
      return { status: 'duplicate', error: body?.error || '이미 ILYSB를 보냈습니다.' }
    }

    if (res.ok) {
      return { status: 'success' }
    }

    return { status: 'error', error: body?.error || 'Unknown error' }
  } catch (err) {
    console.error('❌ Error sending ILYSB:', err)
    return { status: 'error', error: 'Network error' }
  }
}

export function useSendIlysb(onSuccessCallback: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendIlysb,
    onSuccess: (res) => {
      if (res.status === 'success') {
        queryClient.invalidateQueries({ queryKey: ['ilyList'] })
        onSuccessCallback()
      }
    },
    onError: (err) => {
      console.error('❌ useSendIlysb mutation error:', err)
    }
  })
}