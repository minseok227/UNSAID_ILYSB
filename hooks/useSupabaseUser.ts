import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export function useSupabaseUser(): User | null {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
    })
  }, [])

  return user
}
