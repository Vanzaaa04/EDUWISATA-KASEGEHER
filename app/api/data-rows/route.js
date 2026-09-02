import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: /api/data-rows
 * POST — Tambah baris data baru ke tabel — hanya admin
 */

// Helper: buat Supabase client
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
}

// Helper: verifikasi admin dari token
async function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

  const token = authHeader.replace('Bearer ', '');
  const supabase = getSupabase();

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return false;

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', user.email)
    .single();

  return !!adminUser;
}

// POST — Tambah baris data
export async function POST(request) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Akses ditolak.' },
        { status: 403 }
      );
    }

    const { table_id, values } = await request.json();

    if (!table_id || !values || !Array.isArray(values)) {
      return NextResponse.json(
        { message: 'Data tidak valid.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Cari row_order tertinggi untuk tabel ini
    const { data: lastRow } = await supabase
      .from('data_rows')
      .select('row_order')
      .eq('table_id', table_id)
      .order('row_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = (lastRow?.row_order || 0) + 1;

    // Insert baris baru
    const { data: newRow, error } = await supabase
      .from('data_rows')
      .insert({
        table_id,
        values,
        row_order: nextOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('[API Data Rows] Error create:', error);
      return NextResponse.json(
        { message: 'Gagal menambah data.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data berhasil ditambahkan!',
      row: newRow,
    });

  } catch (error) {
    console.error('[API Data Rows] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
