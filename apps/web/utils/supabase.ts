import { createClient } from '@supabase/supabase-js'

// Types
import type { VerseData } from '@repo/app/types'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
)

export interface SupabaseBibles {
  id: string
  abbr: string
  book: string
  chapter: string
  version: string
  verses: VerseData[]
}

export interface SupabaseGuides {
  id: string
  month: string
  year: string
  date: string
  pl: string
  pb: string
  in: string
  pl_name: string
  pb_name: string
  in_name: string
}

export interface SupabaseFeatureFlag {
  name: string
  context: any
  enable: boolean
}
