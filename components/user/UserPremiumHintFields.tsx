import { ThemedView } from '@/components/ThemedView'
import { TextInput } from 'react-native'

interface Props {
  values: {
    preferredStyle: string
    hobby: string
    idealType: string
    ageGroup: string
    habit: string
  }
  onChange: {
    setPreferredStyle: (v: string) => void
    setHobby: (v: string) => void
    setIdealType: (v: string) => void
    setAgeGroup: (v: string) => void
    setHabit: (v: string) => void
  }
  placeholders: Props['values']
}

export default function UserPremiumHintFields({ values, onChange, placeholders }: Props) {
  return (
    <ThemedView style={{ gap: 16 }}>
      <TextInput placeholder={placeholders.preferredStyle} value={values.preferredStyle} onChangeText={onChange.setPreferredStyle} style={inputStyle} />
      <TextInput placeholder={placeholders.hobby} value={values.hobby} onChangeText={onChange.setHobby} style={inputStyle} />
      <TextInput placeholder={placeholders.idealType} value={values.idealType} onChangeText={onChange.setIdealType} style={inputStyle} />
      <TextInput placeholder={placeholders.ageGroup} value={values.ageGroup} onChangeText={onChange.setAgeGroup} style={inputStyle} />
      <TextInput placeholder={placeholders.habit} value={values.habit} onChangeText={onChange.setHabit} style={inputStyle} />
    </ThemedView>
  )
}

const inputStyle = { backgroundColor: 'white', padding: 12, borderRadius: 8 }