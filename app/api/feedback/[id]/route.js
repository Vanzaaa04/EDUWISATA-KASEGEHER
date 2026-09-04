import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * API Route: /api/feedback/[id]
 *
 * DELETE — Admin only. Menghapus data feedback berdasarkan ID.
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: 'ID feedback tidak valid.' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Hapus dari database
    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[API Feedback DELETE] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal menghapus feedback.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback berhasil dihapus.',
    });

  } catch (error) {
    console.error('[API Feedback DELETE] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
