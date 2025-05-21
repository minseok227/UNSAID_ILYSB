import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useState } from 'react'
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

const MOCK_USERS = [
  {
    id: '1',
    name: 'Kim Doyoon',
    username: 'do_yoon',
    sent: true,
    daysToSb: 5,
    daysToExpire: 9,
  },
  {
    id: '2',
    name: 'Jo Sumin',
    username: 'soo_min',
    sent: false,
  },
  {
    id: '3',
    name: 'Taemin',
    username: 'taemin',
    sent: false,
  },
]

export default function HomeScreen() {
  const [search, setSearch] = useState('')

  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder="Name or ID"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={MOCK_USERS.filter(u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.username.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <View style={styles.userRow}>
              <IconSymbol name="heart.fill" size={24} color="#F472B6" />
              <View>
                <ThemedText style={styles.name}>{item.name}</ThemedText>
                <ThemedText style={styles.username}>@{item.username}</ThemedText>
              </View>
            </View>

            {item.sent ? (
              <>
                <ThemedText style={styles.sentTag}>Sended</ThemedText>
                <ThemedText style={styles.meta}>• 진심 보내기까지 {item.daysToSb}일 남음</ThemedText>
                <ThemedText style={styles.meta}>• ILY 만료까지 D-{item.daysToExpire}</ThemedText>
              </>
            ) : (
              <TouchableOpacity style={styles.sendButton}>
                <ThemedText style={styles.sendText}>Send ILY</ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        )}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    fontSize: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
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
    backgroundColor: '#E9D5FF',
    color: '#7C3AED',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  sendButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FCA5A5',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    color: '#6B7280',
  },
})