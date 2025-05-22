import { API_BASE_URL } from '@/lib/constants'
import { authorizedFetch } from '@/lib/fetcher'

/**
 * ILY 전송 API 호출
 * @param to_user_id 대상 유저의 UUID
 * @returns 상태 문자열 ('success' | 'duplicate' | 'error')
 */
export async function sendIly(to_user_id: string): Promise<'success' | 'duplicate' | 'error'> {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/ily/send`, {
      method: 'POST',
      body: JSON.stringify({ to_user_id }),
    })
    
    const body = await res.json()

    if (res.status === 409) {
      return 'duplicate'
    }

    if (res.status === 200) {
      return 'success'
    }

    console.error(`❌ /api/ily/send failed [${res.status}]:`, body)
    return 'error'
  } catch (err) {
    console.error('❌ Error sending ILY:', err)
    return 'error'
  }
}