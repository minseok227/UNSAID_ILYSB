// POST: 힌트 열람 기록
// ✅ /api/hint/view.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const viewer_id = req.headers['x-user-id'] as string
  const { target_id, hint_type, value_viewed, source } = req.body

  const { error } = await supabase.from('hint_views').insert({
    id: uuidv4(),
    viewer_id,
    target_id,
    hint_type,
    value_viewed,
    source
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'Hint viewed' })
}
