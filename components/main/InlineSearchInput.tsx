import { fetchSearchedUser } from '@/lib/fetch/usersearch'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

type UserResult = {
  id: string
  name: string
  instagram_username: string
}
interface Props {
  onResult: (user: UserResult | null) => void
}

export function InlineSearchStepInput({ onResult }: Props) {
  const [name, setName] = useState('')
  const [instaId, setInstaId] = useState('')
  const [loading, setLoading] = useState(false)

  const isSearchable = name.trim().length > 1 && instaId.trim().length > 2

  const handleSearch = async () => {
    setLoading(true)
    const result = await fetchSearchedUser(name, instaId)
    onResult(result)
    setLoading(false)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="이름을 입력해주세요"
          value={name}
          onChangeText={setName}
          style={{ flex: 1, fontSize: 14 }}
        />
      </View>
      {name.trim().length > 1 && (
        <TextInput
          placeholder="@인스타그램 ID를 입력해주세요"
          value={instaId}
          onChangeText={setInstaId}
          style={styles.input}
        />
      )}
      {isSearchable && (
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>{loading ? '검색 중...' : '검색'}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    marginBottom: 24,
    marginTop: 40,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#A78BFA',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
})