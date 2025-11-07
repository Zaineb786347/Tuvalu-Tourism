import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (safe for browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role key (server-side only)
// Only initialize when actually needed to avoid client-side errors
export const getSupabaseAdmin = () => {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin can only be used on the server side')
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
