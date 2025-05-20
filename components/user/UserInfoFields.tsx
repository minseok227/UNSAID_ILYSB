// /app/components/user/UserInfoFields.tsx
import { TextInput } from 'react-native'
import { ThemedView } from '@/components/ThemedView'

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
}

export default function UserInfoFields({ values, onChange }: Props) {
  return (
    <ThemedView style={{ gap: 16 }}>
      <TextInput
        placeholder="Your name"
        value={values.name}
        onChangeText={onChange.setName}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Birthdate (YYYY-MM-DD)"
        value={values.birthdate}
        onChangeText={onChange.setBirthdate}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Instagram ID (optional)"
        value={values.instagramUsername}
        onChangeText={onChange.setInstagramUsername}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Main affiliation (school or company)"
        value={values.mainAffiliation}
        onChangeText={onChange.setMainAffiliation}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Sub affiliation (club or group)"
        value={values.subAffiliation}
        onChangeText={onChange.setSubAffiliation}
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 8 }}
      />
    </ThemedView>
  )
}
