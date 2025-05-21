// api/lib/auth/verifyUser.ts
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest } from 'next'

export async function verifyUser(req: NextApiRequest) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return { user: null, error: 'Missing Authorization header' }
  }

  const token = authHeader.replace('Bearer ', '').trim()
  const { data, error } = await supabaseAdmin.auth.getUser(token)

  if (error || !data?.user) {
    return { user: null, error: error?.message || 'Unauthorized' }
  }

  return { user: data.user, error: null }
}