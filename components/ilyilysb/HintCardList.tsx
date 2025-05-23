// components/ilyilysb/HintCardList.tsx

import { useHintList } from '@/lib/hint/useHintList'
import { FlatList, Text, View } from 'react-native'
import { HintCard } from './hint/HintCard'

export function HintCardList() {
  const { data, isPending, error } = useHintList()

  if (isPending) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: 'center', color: '#7C3AED', fontSize: 15 }}>
          마음을 읽는 중이에요...
        </Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, color: '#EF4444', textAlign: 'center' }}>
          불러오기 실패 😢
        </Text>
      </View>
    )
  }

  if (!data || data.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center' }}>
          💭 좋아하는 사람이 아직 여기 없을지도 몰라요. 초대해볼래요?
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.user_id}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 32,
        gap: 12,
        minHeight: '100%',
        justifyContent: 'flex-start',
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item, index }) => <HintCard data={item} index={index} />}
    />
  )
}