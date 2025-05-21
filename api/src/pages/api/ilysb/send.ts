// ✅ /api/ilysb/send.ts
import { supabase } from '@/lib/supabase'
import { differenceInDays } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { to_user_id, message, emotion_hint_id, emotion_category } = req.body
  const from_user_id = req.headers['x-user-id'] as string

  const { data: ily } = await supabase
    .from('ilys')
    .select('created_at')
    .eq('from_user_id', from_user_id)
    .eq('to_user_id', to_user_id)
    .single()

  if (!ily) return res.status(403).json({ error: 'ILY not found' })

  const daysSinceILY = differenceInDays(new Date(), new Date(ily.created_at))
  if (daysSinceILY < 5 || daysSinceILY > 14) {
    return res.status(400).json({ error: 'ILYSB not available' })
  }

  if (
    typeof emotion_hint_id !== 'string' ||
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(emotion_hint_id)
  ) {
    return res.status(400).json({ error: 'emotion_hint_id must be a valid UUID' })
  }

  // Validate emotion_category is a number between 1 and 4
  if (
    typeof emotion_category !== 'number' ||
    !Number.isInteger(emotion_category) ||
    emotion_category < 1 ||
    emotion_category > 4
  ) {
    return res.status(400).json({ error: 'emotion_category must be an integer between 1 and 4' })
  }

  const { error } = await supabase.from('ilysb').insert({
    id: uuidv4(),
    from_user_id,
    to_user_id,
    message,
    emotion_hint_id,
    emotion_category
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'ILYSB sent' })
}
