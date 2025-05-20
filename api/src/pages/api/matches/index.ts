// GET: 매칭 목록 (나와 매칭된 사람들)
// ✅ /api/matches.ts
// ✅ /api/matches.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers['x-user-id'] as string

  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ matches: data })
}