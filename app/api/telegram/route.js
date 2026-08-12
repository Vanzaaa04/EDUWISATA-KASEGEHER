import { NextResponse } from 'next/server';

/**
 * API Route: /api/telegram
 * Menerima data form (tiket atau kontak) lalu mengirim notifikasi
 * ke Telegram Bot pengelola.
 *
 * Environment variables yang dibutuhkan (.env.local):
 * - TELEGRAM_BOT_TOKEN: Token bot Telegram
 * - TELEGRAM_CHAT_ID: Chat ID grup/channel tujuan
 *
 * Body request:
 * {
 *   type: 'ticket' | 'contact',
 *   data: { ... field form ... }
 * }
 */

export async function POST(request) {
  try {
    const { type, data } = await request.json();

    // Validasi data masuk
    if (!type || !data) {
      return NextResponse.json(
        { message: 'Data tidak valid.' },
        { status: 400 }
      );
    }

    // Ambil token dan chat ID dari environment variable
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Jika belum dikonfigurasi, tetap terima data tapi log saja
    if (!botToken || !chatId) {
      console.log('[API Telegram] Token/Chat ID belum dikonfigurasi.');
      console.log('[API Telegram] Data diterima:', JSON.stringify({ type, data }, null, 2));
      return NextResponse.json({
        message: 'Data berhasil diterima. (Telegram belum dikonfigurasi, data di-log di server)',
        success: true,
      });
    }

    // Buat pesan Telegram sesuai tipe form
    let message = '';

    if (type === 'ticket') {
      message = `🎫 *PEMESANAN TIKET BARU*\n\n`
        + `👤 *Nama:* ${data.nama}\n`
        + `📱 *WhatsApp:* ${data.whatsapp}\n`
        + `📧 *Email:* ${data.email}\n`
        + `📅 *Tanggal:* ${data.tanggal}\n`
        + `👥 *Jumlah:* ${data.jumlah} orang\n`
        + `🏷️ *Kategori:* ${data.kategori}\n`
        + (data.catatan ? `📝 *Catatan:* ${data.catatan}\n` : '')
        + `\n⏰ *Waktu:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;
    } else if (type === 'contact') {
      message = `💬 *PESAN MASUK*\n\n`
        + `👤 *Nama:* ${data.nama}\n`
        + `📱 *Kontak:* ${data.kontak}\n`
        + `📋 *Jenis:* ${data.jenis}\n`
        + `📝 *Pesan:*\n${data.pesan}\n`
        + `\n⏰ *Waktu:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}`;
    } else {
      return NextResponse.json(
        { message: 'Tipe form tidak dikenal.' },
        { status: 400 }
      );
    }

    // Kirim ke Telegram Bot API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) {
      const errData = await telegramRes.json();
      console.error('[API Telegram] Gagal kirim:', errData);
      return NextResponse.json(
        { message: 'Gagal mengirim notifikasi. Silakan coba lagi.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Data berhasil dikirim!',
      success: true,
    });

  } catch (error) {
    console.error('[API Telegram] Error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
