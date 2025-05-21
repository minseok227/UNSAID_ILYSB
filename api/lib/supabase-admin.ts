// lib/supabase-admin.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
