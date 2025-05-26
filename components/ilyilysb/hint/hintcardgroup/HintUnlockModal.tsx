import { useUnlockHint } from '@/lib/hint/useUnlockHint'
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native'

interface HintUnlockModalProps {
  visible: boolean
  hintType: 'premium_a' | 'premium_b'
  targetId: string
  onCancel: () => void
}

export function HintUnlockModal({ visible, hintType, targetId, onCancel }: HintUnlockModalProps) {
  const { mutate, isPending } = useUnlockHint()

  const onConfirm = () => {
    mutate(
      { hint_type: hintType, target_id: targetId, source: 'invite' },
      {
        onSuccess: () => {
          onCancel()
        },
        onError: (err: any) => {
          Alert.alert('힌트 해금 실패', err.message || '문제가 발생했어요. 다시 시도해주세요.')
        }
      }
    )
  }

  const title = hintType === 'premium_a' ? '외형/취향 힌트 해금' : '성향/습관 힌트 해금'
  const description =
    hintType === 'premium_a'
      ? '이 사용자의 외형적 정보와 취향 기반 힌트를 열람할 수 있어요.'
      : '이 사용자의 성향과 행동 습관 기반 힌트를 열람할 수 있어요.'

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 24 }}>
        <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 20, width: '100%', maxWidth: 400, gap: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#4B5563', textAlign: 'center' }}>{description}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, paddingTop: 8 }}>
            <TouchableOpacity
              onPress={onCancel}
              style={{ backgroundColor: '#E5E7EB', borderRadius: 9999, paddingHorizontal: 16, paddingVertical: 8 }}
            >
              <Text style={{ color: '#374151', fontWeight: '500' }}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={isPending}
              style={{ backgroundColor: '#7C3AED', borderRadius: 9999, paddingHorizontal: 16, paddingVertical: 8 }}
            >
              <Text style={{ color: 'white', fontWeight: '500' }}>해금하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}