import { handleUserRedirect } from '@/lib/auth/checkUserRoute'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

export function useAuthRedirect() {
  const router = useRouter()
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    handleUserRedirect(router).finally(() => setCheckingSession(false))
  }, [router])

  return checkingSession
}