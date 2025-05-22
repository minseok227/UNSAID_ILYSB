// app/(tabs)/ilyilysb.tsx

import { HintCardList } from '@/components/ilyilysb/HintCardList'
import { Text, View } from 'react-native'

export default function IlyIlysbScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F5FF' }}> {/* 보라톤 감성 배경 */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', color: '#6B21A8' }}>받은 마음</Text>
        <Text style={{ fontSize: 14, color: '#7C3AED', marginTop: 4 }}>
          당신에게 ILY 또는 ILYSB를 보낸 사람들의 힌트를 확인해보세요.
        </Text>
      </View>
      <HintCardList />
    </View>
  )
}