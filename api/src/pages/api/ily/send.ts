// ✅ /api/ily/send.ts
import { verifyUser } from '@/lib/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { User } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

type ResponseData = { success: true } | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { user, error: authError }: { user: User | null; error: string | null } = await verifyUser(req)
  if (!user || authError) {
    return res.status(401).json({ error: authError || 'Unauthorized' })
  }

  const { to_user_id } = req.body
  if (!to_user_id) {
    return res.status(400).json({ error: 'Missing to_user_id' })
  }

  // Prevent duplicate ILY sends from the same user to the same recipient
  const { data: existing } = await supabaseAdmin
    .from('ilys')
    .select('id')
    .eq('from_user_id', user.id)
    .eq('to_user_id', to_user_id)
    .maybeSingle()

  if (existing) {
    return res.status(409).json({ error: '이미 ILY를 보냈습니다.' })
  }

  const { error } = await supabaseAdmin.from('ilys').insert({
    id: uuidv4(),
    from_user_id: user.id,
    to_user_id,
  })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true })
}