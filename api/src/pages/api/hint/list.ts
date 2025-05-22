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

  const { user, error: authError } = await verifyUser(req)
  if (authError || !user) return res.status(401).json({ error: 'Unauthorized' })

  const { data, error } = await supabaseAdmin.rpc('get_hints_grouped', {
    user_id: user.id,
  })

  if (error) {
    console.error('❌ Supabase RPC Error:', error.message)
    return res.status(500).json({ error: error.message })
  }

  const result = (data as HintRow[]).map((d, i) => ({
    user_id: d.from_user_id,
    anonymous_tag: `#${i + 1}`,
    basic: d.basic,
    premium_a: d.premium_a,
    premium_b: d.premium_b,
    sources: d.sources ?? []
  }))

  return res.status(200).json(result)
}