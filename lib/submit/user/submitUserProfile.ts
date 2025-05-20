import { SubmitUserProfileParams } from '@/types/user/profile'

const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL || ''

export async function submitUserProfile({
  userId,
  name,
  birthdate,
  instagram_username,
  main_affiliation,
  sub_affiliation,
  mbti,
  keywords,
  music,
  celebrity,
  food,
  style,
}: SubmitUserProfileParams): Promise<boolean> {
  const initRes = await fetch(`${API_BASE}/api/user/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({
      name,
      birthdate,
      instagram_username,
      main_affiliation,
      sub_affiliation,
    }),
  })

  const prefsRes = await fetch(`${API_BASE}/api/user/prefs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify({ mbti, keywords, music, celebrity, food, style }),
  })

  return initRes.ok && prefsRes.ok
}