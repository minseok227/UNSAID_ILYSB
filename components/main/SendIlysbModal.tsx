import { ThemedView } from '@/components/ThemedView'
import { useSendIlysb } from '@/lib/main/sendilysb'
import { showToast } from '@/lib/toast'
import { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

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

const CATEGORIES = [
  { id: 1, label: '기억의 조각', description: '어떤 장면이 계속 떠올라요' },
  { id: 2, label: '감정의 인상', description: '그 사람은 이런 느낌이에요' },
  { id: 3, label: '하지 못한 말', description: '그 사람이랑 이런 거 하고 싶어요' },
]

export function SendIlysbModal({ user, visible, onCancel, onConfirmSuccess }: Props) {
  const { mutate: sendIlysb, isPending } = useSendIlysb(() => {})
  const [selectedCategory, setSelectedCategory] = useState<1 | 2 | 3>(1)
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('내용을 입력해주세요', '진심을 담은 메시지를 입력해주세요.')
      return
    }

    sendIlysb(
      {
        to_user_id: user.id,
        message,
        emotion_category: selectedCategory,
      },
      {
        onSuccess: (res) => {
          if (res.status === 'success') {
            showToast(`${user.name}님에게 진심을 전했어요 💜`)
            setMessage('')
            onConfirmSuccess()
          } else if (res.status === 'duplicate') {
            Alert.alert('이미 전한 마음이에요', '이 사용자에게는 이미 ILYSB를 보냈어요.')
          } else {
            Alert.alert('전송 실패', res.error ?? '조금 뒤 다시 시도해주세요.')
          }
        },
        onError: () => {
          Alert.alert('네트워크 오류', '진심을 전하는 중 문제가 발생했어요.\n연결 상태를 확인해주세요.')
        },
      }
    )
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <ThemedView style={styles.modal}>
          <Text style={styles.title}>💜 Send ILYSB</Text>
          <Text style={styles.subtitle}>어떤 말을 전하고 싶나요?.</Text>

          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id as 1 | 2 | 3)}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat.id && styles.categoryButtonSelected,
                ]}
              >
                <Text style={{ color: selectedCategory === cat.id ? 'white' : '#6B7280', fontWeight: '600' }}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.categoryDescription}>
            {CATEGORIES.find((cat) => cat.id === selectedCategory)?.description}
          </Text>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="마음을 자유롭게 표현해보세요"
            multiline
            style={styles.textInput}
            editable={!isPending}
          />

          <TouchableOpacity
            onPress={handleSend}
            disabled={isPending || !message.trim()}
            style={[styles.sendButton, { opacity: isPending || !message.trim() ? 0.6 : 1 }]}
          >
            <Text style={styles.sendText}>{isPending ? '전송 중...' : '💜 Send'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onCancel} disabled={isPending} style={styles.closeButton}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
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
    backgroundColor: '#F4F0FF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#6B21A8',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },
  categoryButtonSelected: {
    backgroundColor: '#A78BFA',
  },
  categoryDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    minHeight: 80,
    width: '100%',
    fontSize: 14,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 999,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 4,
  },
  closeText: {
    fontSize: 13,
    color: '#6B7280',
  },
})