import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

/**
 * API Route: /api/visits/admin
 *
 * GET — Admin only. Mengembalikan data kunjungan website.
 *       Statistik sederhana + tabel lengkap (No, IP, Waktu).
 */
export async function GET(request) {
  try {
    // Verifikasi admin token
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Akses ditolak. Login sebagai admin.' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');

    // Verifikasi token via Supabase Auth
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { message: 'Token tidak valid.' },
        { status: 401 }
      );
    }

    // Cek apakah user adalah admin
    const { data: adminUser } = await supabaseAuth
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!adminUser) {
      return NextResponse.json(
        { message: 'Akses ditolak. Bukan admin.' },
        { status: 403 }
      );
    }

    // Ambil semua data kunjungan
    const supabase = getSupabase();

    const { data: visits, error } = await supabase
      .from('site_visits')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('[API Visits Admin] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data kunjungan.' },
        { status: 500 }
      );
    }

    // Hitung statistik sederhana
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const todayVisits = visits.filter((v) => v.created_at >= todayStart).length;
    const weekVisits = visits.filter((v) => v.created_at >= weekAgo).length;
    const monthVisits = visits.filter((v) => v.created_at >= monthAgo).length;

    return NextResponse.json({
      success: true,
      stats: {
        total: visits.length,
        today: todayVisits,
        week: weekVisits,
        month: monthVisits,
      },
      visits: visits.slice(0, 200),
    });

  } catch (error) {
    console.error('[API Visits Admin] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
