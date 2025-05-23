import { authorizedFetch } from '@/lib/auth/fetcher'
import { API_BASE_URL } from '@/lib/constants'
import { useMutation } from '@tanstack/react-query'

export async function submitUserProfile(data: {
  name: string
  birthdate: string
  instagram_username: string
  main_affiliation: string
  sub_affiliation: string
  mbti: string
  favorite_food: string
  hobby: string
  ideal_type: string
  habit: string
  referralCode?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const body = await res.json()
    if (!res.ok) {
      console.error(`❌ API /api/user/profile failed [${res.status}]:`, body)
      return { success: false, error: body?.error || 'Unknown error' }
    }

    return { success: true }
  } catch (err) {
    console.error('❌ submitUserProfile error:', err)
    return { success: false, error: 'Network error' }
  }
}

export function useSubmitUserProfile() {
  return useMutation({
    mutationFn: submitUserProfile,
  })
}