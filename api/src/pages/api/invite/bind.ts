// /pages/api/invite/bind.ts
import { verifyUser } from '@/lib/hooks/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { user, error: authError } = await verifyUser(req)
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' })

  const { referralCode } = req.body
  if (!referralCode || typeof referralCode !== 'string') {
    return res.status(400).json({ error: 'Invalid referral code' })
  }

  // 1. 내 계정에 이미 초대 기록이 있는지 확인
  const { data: existing, error: existingError } = await supabaseAdmin
    .from('users')
    .select('invited_by_user_id')
    .eq('id', user.id)
    .single()

  if (existingError) {
    console.error('[❌ DB fetch error]', existingError.message)
    return res.status(500).json({ error: 'Failed to fetch user data' })
  }

  if (existing?.invited_by_user_id) {
    return res.status(409).json({ error: 'Already invited' })
  }

  // 2. referral code로 초대한 사람 찾기
  const { data: inviter, error: lookupError } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('referral_code', referralCode)
    .maybeSingle()

  if (lookupError) {
    console.error('[❌ Referral lookup error]', lookupError.message)
    return res.status(500).json({ error: 'Failed to lookup referral' })
  }

  if (!inviter) {
    return res.status(400).json({ error: 'Invalid referral code' })
  }

  // 3. 업데이트
  const { error: updateError } = await supabaseAdmin
    .from('users')
    .update({
      invited_by_user_id: inviter.id,
      invited_by_code: referralCode
    })
    .eq('id', user.id)

  if (updateError) {
    console.error('[❌ DB update error]', updateError.message)
    return res.status(500).json({ error: 'Failed to bind referral' })
  }

  return res.status(200).json({ success: true, inviter_id: inviter.id })
}