import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client — Server-Side
 * Digunakan di API Routes (app/api/) untuk operasi database.
 * Lazy-initialized: hanya membuat koneksi saat pertama kali dipanggil,
 * agar tidak crash saat build meskipun env belum dikonfigurasi.
 */

let _supabase = null;

export default function getSupabase() {
  if (_supabase) return _supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Supabase] URL atau Anon Key belum dikonfigurasi di .env.local');
    // Kembalikan client dummy agar tidak crash saat build
    return createClient('https://placeholder.supabase.co', 'placeholder-key');
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}
