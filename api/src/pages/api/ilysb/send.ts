// ✅ /api/ilysb/send.ts
import { verifyUser } from '@/lib/hooks/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { User } from '@supabase/supabase-js'
import { differenceInDays } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

  const { user, error: authError }: { user: User | null; error: string | null } = await verifyUser(req)
  if (!user || authError) {
    return res.status(401).json({ error: authError || 'Unauthorized' })
  }

  const { to_user_id, message, emotion_category } = req.body
  const from_user_id = user.id

  if (!to_user_id || !message || emotion_category == null) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // 1. ILY 관계 검증
  const { data: ily } = await supabaseAdmin
    .from('ilys')
    .select('created_at')
    .eq('from_user_id', from_user_id)
    .eq('to_user_id', to_user_id)
    .maybeSingle()

  if (!ily) {
    return res.status(403).json({ error: '먼저 ILY를 보내야 ILYSB를 보낼 수 있어요.' })
  }

  const daysSinceILY = differenceInDays(new Date(), new Date(ily.created_at))
  if (daysSinceILY < 5 || daysSinceILY > 14) {
    return res.status(400).json({ error: 'ILYSB는 ILY 후 5일~14일 사이에만 보낼 수 있어요.' })
  }

  // 2. 감정 카테고리 유효성 검사
  if (
    typeof emotion_category !== 'number' ||
    !Number.isInteger(emotion_category) ||
    emotion_category < 1 ||
    emotion_category > 3
  ) {
    return res.status(400).json({ error: 'emotion_category는 1~3 사이의 정수여야 합니다.' })
  }

  // 3. 중복 전송 방지
  const { data: existing } = await supabaseAdmin
    .from('ilysb')
    .select('id')
    .eq('from_user_id', from_user_id)
    .eq('to_user_id', to_user_id)
    .maybeSingle()

  if (existing) {
    return res.status(409).json({ error: '이미 이 사용자에게 ILYSB를 보냈어요.' })
  }

  // 4. 감정 템플릿 먼저 저장 (UUID는 Supabase가 자동 생성)
  const { data: template, error: templateError } = await supabaseAdmin
    .from('ilysb_emotion_templates')
    .insert({
      sentence: message,
      category: emotion_category,
    })
    .select('id') // ✅ UUID 자동 생성 후 받아오기
    .single()

  if (templateError || !template?.id) {
    console.error('[❌ Template insert error]', templateError?.message)
    return res.status(500).json({ error: '감정 템플릿 저장에 실패했어요.' })
  }

  // 5. ILYSB 기록 저장
  const { error: insertError } = await supabaseAdmin.from('ilysb').insert({
    from_user_id,
    to_user_id,
    message,
    emotion_category,
    emotion_hint_id: template.id, // 🔗 연결
  })

  if (insertError) {
    console.error('[❌ ILYSB insert error]', insertError.message)
    return res.status(500).json({ error: 'ILYSB 저장 중 오류가 발생했어요.' })
  }

  return res.status(200).json({ success: true, message: 'ILYSB가 전송되었어요.' })
}