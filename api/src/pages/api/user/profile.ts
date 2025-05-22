import { verifyUser } from '@/lib/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { user } = await verifyUser(req)
  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  const {
    name,
    birthdate,
    instagram_username,
    main_affiliation,
    sub_affiliation,
    mbti,
    favorite_artist,
    favorite_mood,
    favorite_food,
    preferred_style,
    hobby,
    ideal_type,
    habit,
  } = req.body

console.log('[DEBUG] user object:', user)
console.log('[DEBUG] userId:', user?.id, 'typeof:', typeof user?.id)
  const userId = user.id
  if (
    !userId ||
    typeof userId !== 'string' ||
    !name ||
    !birthdate ||
    !instagram_username ||
    !mbti
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const birthDateObj = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const m = today.getMonth() - birthDateObj.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--
  }

  let age_group = ''
  if (age >= 20 && age <= 23) {
    age_group = '20대 초반'
  } else if (age >= 24 && age <= 26) {
    age_group = '20대 중반'
  } else if (age >= 27 && age <= 29) {
    age_group = '20대 후반'
  }

  const { error } = await supabaseAdmin.from('users').insert({
    id: userId,
    name,
    birthdate,
    age,
    age_group,
    instagram_username,
    allow_search: true,
    main_affiliation,
    sub_affiliation,
    mbti: [mbti],
    favorite_artist,
    favorite_mood,
    favorite_food,
    preferred_style,
    hobby,
    ideal_type,
    habit,
  })

  if (error) {
    console.error('[❌ DB insert error]', error)
    return res.status(500).json({ error: error.message })
  }

  console.log('[✅ DB insert success]', { userId, instagram_username })
  return res.status(200).json({ message: 'User profile submitted' })
}