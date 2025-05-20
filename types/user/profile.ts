export type UserInitInfo = {
  name: string
  birthdate: string
  instagram_username: string
  main_affiliation: string
  sub_affiliation: string
}

export type UserPrefs = {
  mbti: string
  keywords: string[]
  music: string
  celebrity: string
  food: string
  style: string
}

export type FullUserProfile = UserInitInfo & UserPrefs

export type SubmitUserProfileParams = FullUserProfile & {
  userId: string
}