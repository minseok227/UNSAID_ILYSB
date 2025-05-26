import { ThemedText } from '@/components/ThemedText'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  values: {
    favoriteFood: string
    hobby: string
    idealType: string
    habit: string
    referralCode?: string
  }
  onChange: {
    setFavoriteFood: (v: string) => void
    setHobby: (v: string) => void
    setIdealType: (v: string) => void
    setHabit: (v: string) => void
    setReferralCode: (v: string) => void
  }
  onBack: () => void
  onSubmit: () => void
}

export default function SignupPrefStep({ values, onChange, onBack, onSubmit }: Props) {
  const insets = useSafeAreaInsets()
  const [initialReferralLoaded, setInitialReferralLoaded] = useState(false)

  useEffect(() => {
    if (!initialReferralLoaded) {
      AsyncStorage.getItem('referralCode').then((code: string | null) => {
        if (code && !values.referralCode) {
          onChange.setReferralCode(code)
        }
        setInitialReferralLoaded(true)
      })
    }
  }, [initialReferralLoaded, values.referralCode, onChange])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { paddingTop: insets.top + 32 }]}
      >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={onBack}>
              <ThemedText style={styles.back}>← Back</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.step}>Step 2: Preferences</ThemedText>
          </View>

          <ThemedText style={styles.title}>Complete Your Profile</ThemedText>

          <View style={styles.card}>
            <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>🍱 Favorite Food</ThemedText>
              <TextInput style={styles.input} value={values.favoriteFood ?? ''} 
              onChangeText={onChange.setFavoriteFood} placeholder="e.g. 떡볶이"
              placeholderTextColor="#9CA3AF"  />

              <ThemedText style={styles.label}>🎯 Hobby</ThemedText>
              <TextInput style={styles.input} value={values.hobby ?? ''} onChangeText={onChange.setHobby} placeholder="e.g. 자전거" placeholderTextColor="#9CA3AF" />

              <ThemedText style={styles.label}>💘 Ideal Type</ThemedText>
              <TextInput style={styles.input} value={values.idealType ?? ''} onChangeText={onChange.setIdealType} placeholder="e.g. 리드형" placeholderTextColor="#9CA3AF"  />

              <ThemedText style={styles.label}>🔁 Habit</ThemedText>
              <TextInput style={styles.input} value={values.habit ?? ''} onChangeText={onChange.setHabit} placeholder="e.g. 눈 피함" placeholderTextColor="#9CA3AF"  />

              <ThemedText style={styles.label}>🔗 Referral Code (Optional)</ThemedText>
              <TextInput
                style={styles.input}
                value={values.referralCode ?? ''}
                onChangeText={onChange.setReferralCode}
                placeholder="e.g. ABC123"
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
              <ThemedText style={styles.submitText}>Submit →</ThemedText>
            </TouchableOpacity>
          </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  back: {
    fontSize: 14,
    color: '#4B5563',
  },
  step: {
    fontSize: 14,
    color: '#6B7280'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 40
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827'
  },
  label: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 4,
    color: '#4B5563',
    fontWeight: '500'
  },
  input: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 15,
  },
  inputGroup: {
    gap: 0,
  },
  footer: {
    marginTop: 8,
    marginBottom: 32,
    alignItems: 'stretch',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center'
  },
  submitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  }
})