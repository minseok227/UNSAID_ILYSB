import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const userId = req.headers['x-user-id'] as string
  if (!userId) return res.status(401).json({ error: 'Missing user ID' })

  const { data, error } = await supabase.rpc('get_premium_a', { user_id: userId })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}