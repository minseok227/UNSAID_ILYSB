// components/ilyilysb/HintCardList.tsx

import { useHintList } from '@/lib/hint/useHintList'
import { FlatList, Text, View } from 'react-native'
import { HintCard } from './hint/HintCard'

export function HintCardList() {
  const { data, isPending, error } = useHintList()

  if (isPending) return <Text style={{ padding: 16 }}>불러오는 중...</Text>
  if (error) return <Text style={{ padding: 16 }}>불러오기 실패</Text>
  if (!data || data.length === 0) return <Text style={{ padding: 16 }}>받은 ILY가 없습니다</Text>

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.user_id}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 12 }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item, index }) => <HintCard data={item} index={index} />}
    />
  )
}
