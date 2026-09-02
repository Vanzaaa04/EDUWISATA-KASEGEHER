import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: /api/data-tables
 * GET — Ambil semua tabel beserta baris datanya (publik, tanpa auth)
 * POST — Buat tabel baru (hanya admin)
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

// GET — Ambil semua tabel + baris data (publik)
export async function GET() {
  try {
    const supabase = getSupabase();

    // Ambil semua tabel, urutkan berdasarkan display_order
    const { data: tables, error: tablesError } = await supabase
      .from('data_tables')
      .select('*')
      .order('display_order', { ascending: true });

    if (tablesError) {
      console.error('[API Data Tables] Error fetch tables:', tablesError);
      return NextResponse.json(
        { message: 'Gagal mengambil data.' },
        { status: 500 }
      );
    }

    // Untuk setiap tabel, ambil baris datanya
    const tablesWithRows = await Promise.all(
      (tables || []).map(async (table) => {
        const { data: rows, error: rowsError } = await supabase
          .from('data_rows')
          .select('*')
          .eq('table_id', table.id)
          .order('row_order', { ascending: true });

        if (rowsError) {
          console.error(`[API Data Tables] Error fetch rows for table ${table.id}:`, rowsError);
        }

        return {
          ...table,
          rows: rows || [],
        };
      })
    );

    return NextResponse.json({
      success: true,
      tables: tablesWithRows,
    });

  } catch (error) {
    console.error('[API Data Tables] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

// POST — Buat tabel baru (hanya admin)
export async function POST(request) {
  try {
    // Cek apakah admin
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json(
        { message: 'Akses ditolak. Anda bukan admin.' },
        { status: 403 }
      );
    }

    const { title, columns } = await request.json();

    // Validasi
    if (!title || !columns || !Array.isArray(columns) || columns.length === 0) {
      return NextResponse.json(
        { message: 'Judul tabel dan minimal 1 kolom wajib diisi.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Cari display_order tertinggi untuk menempatkan tabel baru di urutan terakhir
    const { data: lastTable } = await supabase
      .from('data_tables')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();

    const nextOrder = (lastTable?.display_order || 0) + 1;

    // Insert tabel baru
    const { data: newTable, error } = await supabase
      .from('data_tables')
      .insert({
        title,
        columns,
        display_order: nextOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('[API Data Tables] Error create:', error);
      return NextResponse.json(
        { message: 'Gagal membuat tabel.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tabel berhasil dibuat!',
      table: { ...newTable, rows: [] },
    });

  } catch (error) {
    console.error('[API Data Tables] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
