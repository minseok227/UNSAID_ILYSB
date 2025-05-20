// ✅ /api/ily/send.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { to_user_id } = req.body
  const from_user_id = req.headers['x-user-id'] as string

  const { error } = await supabase.from('ilys').insert({
    id: uuidv4(),
    from_user_id,
    to_user_id
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'ILY sent' })
}