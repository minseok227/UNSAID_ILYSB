// /app/app/(auth)/landing.tsx
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import {ExternalLink} from '@/components/ExternalLink'
import { useAuthRedirect } from '@/lib/auth/useAuthRedirect'

export default function LandingScreen() {
  const isCheckingSession = useAuthRedirect()
  const router = useRouter()

  if (isCheckingSession) return null;

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

      <TouchableOpacity
        onPress={() => router.push('/login')}
        style={{
          width: '100%',
          backgroundColor: '#FEE500',
          borderRadius: 999,
          paddingVertical: 16,
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <ThemedText style={{
          color: 'black',
          fontSize: 16,
          fontWeight: '700',
        }}>
          Continue with Kakao
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
