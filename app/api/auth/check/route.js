import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: /api/auth/check
 * Mengecek apakah user yang mengirim request adalah admin yang valid.
 * Membaca token dari header Authorization.
 */
export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ isAdmin: false });
    }

    const token = authHeader.replace('Bearer ', '');

    // Buat Supabase client dengan token user
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    // Verifikasi token dan dapatkan data user
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ isAdmin: false });
    }

    // Cek apakah email terdaftar di tabel admin_users
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .single();

    return NextResponse.json({
      isAdmin: !!adminUser,
      email: user.email,
    });

  } catch (error) {
    console.error('[API Auth Check] Error:', error);
    return NextResponse.json({ isAdmin: false });
  }
}
