import { ThemedText } from '@/components/ThemedText'
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
  onNext: () => void
}

export default function SignupBasicStep({ values, onChange, onNext }: Props) {
  const insets = useSafeAreaInsets()

  const formatDateInput = (input: string) => {
    const cleaned = input.replace(/[^0-9]/g, '')
    const match = cleaned.match(/(\d{0,4})(\d{0,2})(\d{0,2})/)
    if (!match) return input
    return [match[1], match[2], match[3]].filter(Boolean).join('-')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { paddingTop: insets.top + 32 }]}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <ThemedText style={styles.title}>Complete Your Profile</ThemedText>
          <ThemedText style={styles.subtitle}>Step 1: Basic Info</ThemedText>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>👤 Name</ThemedText>
              <TextInput
                style={styles.input}
                value={values.name ?? ''}
                onChangeText={onChange.setName}
                placeholder="e.g. Jane Doe"
              />

              <ThemedText style={styles.label}>📅 Birthdate (YYYY-MM-DD)</ThemedText>
              <TextInput
                style={styles.input}
                value={values.birthdate ?? ''}
                onChangeText={(text) => onChange.setBirthdate(formatDateInput(text))}
                placeholder="e.g. 1999-05-21"
              />

              <ThemedText style={styles.label}>📸 Instagram ID</ThemedText>
              <TextInput
                style={styles.input}
                value={values.instagramUsername ?? ''}
                onChangeText={onChange.setInstagramUsername}
                placeholder="e.g. @yourid"
              />

              <ThemedText style={styles.label}>🏫 Main Affiliation</ThemedText>
              <TextInput
                style={styles.input}
                value={values.mainAffiliation ?? ''}
                onChangeText={onChange.setMainAffiliation}
                placeholder="e.g. University / Company"
              />

              <ThemedText style={styles.label}>👥 Sub Affiliation</ThemedText>
              <TextInput
                style={styles.input}
                value={values.subAffiliation ?? ''}
                onChangeText={onChange.setSubAffiliation}
                placeholder="e.g. Dept / Team"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <ThemedText style={styles.nextText}>Next →</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#F8F8FF'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111827'
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
    color: '#6B7280'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
    color: '#4B5563',
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  nextButton: {
    marginTop: 32,
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center'
  },
  nextText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
})