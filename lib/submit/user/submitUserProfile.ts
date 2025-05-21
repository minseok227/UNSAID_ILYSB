// lib/submit/user/submitUserProfile.ts
import { authorizedFetch } from '@/lib/fetcher'

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
    const res = await authorizedFetch('/api/user/profile', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error(`❌ API /api/user/profile failed [${res.status}]:`, await res.text())
      return false
    }

    return true
  } catch (err) {
    console.error('❌ submitUserProfile error:', err)
    return false
  }
}