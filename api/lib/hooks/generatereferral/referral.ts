// utils/referral.ts
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function generateUniqueReferralCode(): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxAttempts = 10

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const { data } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('referral_code', code)
      .maybeSingle()

    if (!data) {
      return code // ✅ 중복 없음, 사용 가능
    }
  }

  throw new Error('Failed to generate unique referral code after 10 attempts')
}