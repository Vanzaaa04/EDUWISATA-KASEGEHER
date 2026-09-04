import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';

/**
 * API Route: /api/feedback
 *
 * POST — Publik. Menerima feedback pengunjung, simpan ke Supabase,
 *         dan kirim notifikasi ke Telegram.
 * GET  — Admin only. Mengambil semua data feedback.
 */

export async function POST(request) {
  try {
    const { nama, asal, rating, komentar, tanggal_kunjungan } = await request.json();

    // Validasi input
    if (!nama || !nama.trim()) {
      return NextResponse.json({ message: 'Nama wajib diisi.' }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Rating wajib dipilih (1-5).' }, { status: 400 });
    }
    if (!komentar || !komentar.trim()) {
      return NextResponse.json({ message: 'Komentar wajib diisi.' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Simpan ke database
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          nama: nama.trim(),
          asal: asal?.trim() || null,
          rating: parseInt(rating),
          komentar: komentar.trim(),
          tanggal_kunjungan: tanggal_kunjungan || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('[API Feedback] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal menyimpan feedback.' },
        { status: 500 }
      );
    }

    // Kirim notifikasi ke Telegram (non-blocking)
    sendTelegramNotification({ nama: nama.trim(), asal: asal?.trim(), rating, komentar: komentar.trim(), tanggal_kunjungan });

    return NextResponse.json({
      message: 'Feedback berhasil dikirim! Terima kasih atas masukan Anda.',
      success: true,
      feedback: data,
    });

  } catch (error) {
    console.error('[API Feedback] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Cek admin token (opsional — feedback publik bisa dilihat semua orang)
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API Feedback] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data feedback.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      feedback: data || [],
      total: data?.length || 0,
      averageRating: data?.length
        ? (data.reduce((sum, f) => sum + f.rating, 0) / data.length).toFixed(1)
        : 0,
    });

  } catch (error) {
    console.error('[API Feedback GET] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}

/**
 * Kirim notifikasi ke Telegram (non-blocking, tidak menggagalkan response).
 */
async function sendTelegramNotification({ nama, asal, rating, komentar, tanggal_kunjungan }) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.log('[Feedback Telegram] Token belum dikonfigurasi.');
      return;
    }

    // Format bintang visual
    const stars = '⭐'.repeat(rating) + '☆'.repeat(5 - rating);

    // Format tanggal kunjungan
    let tanggalStr = '-';
    if (tanggal_kunjungan) {
      try {
        tanggalStr = new Date(tanggal_kunjungan).toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      } catch {
        tanggalStr = tanggal_kunjungan;
      }
    }

    const message = `⭐ *FEEDBACK PENGUNJUNG BARU*\n\n`
      + `👤 *Nama:* ${nama}\n`
      + (asal ? `📍 *Asal:* ${asal}\n` : '')
      + `⭐ *Rating:* ${stars} (${rating}/5)\n`
      + `📅 *Tanggal Kunjungan:* ${tanggalStr}\n`
      + `💬 *Komentar:*\n${komentar}\n`
      + `\n⏰ *Diterima:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error('[Feedback Telegram] Gagal kirim:', err);
  }
}
