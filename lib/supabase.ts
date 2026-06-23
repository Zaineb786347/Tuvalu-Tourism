import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Surface a helpful warning in dev when env is missing
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\nCheck .env.local or copy from .env.local.example.')
}

// Client-side Supabase client (safe for browser)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Admin client with service role key (server-side only)
// Only initialize when actually needed to avoid client-side errors
export const getSupabaseAdmin = () => {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin can only be used on the server side')
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (() => {
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY
      if (!key) {
        throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY. Set it in .env.local (server-side only).')
      }
      return key
    })()
  )
}
