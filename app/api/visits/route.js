import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * API Route: /api/visits
 *
 * POST — Publik. Mencatat kunjungan website baru (simpan IP asli).
 * GET  — Publik. Mengembalikan total kunjungan saja.
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const { page = '/' } = body;

    // Ambil IP asli dari header (di-forward oleh Next.js / Vercel)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    const supabase = getSupabase();

    // Simpan kunjungan ke database dengan IP asli
    const { error } = await supabase
      .from('site_visits')
      .insert([
        {
          visitor_hash: ip,
          page,
        },
      ]);

    if (error) {
      console.error('[API Visits] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal mencatat kunjungan.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[API Visits POST] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();

    // Total kunjungan saja
    const { count: totalVisits, error: countError } = await supabase
      .from('site_visits')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('[API Visits GET] Count error:', countError);
      return NextResponse.json(
        { message: 'Gagal mengambil statistik.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      totalVisits: totalVisits || 0,
    });

  } catch (error) {
    console.error('[API Visits GET] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
