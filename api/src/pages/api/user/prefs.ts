// ✅ /api/user/prefs.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const userId = req.headers['x-user-id'] as string
  const {
    mbti,
    keywords,
    music,
    celebrity,
    food,
    style
  } = req.body

  if (!userId) return res.status(400).json({ error: 'Missing user ID' })

  const { error } = await supabase.from('users').update({
    mbti,
    keywords,
    music,
    celebrity,
    food,
    style
  }).eq('id', userId)

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'Preferences saved' })
}
