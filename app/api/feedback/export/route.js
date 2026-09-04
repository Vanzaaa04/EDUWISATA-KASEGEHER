import { NextResponse } from 'next/server';
import getSupabase from '@/lib/supabase';
import ExcelJS from 'exceljs';

export const dynamic = 'force-dynamic';

/**
 * API Route: /api/feedback/export
 * GET — Menghasilkan file Excel (.xlsx) berisi semua data feedback.
 * File langsung di-download oleh browser.
 */

export async function GET() {
  try {
    const supabase = getSupabase();

    // Ambil semua feedback dari database
    const { data: feedback, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[API Feedback Export] Supabase error:', error);
      return NextResponse.json(
        { message: 'Gagal mengambil data feedback.' },
        { status: 500 }
      );
    }

    // Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Eduwisata Herbal Desa Sukolelo';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet('Feedback Pengunjung');

    // === HEADER JUDUL ===
    sheet.mergeCells('A1:F1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = 'REKAP FEEDBACK PENGUNJUNG — EDUWISATA HERBAL DESA SUKOLELO';
    titleCell.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF0D4A28' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(1).height = 35;

    // Tanggal export
    sheet.mergeCells('A2:F2');
    const dateCell = sheet.getCell('A2');
    dateCell.value = `Diekspor pada: ${new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    dateCell.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF666666' } };
    dateCell.alignment = { horizontal: 'center' };
    sheet.getRow(2).height = 22;

    // Baris kosong
    sheet.addRow([]);

    // === HEADER KOLOM ===
    const headerRow = sheet.addRow(['No', 'Nama', 'Rating', 'Tanggal Kunjungan', 'Komentar']);
    headerRow.eachCell((cell) => {
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1A6B3C' }, // Hijau utama
      };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        bottom: { style: 'thin', color: { argb: 'FF0D4A28' } },
      };
    });
    headerRow.height = 28;

    // === ISI DATA ===
    (feedback || []).forEach((fb, index) => {
      // Format tanggal kunjungan
      let tanggalStr = '-';
      if (fb.tanggal_kunjungan) {
        try {
          tanggalStr = new Date(fb.tanggal_kunjungan).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } catch {
          tanggalStr = fb.tanggal_kunjungan;
        }
      }

      // Format rating visual
      const ratingStr = '⭐'.repeat(fb.rating || 0) + ` (${fb.rating}/5)`;

      const row = sheet.addRow([
        index + 1,
        fb.nama,
        ratingStr,
        tanggalStr,
        fb.komentar,
      ]);

      // Zebra striping
      if (index % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF0F7F2' }, // Hijau sangat muda
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

      // Nomor rata tengah
      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
      // Rating rata tengah
      row.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // === RINGKASAN ===
    sheet.addRow([]);
    const totalFeedback = feedback?.length || 0;
    const avgRating = totalFeedback > 0
      ? (feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / totalFeedback).toFixed(1)
      : 0;

    const summaryRow = sheet.addRow(['', `Total Feedback: ${totalFeedback}`, `Rata-rata Rating: ${avgRating}/5`, '', '']);
    summaryRow.eachCell((cell) => {
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0D4A28' } };
    });

    // === ATUR LEBAR KOLOM ===
    sheet.getColumn(1).width = 6;   // No
    sheet.getColumn(2).width = 25;  // Nama
    sheet.getColumn(3).width = 18;  // Rating
    sheet.getColumn(4).width = 25;  // Tanggal Kunjungan
    sheet.getColumn(5).width = 50;  // Komentar

    // Generate file Excel ke buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Nama file dengan tanggal
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `Feedback_Pengunjung_Eduwisata_${dateStr}.xlsx`;

    // Kirim response sebagai download file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('[API Feedback Export] Error:', error);
    return NextResponse.json(
      { message: 'Gagal mengekspor data.' },
      { status: 500 }
    );
  }
}
