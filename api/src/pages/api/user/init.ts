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
  if (!userId || !name || !birthdate) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const age = new Date().getFullYear() - new Date(birthdate).getFullYear()
  const zodiac = getZodiacFromBirthdate(birthdate)

  const { error } = await supabase.from('users').insert({
    id: userId,
    instagram_username,
    name,
    birthdate,
    age,
    zodiac,
    school: main_affiliation,
    club: sub_affiliation,
    allow_search: true
  })

  if (error) return res.status(500).json({ error: error.message })
  return res.status(200).json({ message: 'User initialized' })
}

function getZodiacFromBirthdate(dateStr: string): string {
  const year = new Date(dateStr).getFullYear()
  const zodiacs = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']
  return zodiacs[year % 12]
}