import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';

/**
 * API Route: /api/auth/logout
 * Logout user dan hapus session Supabase.
 */
export async function POST() {
  try {
    const supabase = getSupabase();
    await supabase.auth.signOut();

    return NextResponse.json({
      message: 'Logout berhasil.',
      success: true,
    });

  } catch (error) {
    console.error('[API Auth Logout] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat logout.' },
      { status: 500 }
    );
  }
}
