// GET: 받은 ILY에 대해 기본 힌트 제공
// ✅ /api/hint/basic.ts (mockup only, assumes RPC or logic later)
// ✅ /api/hint/basic.ts (mockup only, assumes RPC or logic later)
import { supabase } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.headers['x-user-id'] as string

  const { data, error } = await supabase.rpc('get_basic_hints', { user_id: userId })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ hints: data })
}

