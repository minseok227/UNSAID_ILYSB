// lib/submit/user/submitUserProfile.ts
import { authorizedFetch } from '@/lib/fetcher'
import { API_BASE_URL } from '@/lib/constants'

export async function submitUserProfile(data: {
  name: string
  birthdate: string
  instagram_username: string
  main_affiliation: string
  sub_affiliation: string
  mbti: string
  favorite_artist: string
  favorite_mood: string
  favorite_food: string
  preferred_style: string
  hobby: string
  ideal_type: string
  habit: string
}) {
  try {
    const res = await authorizedFetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const body = await res.json()
    if (!res.ok) {
      console.error(`❌ API /api/user/profile failed [${res.status}]:`, body)
      return false
    }

    return true
  } catch (err) {
    console.error('❌ submitUserProfile error:', err)
    return false
  }
}