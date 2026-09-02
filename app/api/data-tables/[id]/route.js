import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: /api/data-tables/[id]
 * PUT — Edit tabel (judul, kolom) — hanya admin
 * DELETE — Hapus tabel beserta seluruh baris datanya — hanya admin
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

// PUT — Edit tabel
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
    const { title, columns } = await request.json();

    if (!title || !columns || !Array.isArray(columns) || columns.length === 0) {
      return NextResponse.json(
        { message: 'Judul dan kolom wajib diisi.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data: updatedTable, error } = await supabase
      .from('data_tables')
      .update({ title, columns })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('[API Data Tables] Error update:', error);
      return NextResponse.json(
        { message: 'Gagal mengupdate tabel.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tabel berhasil diupdate!',
      table: updatedTable,
    });

  } catch (error) {
    console.error('[API Data Tables] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

// DELETE — Hapus tabel + seluruh baris datanya
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

    // Hapus semua baris data yang terkait terlebih dahulu
    await supabase
      .from('data_rows')
      .delete()
      .eq('table_id', id);

    // Hapus tabel
    const { error } = await supabase
      .from('data_tables')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[API Data Tables] Error delete:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus tabel.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tabel berhasil dihapus!',
    });

  } catch (error) {
    console.error('[API Data Tables] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
