// ✅ /api/ilysb/send.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { differenceInDays } from 'date-fns'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { to_user_id, message } = req.body
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

  const { error } = await supabase.from('ilysb').insert({
    id: uuidv4(),
    from_user_id,
    to_user_id,
    message
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'ILYSB sent' })
}
