import { useState } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { ExternalLink } from '@/components/ExternalLink'
import { submitUserProfile } from '@/submit/user/submitUserProfile'
import  UserInfoFields  from '@/components/user/UserInfoFields'
import  UserPrefsFields from '@/components/user/UserPrefsFields'

export default function SignupScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [instagramUsername, setInstagramUsername] = useState('')
  const [mainAffiliation, setMainAffiliation] = useState('')
  const [subAffiliation, setSubAffiliation] = useState('')
  const [mbti, setMbti] = useState('')
  const [keywords, setKeywords] = useState('')
  const [music, setMusic] = useState('')
  const [celebrity, setCelebrity] = useState('')
  const [food, setFood] = useState('')
  const [style, setStyle] = useState('')

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      console.error('No user found')
      return
    }
    const params = {
      userId: user.id,
      name,
      birthdate,
      instagram_username: instagramUsername,
      main_affiliation: mainAffiliation,
      sub_affiliation: subAffiliation,
      mbti,
      keywords: keywords.split(',').map(k => k.trim()),
      music,
      celebrity,
      food,
      style
    }
    const success = await submitUserProfile(params)
    if (success) {
      router.push('/(tabs)')
    } else {
      console.error('Signup failed')
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
      <ThemedView style={{ gap: 16 }}>
        <ThemedText style={{ fontSize: 28, fontWeight: '600', textAlign: 'center' }}>
          Just one more step ✨
        </ThemedText>

        <UserInfoFields
          values={{ name, birthdate, instagramUsername, mainAffiliation, subAffiliation }}
          onChange={{ setName, setBirthdate, setInstagramUsername, setMainAffiliation, setSubAffiliation }}
        />

        <UserPrefsFields
          values={{ mbti, keywords, music, celebrity, food, style }}
          onChange={{ setMbti, setKeywords, setMusic, setCelebrity, setFood, setStyle }}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ backgroundColor: 'black', padding: 16, borderRadius: 999, alignItems: 'center' }}
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
