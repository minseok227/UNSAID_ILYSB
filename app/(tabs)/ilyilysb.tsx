// app/(tabs)/ilyilysb.tsx

import { HintCardList } from '@/components/ilyilysb/HintCardList'
import { Text, View } from 'react-native'

export default function IlyIlysbScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F0FF' }}>
      <View style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: '#6D28D9', textAlign: 'center' }}>
          누군가 당신을 좋아해요 💜
        </Text>
        <Text style={{ fontSize: 15, color: '#8B5CF6', marginTop: 6, textAlign: 'center' }}>
          감정이 익명으로 도착했어요.
        </Text>
      </View>
      <HintCardList />
    </View>
  )
}
