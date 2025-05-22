import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { fetchIlyList } from '@/lib/fetch/list'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

interface Props {
  refreshTrigger?: boolean
  triggerOnMount?: boolean
  triggerOnSearch?: boolean
  triggerOnSend?: boolean
}

export function IlyCardList({
  refreshTrigger,
  triggerOnMount = true,
  triggerOnSearch = false,
  triggerOnSend = false,
}: Props) {
  const [users, setUsers] = useState<any[]>([])

  const loadIlyList = useCallback(async () => {
    const result = await fetchIlyList()
    if (result) setUsers(result)
  }, [])

  useEffect(() => {
    if (triggerOnMount) {
      loadIlyList()
    }
  }, [loadIlyList, triggerOnMount])

  useEffect(() => {
    if (triggerOnSearch || triggerOnSend || refreshTrigger) {
      loadIlyList()
    }
  }, [loadIlyList, triggerOnSearch, triggerOnSend, refreshTrigger])

  if (!users || users.length === 0) return null

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => <SingleIlyCard user={item} />}
    />
  )
}

function SingleIlyCard({
  user,
  onSend,
}: {
  user: any
  onSend?: () => void
}) {
  const heartColor = user.isIlysb ? '#A279C7' : '#F472B6'

  return (
    <ThemedView style={styles.card}>
      <View style={styles.userRow}>
        <IconSymbol name="heart.fill" size={24} color={heartColor} />
        <View>
          <ThemedText style={styles.name}>{user.name}</ThemedText>
          <ThemedText style={styles.username}>@{user.username}</ThemedText>
        </View>
      </View>

      <ThemedText style={styles.sentTag}>Sended</ThemedText>
      <ThemedText style={styles.meta}>• 진심 보내기까지 {user.daysToSb}일 남음</ThemedText>
      <ThemedText style={styles.meta}>• ILY 만료까지 D-{user.daysToExpire}</ThemedText>

      {onSend && (
        <TouchableOpacity onPress={onSend} style={styles.sendButton}>
          <ThemedText style={styles.sendText}>Send ILY</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    color: '#6B7280',
  },
  sentTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FBCFE8',
    color: '#DB2777',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#6B7280',
  },
  sendButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FECACA',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
  },
})

export { SingleIlyCard as IlyCard }
