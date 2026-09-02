import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: /api/data-rows/[id]
 * PUT — Edit baris data — hanya admin
 * DELETE — Hapus baris data — hanya admin
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

// PUT — Edit baris data
export async function PUT(request, { params }) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Akses ditolak.' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { values } = await request.json();

    if (!values || !Array.isArray(values)) {
      return NextResponse.json(
        { message: 'Data tidak valid.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data: updatedRow, error } = await supabase
      .from('data_rows')
      .update({ values })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API Data Rows] Error update:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate data.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data berhasil diupdate!',
      row: updatedRow,
    });

  } catch (error) {
    console.error('[API Data Rows] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

// DELETE — Hapus baris data
export async function DELETE(request, { params }) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Akses ditolak.' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const supabase = getSupabase();

    const { error } = await supabase
      .from('data_rows')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[API Data Rows] Error delete:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus data.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data berhasil dihapus!',
    });

  } catch (error) {
    console.error('[API Data Rows] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
