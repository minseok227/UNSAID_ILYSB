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
  favorite_artist,
  favorite_mood,
  favorite_food,
  preferred_style,
  hobby,
  ideal_type,
  age_group,
  habit,
}: SubmitUserProfileParams): Promise<boolean> {
  // ✅ 기본 정보 전송 (init API)
  const initPayload = {
    name,
    birthdate,
    instagram_username,
    main_affiliation,
    sub_affiliation,
  }

  const initRes = await fetch(`${API_BASE}/api/user/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(initPayload),
  })

  // ✅ 선호 정보 전송 (prefs API)
  const prefsPayload = {
    mbti,
    favorite_artist,
    favorite_mood,
    favorite_food,
    preferred_style,
    hobby,
    ideal_type,
    age_group,
    habit,
  }

  const prefsRes = await fetch(`${API_BASE}/api/user/prefs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(prefsPayload),
  })

  return initRes.ok && prefsRes.ok
}