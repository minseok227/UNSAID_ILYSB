import { supabase } from '@/lib/supabase'

export async function fetchMyReferralCode(): Promise<string | null> {
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (!user || !user.id) return null

  const { data: userData, error: fetchError } = await supabase
    .from('users')
    .select('referral_code')
    .eq('id', user.id)
    .single()

  if (fetchError) {
    console.error('❌ Failed to fetch referral code:', fetchError)
    return null
  }

  return userData?.referral_code ?? null
}