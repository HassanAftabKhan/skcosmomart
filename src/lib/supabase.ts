import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bcuemoflulxzdbzhfenc.supabase.co';
const supabaseKey = 'sb_publishable_SM4U1r3CXBist-F1j69pBg_gF7h08s3';

export const supabase = createClient(supabaseUrl, supabaseKey);
