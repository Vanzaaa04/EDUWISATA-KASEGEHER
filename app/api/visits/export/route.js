import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import ExcelJS from 'exceljs';

export const dynamic = 'force-dynamic';

/**
 * API Route: /api/visits/export
 * GET — Admin only. Menghasilkan file Excel (.xlsx) berisi data kunjungan website.
 * Kolom: No | Pengunjung ke-X | Waktu Kunjungan
 */
export async function GET(request) {
  try {
    // Verifikasi admin token dari query parameter (karena download link)
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { message: 'Token tidak ditemukan.' },
        { status: 401 }
      );
    }

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

    // Cek admin
    const { data: adminUser } = await supabaseAuth
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!adminUser) {
      return NextResponse.json(
        { message: 'Akses ditolak.' },
        { status: 403 }
      );
    }

    // Ambil semua data kunjungan (urut dari terlama ke terbaru untuk penomoran)
    const supabase = getSupabase();
    const { data: visits, error } = await supabase
      .from('site_visits')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[API Visits Export] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data.' },
        { status: 500 }
      );
    }

    // Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Eduwisata Herbal Desa Sukolelo';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Kunjungan Website');

    // === HEADER JUDUL ===
    sheet.mergeCells('A1:C1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'REKAP KUNJUNGAN WEBSITE EDUWISATA HERBAL DESA SUKOLELO';
    titleCell.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF0D4A28' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(1).height = 35;

    // Baris kosong
    sheet.addRow([]);

    // === HEADER KOLOM ===
    const headerRow = sheet.addRow(['No', 'Pengunjung', 'Waktu Kunjungan']);
    headerRow.eachCell((cell) => {
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1A6B3C' },
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FF0D4A28' } },
      };
    });
    headerRow.height = 28;

    // === ISI DATA ===
    (visits || []).forEach((visit, index) => {
      // Format tanggal (Paksa ke zona waktu WIB/Jakarta)
      let dateStr = '';
      try {
        dateStr = new Date(visit.created_at).toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        dateStr = visit.created_at;
      }

      const row = sheet.addRow([
        index + 1,
        `Pengunjung ke-${index + 1}`,
        dateStr,
      ]);

      // Zebra striping
      if (index % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF0F7F2' },
          };
        });
      }

      row.eachCell((cell) => {
        cell.font = { name: 'Calibri', size: 10 };
        cell.alignment = { vertical: 'middle', wrapText: true };
        cell.border = {
          bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        };
      });

      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // === RINGKASAN ===
    sheet.addRow([]);
    const summaryRow = sheet.addRow([
      '',
      `Total Kunjungan: ${visits?.length || 0}`,
      '',
    ]);
    summaryRow.eachCell((cell) => {
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0D4A28' } };
    });

    // === ATUR LEBAR KOLOM ===
    sheet.getColumn(1).width = 8;
    sheet.getColumn(2).width = 25;
    sheet.getColumn(3).width = 30;

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `Kunjungan_Website_Eduwisata_${dateStr}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('[API Visits Export] Error:', error);
    return NextResponse.json(
      { message: 'Gagal mengekspor data.' },
      { status: 500 }
    );
  }
}
