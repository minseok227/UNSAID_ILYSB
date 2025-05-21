import { supabase } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const viewer_id = req.headers['x-user-id'] as string
  if (!viewer_id) return res.status(401).json({ error: 'Missing user ID' })

  const { target_id, hint_type, value_viewed, source } = req.body
  if (!target_id || !hint_type || !source) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (viewer_id === target_id) {
    return res.status(403).json({ error: 'Cannot view your own hint' })
  }

  // ✅ 중복 체크
  const { data: existing } = await supabase
    .from('hint_views')
    .select('id')
    .eq('viewer_id', viewer_id)
    .eq('target_id', target_id)
    .eq('hint_type', hint_type)
    .maybeSingle()

  if (existing) {
    return res.status(200).json({ message: 'Already viewed' })
  }

  const { error } = await supabase.from('hint_views').insert({
    id: uuidv4(),
    viewer_id,
    target_id,
    hint_type,
    value_viewed: value_viewed || null,
    source
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'Hint viewed' })
}