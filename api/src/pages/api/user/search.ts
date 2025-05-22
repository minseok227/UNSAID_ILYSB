import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, username } = req.query

  if (typeof name !== 'string' || typeof username !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid name or username parameter' })
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, name, instagram_username')
    .eq('name', name)
    .eq('instagram_username', username)
    .maybeSingle()

  if (error) {
    console.error('🔴 Supabase error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  if (!data) {
    return res.status(200).json({ found: false })
  }

  return res.status(200).json({ found: true, user: data })
}