import { useSupabaseUser } from '@/hooks/userinfo/useSupabaseUser'
import { submitUserProfile } from '@/lib/submit/user/submitUserProfile'
import { useRouter } from 'expo-router'
import { useState } from 'react'

const MBTI_TYPES = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
]

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
    subAffiliation: '',
    mbti: ''
  })

  const [pref, setPref] = useState({
    favoriteFood: '',
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
    if (!MBTI_TYPES.includes(basic.mbti)) {
      alert('올바른 MBTI를 입력해주세요. (예: INFP, ENTJ)')
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
    if (!basic.name || !basic.birthdate || !basic.mbti) {
      alert('Please fill in required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const { success, error } = await submitUserProfile({
        name: basic.name,
        birthdate: basic.birthdate,
        instagram_username: basic.instagramUsername,
        main_affiliation: basic.mainAffiliation,
        sub_affiliation: basic.subAffiliation,
        mbti: basic.mbti,
        favorite_food: pref.favoriteFood,
        hobby: pref.hobby,
        ideal_type: pref.idealType,
        habit: pref.habit,
        referralCode: pref.referralCode ?? null
      })
      if (success) {
        router.replace('/(tabs)')
      } else {
        alert(error ?? 'Signup failed. Please try again.')
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
        setSubAffiliation: (v: string) => setBasic((prev) => ({ ...prev, subAffiliation: v })),
        setMbti: (v: string) => setBasic((prev) => ({ ...prev, mbti: v }))
      },
      pref: {
        setFavoriteFood: (v: string) => setPref((prev) => ({ ...prev, favoriteFood: v })),
        setHobby: (v: string) => setPref((prev) => ({ ...prev, hobby: v })),
        setIdealType: (v: string) => setPref((prev) => ({ ...prev, idealType: v })),
        setHabit: (v: string) => setPref((prev) => ({ ...prev, habit: v })),
        setReferralCode: (v: string) => setPref((prev) => ({ ...prev, referralCode: v }))
      }
    }
  }
}