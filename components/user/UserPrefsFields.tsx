// /app/components/user/UserPrefsFields.tsx
import { TextInput } from 'react-native'
import { ThemedView } from '@/components/ThemedView'

interface Props {
  values: {
    mbti: string
    keywords: string
    music: string
    celebrity: string
    food: string
    style: string
  }
  onChange: {
    setMbti: (v: string) => void
    setKeywords: (v: string) => void
    setMusic: (v: string) => void
    setCelebrity: (v: string) => void
    setFood: (v: string) => void
    setStyle: (v: string) => void
  }
}

export default function UserPrefsFields({ values, onChange }: Props) {
  return (
    <ThemedView style={{ gap: 16 }}>
      <TextInput
        placeholder="MBTI (e.g. INFP)"
        value={values.mbti}
        onChangeText={onChange.setMbti}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="감성 키워드 (쉼표로 구분: 밤, 위로, 여름)"
        value={values.keywords}
        onChangeText={onChange.setKeywords}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="좋아하는 음악"
        value={values.music}
        onChangeText={onChange.setMusic}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="좋아하는 셀럽"
        value={values.celebrity}
        onChangeText={onChange.setCelebrity}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="좋아하는 음식"
        value={values.food}
        onChangeText={onChange.setFood}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="당신의 스타일"
        value={values.style}
        onChangeText={onChange.setStyle}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
    </ThemedView>
  )
}