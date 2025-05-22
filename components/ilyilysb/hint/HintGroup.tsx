// app/components/main/HintGroup.tsx

import { Text, View } from 'react-native';

interface HintGroupProps {
  title: string
  hints: Record<string, unknown>
}

const hintLabels: Record<string, { emoji: string; label: string }> = {
  mbti: { emoji: '🔮', label: 'MBTI' },
  main_affiliation: { emoji: '🏫', label: 'Main Affiliation' },
  favorite_artist: { emoji: '🎵', label: 'Favorite Artist' },
  favorite_mood: { emoji: '🌤️', label: 'Mood Keyword' },
  favorite_food: { emoji: '🍜', label: 'Favorite Food' },
  sub_affiliation: { emoji: '🧩', label: 'Sub Affiliation' },
  preferred_style: { emoji: '🧥', label: 'Style' },
  hobby: { emoji: '🎯', label: 'Hobby' },
  ideal_type: { emoji: '❤️', label: 'Ideal Type' },
  age_group: { emoji: '📅', label: 'Age Group' },
  habit: { emoji: '🧠', label: 'Habit' },
}

export function HintGroup({ title, hints }: HintGroupProps) {
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '500', marginBottom: 4 }}>{title}</Text>
      {Object.entries(hints).map(([key, value]) => {
        if (!value) return null
        const label = hintLabels[key]?.label ?? key
        const emoji = hintLabels[key]?.emoji ?? '📝'

        return (
          <View
            key={key}
            style={{ backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center' }}
          >
            <Text style={{ marginRight: 8, fontSize: 16 }}>{emoji}</Text>
            <Text style={{ fontSize: 14, color: '#374151', fontWeight: '500' }}>
              {label}: {String(value)}
            </Text>
          </View>
        )
      })}
    </View>
  )
}