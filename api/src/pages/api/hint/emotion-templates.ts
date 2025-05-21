import { supabase } from '@/lib/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  const { data, error } = await supabase
    .from('ilysb_emotion_templates')
    .select('*')
    .order('category')
    .order('created_at', { ascending: true })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json(data)
}