import { verifyUser } from '@/lib/auth/verifyUser'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

type HintRow = {
  from_user_id: string
  basic: Record<string, unknown>
  premium_a: Record<string, unknown> | null
  premium_b: Record<string, unknown> | null
  sources?: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  console.log('📥 [hint/list] Incoming request')

  const { user, error: authError } = await verifyUser(req)
  if (authError || !user) {
    console.warn('❌ [hint/list] Unauthorized request', authError)
    return res.status(401).json({ error: 'Unauthorized' })
  }

  console.log('✅ [hint/list] Verified user:', user.id)

  const { data, error } = await supabaseAdmin.rpc('get_hints_grouped', {
    user_id: user.id,
  })

  if (error) {
    console.error('❌ [hint/list] Supabase RPC Error:', error.message)
    return res.status(500).json({ error: error.message })
  }

  if (!data || data.length === 0) {
    console.log('ℹ️ [hint/list] No ILY/ILYSB data found for user:', user.id)
    return res.status(200).json([])
  }

  const result = (data as HintRow[]).map((d, i) => ({
    user_id: d.from_user_id,
    anonymous_tag: `#${i + 1}`,
    basic: d.basic,
    premium_a: d.premium_a,
    premium_b: d.premium_b,
    sources: d.sources ?? [],
  }))

  console.log('📤 [hint/list] Returning result:', result)

  return res.status(200).json(result)
}