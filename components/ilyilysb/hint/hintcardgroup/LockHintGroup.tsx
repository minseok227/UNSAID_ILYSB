// app/components/main/LockHintGroup.tsx

import { Lock } from 'lucide-react-native'
import { Text, TouchableOpacity, View } from 'react-native'

interface LockHintGroupProps {
  label: string
  onUnlock: () => void
}

export function LockHintGroup({ label, onUnlock }: LockHintGroupProps) {
  return (
    <View style={{ backgroundColor: '#F9FAFB', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: 14, color: '#6B7280' }}>{label}</Text>
      <TouchableOpacity
        onPress={onUnlock}
        style={{ backgroundColor: '#E9D5FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, flexDirection: 'row', alignItems: 'center' }}
      >
        <Text style={{ color: '#7C3AED', fontSize: 14, fontWeight: '500', marginRight: 4 }}>View More Hints</Text>
        <Lock size={16} color="#7C3AED" />
      </TouchableOpacity>
    </View>
  )
}