import { useSignupForm } from '@/hooks/useSignupForm'
import { StyleSheet, View, Animated, Dimensions } from 'react-native'
import SignupBasicStep from './BasicStep'
import SignupPrefStep from './PrefStep'

import { useRef, useEffect } from 'react'

export default function SignupScreen() {
  const {
    step,
    values,
    onChange,
    goToNext,
    goToPrev,
    onSubmit
  } = useSignupForm()

  const screenWidth = Dimensions.get('window').width
  const translateX = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: -(step - 1) * screenWidth,
      useNativeDriver: true,
    }).start()
  }, [step, screenWidth, translateX])

  return (
    <View style={styles.root}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX }] }
        ]}
      >
        <View style={styles.slide}>
          <SignupBasicStep
            values={values.basic}
            onChange={onChange.basic}
            onNext={goToNext}
          />
        </View>
        <View style={styles.slide}>
          {/* Only render if values.pref exists */}
          {values.pref && (
            <SignupPrefStep
              values={values.pref}
              onChange={onChange.pref}
              onBack={goToPrev}
              onSubmit={onSubmit}
            />
          )}
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    width: '200%',
    flex: 1,
  },
  slide: {
    width: '100%',
    flex: 1,
  }
})