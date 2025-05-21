import { supabase } from '@/lib/supabase'
import { Router } from 'expo-router'

export async function handleUserRedirect(router: Router) {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return router.replace('/login')

  const { data, error } = await supabase
    .from('users')
    .select('id, instagram_username')
    .eq('id', user.id)
    .not('instagram_username', 'is', null)
    .single()

  router.replace(!error && data?.instagram_username ? '/(tabs)' : '/signup')
}