// app/app/index.tsx
import { useEffect } from 'react'
import { router } from 'expo-router'

export default function Index() {
  useEffect(() => {
    router.replace('/(auth)/landing')
  }, [])

  return null
}