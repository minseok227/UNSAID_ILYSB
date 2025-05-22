import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  user: {
    name: string
    instagram_username: string
  }
  onSend: () => void
}

export function SearchedUserCard({ user, onSend }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.emoji}>💗</Text>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.id}>@{user.instagram_username}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Text style={styles.sendText}>Send ILY</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  id: {
    fontSize: 13,
    color: '#6B7280',
  },
  sendButton: {
    backgroundColor: '#FECACA',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
  },
})