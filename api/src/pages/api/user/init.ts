import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    name,
    birthdate,
    instagram_username,
    main_affiliation,
    sub_affiliation,
  } = req.body

  const userId = req.headers['x-user-id'] as string
  if (!userId || typeof userId !== 'string' || !name || !birthdate || !instagram_username) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Calculate age based on birthdate
  const birthDateObj = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const m = today.getMonth() - birthDateObj.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }

  const { error } = await supabase.from('users').insert({
    id: userId,
    instagram_username,
    name,
    birthdate,
    age,
    allow_search: true,
    main_affiliation,
    sub_affiliation,
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'User initialized' })
}