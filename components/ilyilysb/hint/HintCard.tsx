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
  const [expandedA, setExpandedA] = useState(false)
  const [expandedB, setExpandedB] = useState(false)

  const isIlysb = data.sources.includes('ilysb')
  const loveLabel = isIlysb ? 'Someone loves you so badly' : 'Someone like you'

  return (
    <View style={{ backgroundColor: 'white', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, padding: 14, gap: 10 }}>
      {/* 상단 타이틀 */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#6B21A8' }}>{isIlysb ? '💜' : '💗'} {loveLabel}</Text>
        <Text style={{ fontSize: 12, color: '#9CA3AF' }}>#{index + 1}</Text>
      </View>

      {/* 기본 힌트 */}
      <HintGroup title="기본 힌트" hints={data.basic} />

      {/* Premium A */}
      {data.premium_a ? (
        <>
          <HintGroup
            title="외형/취향 힌트"
            hints={data.premium_a}
            collapsible
            expanded={expandedA}
            onToggle={() => setExpandedA(!expandedA)}
          />
        </>
      ) : (
        <LockHintGroup label="외형/취향 힌트" onUnlock={() => setModalVisible('a')} />
      )}

      {/* Premium B */}
      {data.premium_b ? (
        <>
          <HintGroup
            title="성향/습관 힌트"
            hints={data.premium_b}
            collapsible
            expanded={expandedB}
            onToggle={() => setExpandedB(!expandedB)}
          />
        </>
      ) : (
        <LockHintGroup label="성향/습관 힌트" onUnlock={() => setModalVisible('b')} />
      )}

      {/* 힌트 해금 모달 */}
      <HintUnlockModal
        visible={modalVisible !== null}
        onCancel={() => setModalVisible(null)}
        hintType={modalVisible === 'a' ? 'premium_a' : 'premium_b'}
        targetId={data.user_id}
      />
    </View>
  )
}
