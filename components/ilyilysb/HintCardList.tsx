// components/ilyilysb/HintCardList.tsx

import { useHintList } from '@/lib/hint/useHintList'
import { FlatList, Text, View } from 'react-native'
import { HintCard } from './hint/HintCard'

// 상단 텍스트 및 리스트 empty 상태 전부 리팩토링

export function HintCardList() {
  const { data, isPending, error } = useHintList()

  if (isPending) {
    return (
      <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'center', color: '#7C3AED', fontSize: 16 }}>
          💜 마음을 읽고 있어요...
        </Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ paddingTop: 80, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: '#EF4444', textAlign: 'center' }}>
          불러오는 데 실패했어요 😢
        </Text>
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 24 }}>
          💭 아직 당신을 좋아하는 사람이 여기에 없을지도 몰라요.{'\n'}
          누군가를 초대해보는 건 어때요?
        </Text>
      </View>
    )
  }

  return (
    <>
      <View style={{ paddingTop: 48, paddingBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#6D28D9', textAlign: 'center' }}>
          누군가 당신을 좋아해요 💜
        </Text>
        <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginTop: 4 }}>
          감정이 익명으로 도착했어요
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.user_id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          gap: 12,
          minHeight: '100%',
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item, index }) => <HintCard data={item} index={index} />}
      />
    </>
  )
}