import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Signup {
  id?: number
  name: string
  email: string
  app: string
  social_media?: string
  comments?: string
  email_sent?: boolean
  email_sent_at?: string
  created_at?: string
}
