// components/main/IlyCardList.tsx
import { useIlyList } from '@/lib/main/ilylist'
import { FlatList } from 'react-native'
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

export default function IlyCardList({
  refreshTrigger,
  triggerOnMount = true,
  triggerOnSearch = false,
  triggerOnSend = false,
  onSend,
}: Props) {
  const { data: users, isPending, refetch } = useIlyList()

  const shouldRefresh = triggerOnSearch || triggerOnSend || refreshTrigger
  if (shouldRefresh) refetch()

  if (isPending || !users || users.length === 0) return null

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => (
        <IlyCard user={item} onSend={onSend} />
      )}
    />
  )
}