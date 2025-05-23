import { useSupabaseUser } from '@/hooks/useSupabaseUser'
import { submitUserProfile } from '@/lib/submit/user/submitUserProfile'
import { useRouter } from 'expo-router'
import { useState } from 'react'

export function useSignupForm() {
  const router = useRouter()
  const user = useSupabaseUser()

  const [step, setStep] = useState<1 | 2>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [basic, setBasic] = useState({
    name: '',
    birthdate: '',
    instagramUsername: '',
    mainAffiliation: '',
    subAffiliation: ''
  })

  const [pref, setPref] = useState({
    mbti: '',
    favoriteArtist: '',
    favoriteMood: '',
    favoriteFood: '',
    preferredStyle: '',
    hobby: '',
    idealType: '',
    habit: '',
    referralCode: ''
  })

  const goToNext = () => {
    if (!basic.name || !basic.birthdate || !basic.instagramUsername) {
      alert('이름, 생일, 인스타그램 ID를 먼저 입력해주세요.')
      return
    }
    setStep(2)
  }

  const goToPrev = () => setStep(1)

  const onSubmit = async () => {
    if (!user?.id) {
      console.warn('User ID is missing – cannot submit profile.')
      return
    }
    if (!basic.name || !basic.birthdate || !pref.mbti) {
      alert('Please fill in required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const success = await submitUserProfile({
        name: basic.name,
        birthdate: basic.birthdate,
        instagram_username: basic.instagramUsername,
        main_affiliation: basic.mainAffiliation,
        sub_affiliation: basic.subAffiliation,
        mbti: pref.mbti,
        favorite_artist: pref.favoriteArtist,
        favorite_mood: pref.favoriteMood,
        favorite_food: pref.favoriteFood,
        preferred_style: pref.preferredStyle,
        hobby: pref.hobby,
        ideal_type: pref.idealType,
        habit: pref.habit,
        referralCode: pref.referralCode ?? null
      })
      if (success) {
        router.replace('/(tabs)')
      } else {
        alert('Signup failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    step,
    goToNext,
    goToPrev,
    onSubmit,
    isSubmitting,
    values: { basic, pref },
    onChange: {
      basic: {
        setName: (v: string) => setBasic((prev) => ({ ...prev, name: v })),
        setBirthdate: (v: string) => setBasic((prev) => ({ ...prev, birthdate: v })),
        setInstagramUsername: (v: string) => setBasic((prev) => ({ ...prev, instagramUsername: v })),
        setMainAffiliation: (v: string) => setBasic((prev) => ({ ...prev, mainAffiliation: v })),
        setSubAffiliation: (v: string) => setBasic((prev) => ({ ...prev, subAffiliation: v }))
      },
      pref: {
        setMbti: (v: string) => setPref((prev) => ({ ...prev, mbti: v })),
        setFavoriteArtist: (v: string) => setPref((prev) => ({ ...prev, favoriteArtist: v })),
        setFavoriteMood: (v: string) => setPref((prev) => ({ ...prev, favoriteMood: v })),
        setFavoriteFood: (v: string) => setPref((prev) => ({ ...prev, favoriteFood: v })),
        setPreferredStyle: (v: string) => setPref((prev) => ({ ...prev, preferredStyle: v })),
        setHobby: (v: string) => setPref((prev) => ({ ...prev, hobby: v })),
        setIdealType: (v: string) => setPref((prev) => ({ ...prev, idealType: v })),
        setHabit: (v: string) => setPref((prev) => ({ ...prev, habit: v })),
        setReferralCode: (v: string) => setPref((prev) => ({ ...prev, referralCode: v }))
      }
    }
  }
}