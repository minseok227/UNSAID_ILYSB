// /pages/api/hint/unlocked.ts
import { verifyUser } from '@/lib/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const { user, error: authError } = await verifyUser(req)
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' })

  const { target_id } = req.query

  if (typeof target_id !== 'string') {
    return res.status(400).json({ error: 'Invalid target_id' })
  }

  const { data, error } = await supabaseAdmin
    .from('hint_views')
    .select('hint_type, source')
    .eq('viewer_id', user.id)
    .eq('target_id', target_id)

  if (error) {
    console.error('❌ Supabase Error:', error.message)
    return res.status(500).json({ error: 'Failed to fetch unlocked status' })
  }

  const premium_a = data.some((row) => row.hint_type === 'premium_a')
  const premium_b = data.some((row) => row.hint_type === 'premium_b')
  const sources = Array.from(new Set(data.flatMap((row) => row.source.split(','))))

  return res.status(200).json({
    basic: true, // ✅ always true
    premium_a,
    premium_b,
    sources,
  })
}