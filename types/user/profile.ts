// Aligned with Supabase `users` table schema (v3.7)

export const MBTI_TYPES = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
]

export type UserInitInfo = {
  name: string
  birthdate: string
  instagram_username: string
  main_affiliation: string
  sub_affiliation: string
}

export type UserPrefs = {
  mbti: string
  favorite_artist: string
  favorite_mood: string
  favorite_food: string

  preferred_style: string // 선호 스타일
  hobby: string // 취미

  ideal_type: string // 이상형
  habit: string
}

export type FullUserProfile = UserInitInfo & UserPrefs

export type SubmitUserProfileParams = FullUserProfile & {
  userId: string
}