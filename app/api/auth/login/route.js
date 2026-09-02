import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';

/**
 * API Route: /api/auth/login
 * Menerima email + password, lalu login menggunakan Supabase Auth.
 * Mengembalikan session jika berhasil.
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi.' },
        { status: 400 }
      );
    }

    // Login menggunakan Supabase Auth
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { message: 'Email atau password salah.' },
        { status: 401 }
      );
    }

    // Cek apakah email terdaftar di tabel admin_users
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email)
      .single();

    if (adminError || !adminUser) {
      // Logout jika bukan admin
      await supabase.auth.signOut();
      return NextResponse.json(
        { message: 'Akun Anda tidak memiliki akses admin.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: 'Login berhasil!',
      success: true,
      session: {
        access_token: data.session.access_token,
        user: {
          email: data.user.email,
        },
      },
    });

  } catch (error) {
    console.error('[API Auth Login] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
