import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import { supabase } from '@/lib/supabase'

export function EmailLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error.message)
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <View style={{ gap: 8 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6 }}
      />
      <TouchableOpacity
        onPress={handleEmailLogin}
        style={{ backgroundColor: 'black', padding: 12, borderRadius: 6 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>이메일로 로그인</Text>
      </TouchableOpacity>
    </View>
  )
}