
import { showToast } from '@/lib/toast'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export function InviteCard() {
  const router = useRouter()

  function handleInstagramShare() {
    // TODO: implement sharing logic -> logic 분리 예정 
    console.log('Instagram 공유')
    showToast('초대가 완료되었어요! 🎉')
    router.push('/tabs')
  }

  function handleKakaoShare() {
    // TODO: implement KakaoLink -> logic 분리 예정.
    console.log('Kakao 공유')
    showToast('초대가 완료되었어요! 🎉')
    router.push('/tabs')
  }

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
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
