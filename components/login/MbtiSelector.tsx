import { Text, TouchableOpacity, View } from 'react-native'

const MBTI_TYPES = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
]

interface Props {
  value: string
  onChange: (mbti: string) => void
}

export default function MbtiSelector({ value, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {MBTI_TYPES.map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => onChange(type)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: value === type ? 'black' : '#d1d5db',
            backgroundColor: value === type ? 'black' : 'white',
            marginBottom: 8
          }}
        >
          <Text style={{ color: value === type ? 'white' : 'black', fontWeight: '500' }}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}