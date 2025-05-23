import { verifyUser } from '@/lib/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { generateUniqueReferralCode } from '@/lib/utils/referral'
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
    referralCode,
  } = req.body

  const userId = user.id
  console.log('[DEBUG] userId:', userId)
  console.log('[DEBUG] referralCode input:', referralCode)

  if (!userId || !name || !birthdate || !instagram_username || !mbti) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const birthDateObj = new Date(birthdate)
  const today = new Date()
  let age = today.getFullYear() - birthDateObj.getFullYear()
  const m = today.getMonth() - birthDateObj.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) age--

  let age_group = ''
  if (age >= 20 && age <= 23) age_group = '20대 초반'
  else if (age >= 24 && age <= 26) age_group = '20대 중반'
  else if (age >= 27 && age <= 29) age_group = '20대 후반'

  let invited_by_user_id = null
  if (referralCode) {
    const { data: inviter, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('referral_code', referralCode)
      .maybeSingle()

    if (error) {
      console.error('[❌ referral lookup error]', error)
    }

    if (inviter) {
      invited_by_user_id = inviter.id
      console.log('[✅ referral matched]', invited_by_user_id)
    } else {
      console.warn('[⚠️ referralCode not found]')
    }
  }

  const referral_code = await generateUniqueReferralCode()

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
    referral_code,
    invited_by_code: referralCode ?? null,
    invited_by_user_id,
  })

  if (error) {
    console.error('[❌ DB insert error]', error)
    return res.status(500).json({ error: error.message })
  }

  console.log('[✅ DB insert success]', { userId, referral_code, invited_by_user_id })
  return res.status(200).json({ message: 'User profile submitted' })
}