import { ThemedView } from '@/components/ThemedView'
import { sendIly } from '@/lib/fetch/sendily'
import { showToast } from '@/lib/toast'
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  user: {
    id: string
    name: string
    instagram_username: string
  }
  visible: boolean
  onCancel: () => void
  onConfirmSuccess: () => void
}

export function SendIlyModal({ user, visible, onCancel, onConfirmSuccess }: Props) {
  const handleSend = async () => {
    const result = await sendIly(user.id)

    if (result === 'success') {
      showToast(`${user.name}님에게 ILY를 보냈어요 💗`)
      onConfirmSuccess()
    } else if (result === 'duplicate') {
      Alert.alert('이미 전송됨', '이 사용자에게는 이미 ILY를 보냈어요.')
    } else {
      Alert.alert('전송 실패', '다시 시도해주세요.')
    }
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <Text style={styles.emoji}>💗</Text>
          <Text style={styles.title}>이 감정을 전하시겠어요?</Text>
          <Text style={styles.subtext}>
            {user.name} (@{user.instagram_username})님에게 ILY를 보냅니다
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSend} style={styles.confirmButton}>
              <Text style={styles.confirmText}>보내기</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  cancelText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#FECACA',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  confirmText: {
    color: 'white',
    fontWeight: '600',
  },
})