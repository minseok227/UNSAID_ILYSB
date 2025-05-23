import { useSignupForm } from '@/hooks/userinfo/useSignupForm'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import SignupBasicStep from './BasicStep'
import SignupPrefStep from './PrefStep'

import { useEffect, useRef } from 'react'

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
          <SignupPrefStep
            values={values.pref}
            onChange={onChange.pref}
            onBack={goToPrev}
            onSubmit={onSubmit}
          />
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
    width: Dimensions.get('window').width * 2,
    flex: 1,
  },
  slide: {
    width: Dimensions.get('window').width,
    flex: 1,
  }
})