// /pages/api/hint/view.ts
import { verifyUser } from '@/lib/hooks/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { user, error: authError } = await verifyUser(req)
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' })

  const { target_id, hint_type, source } = req.body

  if (!target_id || !['premium_a', 'premium_b'].includes(hint_type) || !['invite', 'payment'].includes(source)) {
    return res.status(400).json({ error: 'Invalid parameters' })
  }

  // 1. 기존 열람 여부 확인
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('hint_views')
    .select('source')
    .eq('viewer_id', user.id)
    .eq('target_id', target_id)
    .eq('hint_type', hint_type)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('❌ Fetch error:', fetchError.message)
    return res.status(500).json({ error: 'Failed to check existing hint view' })
  }

  if (existing) {
    const sources = existing.source.split(',').map((s: string) => s.trim())
    if (sources.includes(source)) {
      return res.status(409).json({ error: 'Hint already viewed with this source' })
    }

    const updatedSources = Array.from(new Set([...sources, source])).join(',')
    const { error: updateError } = await supabaseAdmin
      .from('hint_views')
      .update({ source: updatedSources })
      .eq('viewer_id', user.id)
      .eq('target_id', target_id)
      .eq('hint_type', hint_type)

    if (updateError) {
      console.error('❌ Update error:', updateError.message)
      return res.status(500).json({ error: 'Failed to update source' })
    }

    return res.status(200).json({ success: true, message: 'Source updated' })
  }

  // 2. 최초 insert
  const { error: insertError } = await supabaseAdmin
    .from('hint_views')
    .insert({
      viewer_id: user.id,
      target_id,
      hint_type,
      source,
      viewed_at: new Date().toISOString(),
    })

  if (insertError) {
    console.error('❌ Insert error:', insertError.message)
    return res.status(500).json({ error: 'Failed to insert hint view' })
  }

  return res.status(201).json({ success: true, message: 'Hint unlocked' })
}