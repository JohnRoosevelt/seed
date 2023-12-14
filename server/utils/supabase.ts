import type { H3Event } from 'h3'
import { serverSupabaseServiceRole } from '#supabase/server'

export const supabase = (event: H3Event) => serverSupabaseServiceRole(event)
