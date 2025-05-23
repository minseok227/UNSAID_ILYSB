// 📁 /app/app/(tabs)/invite.tsx
import { showToast } from '@/lib/toast'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'

const REFERRAL_CODE = 'ABCD1234' // 예시 코드, 이후 사용자 기반 동적 생성 필요
const INVITE_URL = `https://stillunsaid.app/invite?via=${REFERRAL_CODE}`

export default function InviteScreen() {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 15000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => Keyboard.dismiss())
    return () => keyboardDidHideListener.remove()
  }, [])

  function handleInstagramShare() {
    Linking.openURL(INVITE_URL)
    showToast('초대 링크가 Instagram으로 공유되었어요! 🎉')
    router.push('/tabs')
  }
  
  function handleKakaoShare() {
    Linking.openURL(INVITE_URL) // KakaoLink API로 대체 예정
    showToast('초대 링크가 KakaoTalk으로 공유되었어요! 🎉')
    router.push('/tabs')
  }
  if (!visible) return null

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.emoji}>💌</Text>
      <Text style={styles.title}>Help your friend be loved.</Text>
      <Text style={styles.subtitle}>
        Someone might be waiting. They may never say it — but you can help them be heard.
      </Text>

      <TouchableOpacity style={styles.shareButton} onPress={handleInstagramShare}>
        <FontAwesome name="camera" size={16} color="#000" style={styles.icon} />
        <Text style={styles.shareText}>Invite via Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoShare}>
        <MaterialCommunityIcons name="chat" size={16} color="#000" style={styles.icon} />
        <Text style={styles.shareText}>Invite via KakaoTalk</Text>
      </TouchableOpacity>

      <Text style={styles.reward}>🎁 Both you and your friend will get 1 free hint.</Text>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    color: '#4B5563',
    lineHeight: 18,
    marginBottom: 24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  kakaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  shareText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  reward: {
    fontSize: 11,
    color: '#7A7A7A',
    textAlign: 'center',
  },
})