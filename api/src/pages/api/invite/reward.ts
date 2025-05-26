// /pages/api/invite/reward.ts
import { verifyUser } from '@/lib/hooks/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { user, error: authError } = await verifyUser(req)
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' })

  // 1. 유저가 초대를 통해 가입했는지 확인
  const { data: currentUser, error: userError } = await supabaseAdmin
    .from('users')
    .select('id, invited_by_user_id')
    .eq('id', user.id)
    .maybeSingle()

  if (userError || !currentUser || !currentUser.invited_by_user_id) {
    return res.status(400).json({ error: 'Not an invited user' })
  }

  const inviterId = currentUser.invited_by_user_id
  const inviteeId = currentUser.id

  // 2. 이미 초대 보상 지급된 경우 중복 방지
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('hint_views')
    .select('id')
    .eq('viewer_id', inviterId)
    .eq('target_id', inviteeId)
    .eq('hint_type', 'premium_a')
    .eq('source', 'invite')
    .maybeSingle()

  if (fetchError) {
    console.error('[❌ Fetch error]', fetchError.message)
    return res.status(500).json({ error: 'Failed to check previous reward' })
  }

  if (existing) {
    return res.status(409).json({ error: 'Reward already granted' })
  }

  // 3. 양방향 힌트 보상 insert
  const viewed_at = new Date().toISOString()
  const { error: insertError } = await supabaseAdmin.from('hint_views').insert([
    {
      viewer_id: inviterId,
      target_id: inviteeId,
      hint_type: 'premium_a',
      source: 'invite',
      viewed_at
    },
    {
      viewer_id: inviteeId,
      target_id: inviterId,
      hint_type: 'premium_a',
      source: 'invite',
      viewed_at
    }
  ])

  if (insertError) {
    console.error('[❌ Insert error]', insertError.message)
    return res.status(500).json({ error: 'Failed to insert hint views' })
  }

  return res.status(201).json({ success: true, message: 'Invite reward granted' })
}