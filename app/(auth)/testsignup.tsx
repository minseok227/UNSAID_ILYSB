import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'

export default function TestSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setSuccess(false)
    } else {
      setError(null)
      setSuccess(true)
      router.replace('/login')
    }
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FAFAF8'  // UIUX 문서에 맞춘 따뜻한 배경
    }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          width: 250,
          marginBottom: 10,
          borderBottomWidth: 1,
          borderColor: '#ccc',
          paddingVertical: 6,
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          width: 250,
          marginBottom: 10,
          borderBottomWidth: 1,
          borderColor: '#ccc',
          paddingVertical: 6,
        }}
      />
      <View style={{ marginTop: 10, width: 250 }}>
        <Button title="Sign Up" onPress={handleSignup} />
      </View>
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
      {success && <Text style={{ color: 'green', marginTop: 10 }}>✅ 회원가입 성공!</Text>}
    </View>
  )
}