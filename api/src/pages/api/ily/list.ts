import { verifyUser } from '@/lib/hooks/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { User } from '@supabase/supabase-js'
import { differenceInDays } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'

type IlyRecordRaw = {
  id: string
  created_at: string
  to_user: {
    id: string
    name: string
    instagram_username: string
  } | {
    id: string
    name: string
    instagram_username: string
  }[]
}

type IlyRecordNormalized = {
  id: string
  name: string
  username: string
  sent: true
  isIlysb: boolean
  daysToSb: number
  daysToExpire: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IlyRecordNormalized[] | { error: string }>
) {
  const { user, error: authError }: { user: User | null; error: string | null } = await verifyUser(req)
  if (!user || authError) {
    return res.status(401).json({ error: authError || 'Unauthorized' })
  }

  const { data, error } = await supabaseAdmin
    .from('ilys')
    .select(`
      id,
      created_at,
      to_user:to_user_id (
        id,
        name,
        instagram_username
      )
    `)
    .eq('from_user_id', user.id)
    .order('created_at', { ascending: false })

  if (error || !data) {
    return res.status(500).json({ error: error?.message || 'Fetch failed' })
  }

  const now = new Date()

  const result: IlyRecordNormalized[] = data.map((item: IlyRecordRaw) => {
    const toUser = Array.isArray(item.to_user) ? item.to_user[0] : item.to_user
    const createdAt = new Date(item.created_at)
    const days = differenceInDays(now, createdAt)
    const isIlysb = days >= 3
    const expireBase = isIlysb ? 35 : 21

    return {
      id: toUser.id,
      name: toUser.name,
      username: toUser.instagram_username,
      sent: true,
      isIlysb,
      daysToSb: Math.max(0, 3 - days),
      daysToExpire: Math.max(0, expireBase - days),
    }
  })

  return res.status(200).json(result)
}