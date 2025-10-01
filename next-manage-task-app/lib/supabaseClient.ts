import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as String;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as String;
export const supabase = createClient(supabaseUrl, supabaseAnonKey)