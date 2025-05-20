import { handleUserRedirect } from '@/lib/auth/checkUserRoute'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    handleUserRedirect(router)
  }, [router])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )
}