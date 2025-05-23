import { fetchMyReferralCode } from '@/lib/fetch/fetchMyReferralCode'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Modal, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  visible: boolean
  onClose: () => void
}

export default function InviteModal({ visible, onClose }: Props) {
  const [referralCode, setReferralCode] = useState<string | null>(null)

  useEffect(() => {
    if (visible) {
      fetchMyReferralCode().then((code) => {
        setReferralCode(code)
      })
    }
  }, [visible])

  const inviteUrl = `https://stillunsaid.app/invite?via=${referralCode}`

  const handleShare = () => {
    Share.share({
      message: `누군가의 마음을 전하는 앱 💌\n지금 초대받아보세요!\n\n${inviteUrl}`,
    })
  }

  if (!visible) return null

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.emoji}>💌</Text>
          <Text style={styles.title}>친구를 초대해보세요</Text>
          <Text style={styles.subtitle}>
            누군가의 감정을 도와줄 수 있어요. 당신의 초대 한 번이면 충분해요.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <FontAwesome name="camera" size={16} color="#000" style={styles.icon} />
            <Text style={styles.buttonText}>Instagram으로 초대</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.kakaoButton} onPress={handleShare}>
            <MaterialCommunityIcons name="chat" size={16} color="#000" style={styles.icon} />
            <Text style={styles.buttonText}>KakaoTalk으로 초대</Text>
          </TouchableOpacity>

          <Text style={styles.reward}>🎁 서로 힌트 1개씩 지급됩니다!</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#FFF8F0',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  kakaoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE500',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  reward: {
    fontSize: 11,
    color: '#7A7A7A',
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 4,
  },
  closeText: {
    fontSize: 12,
    color: '#6B7280',
  },
})