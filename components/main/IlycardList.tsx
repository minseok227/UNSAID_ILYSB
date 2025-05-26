import { useIlyList } from '@/lib/main/ilylist'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { IlyCard } from './IlyCard'

interface Props {
  refreshTrigger?: boolean
  triggerOnMount?: boolean
  triggerOnSearch?: boolean
  triggerOnSend?: boolean
  onSend?: (user: {
    id: string
    name: string
    instagram_username: string
  }) => void
}

export function IlyCardList({
  refreshTrigger,
  triggerOnMount = true,
  triggerOnSearch = false,
  triggerOnSend = false,
  onSend,
}: Props) {
  const { data: users, isPending, refetch, isFetching } = useIlyList()

  const shouldRefresh = triggerOnSearch || triggerOnSend || refreshTrigger
  if (shouldRefresh) refetch()

  // ✅ 첫 로딩 상태일 때 감성 메시지
  if (isPending) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
        <ActivityIndicator size="large" color="#8B5CF6" />
        <Text style={{ marginTop: 12, color: '#6B7280' }}>
          마음들을 불러오고 있어요...
        </Text>
      </View>
    )
  }

  if (!users || users.length === 0) return null

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => <IlyCard user={item} onSend={onSend} />}
      refreshing={isFetching}         // ✅ Pull to refresh 중인지
      onRefresh={() => refetch()}     // ✅ 드래그로 새로고침
    />
  )
}