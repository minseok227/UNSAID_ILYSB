import { ThemedView } from '@/components/ThemedView'
import { TextInput } from 'react-native'

interface Props {
  values: {
    mbti: string
    favoriteArtist: string
    favoriteMood: string
    favoriteFood: string
  }
  onChange: {
    setMbti: (v: string) => void
    setFavoriteArtist: (v: string) => void
    setFavoriteMood: (v: string) => void
    setFavoriteFood: (v: string) => void
  }
  placeholders: Props['values']
}

export default function UserBasicHintFields({ values, onChange, placeholders }: Props) {
  return (
    <ThemedView style={{ gap: 16 }}>
      <TextInput placeholder={placeholders.mbti} value={values.mbti} onChangeText={onChange.setMbti} maxLength={4} autoCapitalize="characters" style={inputStyle} />
      <TextInput placeholder={placeholders.favoriteArtist} value={values.favoriteArtist} onChangeText={onChange.setFavoriteArtist} style={inputStyle} />
      <TextInput placeholder={placeholders.favoriteMood} value={values.favoriteMood} onChangeText={onChange.setFavoriteMood} style={inputStyle} />
      <TextInput placeholder={placeholders.favoriteFood} value={values.favoriteFood} onChangeText={onChange.setFavoriteFood} style={inputStyle} />
    </ThemedView>
  )
}

const inputStyle = { backgroundColor: 'white', padding: 12, borderRadius: 8 }