// lib/invite/useMyReferralCode.ts

import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

async function fetchMyReferralCode(): Promise<string | null> {
  const { data } = await supabase.auth.getUser()
  const user = data?.user

  if (!user || !user.id) return null

  const { data: userData, error } = await supabase
    .from('users')
    .select('referral_code')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('❌ Failed to fetch referral code:', error)
    return null
  }

  return userData?.referral_code ?? null
}

export function useMyReferralCode() {
  return useQuery({
    queryKey: ['myReferralCode'],
    queryFn: fetchMyReferralCode,
    staleTime: 1000 * 60 * 10, // 10분 캐시
    retry: 1
  })
}