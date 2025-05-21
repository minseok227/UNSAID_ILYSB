import { ThemedView } from '@/components/ThemedView'
import { TextInput } from 'react-native'

interface Props {
  values: {
    name: string
    birthdate: string
    instagramUsername: string
    mainAffiliation: string
    subAffiliation: string
  }
  onChange: {
    setName: (v: string) => void
    setBirthdate: (v: string) => void
    setInstagramUsername: (v: string) => void
    setMainAffiliation: (v: string) => void
    setSubAffiliation: (v: string) => void
  }
  placeholders: Props['values']
}

export default function UserInfoFields({ values, onChange, placeholders }: Props) {
  return (
    <ThemedView style={{ gap: 16 }}>
      <TextInput placeholder={placeholders.name} value={values.name} onChangeText={onChange.setName} style={inputStyle} />
      <TextInput placeholder={placeholders.birthdate} value={values.birthdate} onChangeText={onChange.setBirthdate} style={inputStyle} />
      <TextInput placeholder={placeholders.instagramUsername} value={values.instagramUsername} onChangeText={onChange.setInstagramUsername} style={inputStyle} />
      <TextInput placeholder={placeholders.mainAffiliation} value={values.mainAffiliation} onChangeText={onChange.setMainAffiliation} style={inputStyle} />
      <TextInput placeholder={placeholders.subAffiliation} value={values.subAffiliation} onChangeText={onChange.setSubAffiliation} style={inputStyle} />
    </ThemedView>
  )
}

const inputStyle = { backgroundColor: 'white', padding: 12, borderRadius: 8 }