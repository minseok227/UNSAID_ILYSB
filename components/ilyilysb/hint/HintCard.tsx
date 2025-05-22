// app/components/main/HintCard.tsx

import { useState } from 'react'
import { Text, View } from 'react-native'
import { HintGroup } from './HintGroup'
import { HintUnlockModal } from './HintUnlockModal'
import { LockHintGroup } from './LockHintGroup'

interface HintCardProps {
  index: number
  data: {
    user_id: string
    anonymous_tag: string
    basic: Record<string, unknown>
    premium_a: Record<string, unknown> | null
    premium_b: Record<string, unknown> | null
    sources: string[]
  }
}

export function HintCard({ data, index }: HintCardProps) {
  const [modalVisible, setModalVisible] = useState<'a' | 'b' | null>(null)

  const isIlysb = data.sources.includes('ilysb') // if we later track source via type

  return (
    <View style={{ backgroundColor: 'white', borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, padding: 16, gap: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: 20 }}>{isIlysb ? '💜' : '💗'}</Text>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{data.anonymous_tag}</Text>
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>#{index + 1}</Text>
      </View>

      {/* ✅ 기본 힌트 */}
      <HintGroup title="기본 힌트" hints={data.basic} />

      {/* 🔒 Premium A */}
      {data.premium_a ? (
        <HintGroup title="외형/취향 힌트" hints={data.premium_a} />
      ) : (
        <LockHintGroup
          label="외형/취향 힌트"
          onUnlock={() => setModalVisible('a')}
        />
      )}

      {/* 🔒 Premium B */}
      {data.premium_b ? (
        <HintGroup title="성향/습관 힌트" hints={data.premium_b} />
      ) : (
        <LockHintGroup
          label="성향/습관 힌트"
          onUnlock={() => setModalVisible('b')}
        />
      )}

      {/* 🔓 힌트 해금 모달 */}
      <HintUnlockModal
        visible={modalVisible !== null}
        onCancel={() => setModalVisible(null)}
        hintType={modalVisible === 'a' ? 'premium_a' : 'premium_b'}
        targetId={data.user_id}
      />
    </View>
  )
}