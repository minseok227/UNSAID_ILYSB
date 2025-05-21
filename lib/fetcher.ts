// lib/fetcher.ts
import { supabase } from '@/lib/supabase'

export async function authorizedFetch(url: string, options: RequestInit = {}) {
  const session = await supabase.auth.getSession()
  const token = session.data.session?.access_token

  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  console.log('[authorizedFetch] token:', token)
  console.log('[authorizedFetch] url:', url)
  console.log('[authorizedFetch] merged headers:', headers)

  return fetch(url, {
    ...options,
    headers,
  })
}