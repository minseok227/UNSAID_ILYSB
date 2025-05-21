//카카오로그인 전 임시로 이메일 로인 사용
import { ExternalLink } from '@/components/ExternalLink'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { handleUserRedirect } from '@/lib/auth/checkUserRoute'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, TextInput, TouchableOpacity, View } from 'react-native'

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      Alert.alert('Login error', error.message)
    } else {
      await handleUserRedirect(router)
    }
  }

  return (
    <ThemedView style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    }}>
      <ThemedText style={{
        fontSize: 28,
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 24,
        lineHeight: 36,
      }}>
        Your feelings stay quiet,{"\n"}until you&apos;re ready to say them.
      </ThemedText>

      <View style={{ width: '100%', marginBottom: 16 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginBottom: 12,
            fontSize: 16,
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 16,
          }}
        />
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: '100%',
          backgroundColor: '#2563EB',
          borderRadius: 999,
          paddingVertical: 16,
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <ThemedText style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '700',
        }}>
          Log In
        </ThemedText>
      </TouchableOpacity>

      <ThemedView style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <ThemedView style={{
          flex: 1,
          height: 1,
          backgroundColor: '#D1D5DB',
        }} />
        <ThemedText style={{
          marginHorizontal: 12,
          fontSize: 14,
          color: '#9CA3AF',
        }}>or</ThemedText>
        <ThemedView style={{
          flex: 1,
          height: 1,
          backgroundColor: '#D1D5DB',
        }} />
      </ThemedView>

      <ThemedText style={{
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 20,
        color: '#9CA3AF',
      }}>
        By continuing, you agree to our{"\n"}
        <ExternalLink href="/terms">Terms of Service</ExternalLink> and{' '}
        <ExternalLink href="/privacy">Privacy Policy</ExternalLink>.
      </ThemedText>
    </ThemedView>
  )
}