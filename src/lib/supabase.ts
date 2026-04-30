import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bcuemoflulxzdbzhfenc.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_SM4U1r3CXBist-F1j69pBg_gF7h08s3';

export const supabase = createClient(supabaseUrl, supabaseKey);
