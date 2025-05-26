// components/main/IlyCard.tsx
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

interface User {
  id: string
  name: string
  username: string
  isIlysb: boolean
  daysToSb: number
  daysToExpire: number
}

interface Props {
  user: User
  onSend?: (user: { id: string; name: string; instagram_username: string }) => void
}

export function IlyCard({ user, onSend }: Props) {
  const heartColor = user.isIlysb ? '#A279C7' : '#F472B6'
  const isEligibleToSendIlysb = user.daysToSb <= 0 && !user.isIlysb
  const isExpired = user.daysToExpire <= 0

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

      {user.isIlysb ? (
        <ThemedText style={[styles.meta, { color: '#7C3AED' }]}>💌 진심을 이미 보냈어요</ThemedText>
      ) : (
        <>
          <ThemedText style={styles.meta}>• 진심까지 {user.daysToSb}일 남음</ThemedText>
          <ThemedText style={styles.meta}>• ILY 만료까지 D-{user.daysToExpire}</ThemedText>
          {isEligibleToSendIlysb && (
            <ThemedText style={[styles.meta, { color: '#7C3AED', fontWeight: '600' }]}>💜 지금 진심을 전할 수 있어요!</ThemedText>
          )}
        </>
      )}

      {onSend && !user.isIlysb && !isExpired && (
        <TouchableOpacity
          onPress={isEligibleToSendIlysb
            ? () =>
                onSend({
                  id: user.id,
                  name: user.name,
                  instagram_username: user.username,
                })
            : undefined}
          disabled={!isEligibleToSendIlysb}
          style={[styles.sendButton, { opacity: isEligibleToSendIlysb ? 1 : 0.4 }]}
        >
          <ThemedText style={styles.sendText}>
            {isEligibleToSendIlysb ? 'ILYSB 보내기' : '대기 중...'}
          </ThemedText>
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
