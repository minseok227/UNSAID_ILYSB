import { ExternalLink } from '@/components/ExternalLink'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import UserBasicHintFields from '@/components/user/UserBasicHintFields'
import UserInfoFields from '@/components/user/UserInfoFields'
import UserPremiumHintFields from '@/components/user/UserPremiumHintFields'
import { submitUserProfile } from '@/lib/submit/user/submitUserProfile'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity } from 'react-native'

export default function SignupScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [instagramUsername, setInstagramUsername] = useState('')
  const [mainAffiliation, setMainAffiliation] = useState('')
  const [subAffiliation, setSubAffiliation] = useState('')
  const [mbti, setMbti] = useState('')

  const [favoriteArtist, setFavoriteArtist] = useState('')
  const [favoriteMood, setFavoriteMood] = useState('')
  const [favoriteFood, setFavoriteFood] = useState('')

  const [preferredStyle, setPreferredStyle] = useState('')
  const [hobby, setHobby] = useState('')
  const [idealType, setIdealType] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [habit, setHabit] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setIsSubmitting(false)
      console.error('No user found')
      Alert.alert('로그인 정보를 불러올 수 없습니다.')
      return
    }

    const success = await submitUserProfile({
      userId: user.id,
      name,
      birthdate,
      instagram_username: instagramUsername,
      main_affiliation: mainAffiliation,
      sub_affiliation: subAffiliation,
      mbti,
      favorite_artist: favoriteArtist,
      favorite_mood: favoriteMood,
      favorite_food: favoriteFood,
      preferred_style: preferredStyle,
      hobby,
      ideal_type: idealType,
      age_group: ageGroup,
      habit
    })

    setIsSubmitting(false)

    if (success) {
      router.push('/(tabs)')
    } else {
      console.error('Signup failed')
      Alert.alert('회원가입에 실패했습니다. 다시 시도해주세요.')
    }
  }

  // Redirect existing users away from signup page
  useEffect(() => {
    const checkExistingUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()
      if (!error && data) {
        // User already exists, redirect to home/tabs
        router.replace('/(tabs)')
      }
    }
    checkExistingUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
      <ThemedView style={{ gap: 16 }}>
        <ThemedText style={{ fontSize: 28, fontWeight: '600', textAlign: 'center' }}>
          Just one more step ✨
        </ThemedText>

        <UserInfoFields
          values={{ name, birthdate, instagramUsername, mainAffiliation, subAffiliation }}
          onChange={{ setName, setBirthdate, setInstagramUsername, setMainAffiliation, setSubAffiliation }}
          placeholders={{
            name: 'Enter your name',
            birthdate: 'YYYY-MM-DD',
            instagramUsername: 'Instagram username',
            mainAffiliation: 'Main affiliation',
            subAffiliation: 'Sub affiliation'
          }}
        />

        <UserBasicHintFields
          values={{ favoriteArtist, favoriteMood, favoriteFood, mbti }}
          onChange={{ setFavoriteArtist, setFavoriteMood, setFavoriteFood, setMbti }}
          placeholders={{
            favoriteArtist: 'Favorite artist',
            favoriteMood: 'Favorite mood',
            favoriteFood: 'Favorite food',
            mbti: 'Select your MBTI'
          }}
        />

        <UserPremiumHintFields
          values={{ preferredStyle, hobby, idealType, ageGroup, habit }}
          onChange={{ setPreferredStyle, setHobby, setIdealType, setAgeGroup, setHabit }}
          placeholders={{
            preferredStyle: 'Preferred style',
            hobby: 'Your hobby',
            idealType: 'Ideal type',
            ageGroup: 'Age group',
            habit: 'Habit'
          }}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={{
            backgroundColor: 'black',
            padding: 16,
            borderRadius: 999,
            alignItems: 'center',
            opacity: isSubmitting ? 0.5 : 1
          }}
        >
          <ThemedText style={{ color: 'white', fontWeight: '600' }}>Finish</ThemedText>
        </TouchableOpacity>

        <ThemedText style={{ fontSize: 12, textAlign: 'center', color: '#9CA3AF' }}>
          By continuing, you agree to our{'\n'}
          <ExternalLink href="/terms">Terms of Service</ExternalLink> and{' '}
          <ExternalLink href="/privacy">Privacy Policy</ExternalLink>.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  )
}
