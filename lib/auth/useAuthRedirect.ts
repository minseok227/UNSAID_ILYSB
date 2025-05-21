import { handleUserRedirect } from '@/lib/auth/checkUserRoute'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

export function useAuthRedirect() {
  const router = useRouter()
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    const check = async () => {
      try {
        await handleUserRedirect(router)
      } catch (err) {
        console.error('Auth redirect failed:', err)
      } finally {
        setIsCheckingSession(false)
      }
    }
    check()
  }, [router])

  return isCheckingSession
}