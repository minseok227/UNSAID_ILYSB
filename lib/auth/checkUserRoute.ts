import { supabase } from '@/lib/supabase'
import { Router } from 'expo-router'

export async function handleUserRedirect(router: Router) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    router.replace('/login')
    return
  }

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (error || !data) {
    router.replace('/signup')
  } else {
    router.replace('/(tabs)')
  }
}