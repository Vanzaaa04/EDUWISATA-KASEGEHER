import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client — Client-Side
 * Digunakan di komponen React ('use client') untuk autentikasi
 * dan operasi yang membutuhkan session user.
 * Lazy-initialized agar tidak crash saat build.
 */

let _client = null;

export default function getSupabaseClient() {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Gunakan placeholder saat env belum dikonfigurasi (agar build tidak crash)
  _client = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );

  return _client;
}
