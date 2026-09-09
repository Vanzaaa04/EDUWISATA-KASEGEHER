import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import ExcelJS from 'exceljs';

export const dynamic = 'force-dynamic';

/**
 * API Route: /api/data-tables/export
 * GET — Admin only. Menghasilkan file Excel (.xlsx) berisi data dari tabel tertentu.
 * Query params: token (admin token), tableId (ID tabel yang akan diexport)
 */

// Helper: buat Supabase client
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
}

// Helper: format tanggal Indonesia
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Helper: format angka dengan separator ribuan
function formatNumber(numStr) {
  if (!numStr && numStr !== 0) return '';
  const num = Number(numStr);
  if (isNaN(num)) return numStr;
  return num.toLocaleString('id-ID');
}

export async function GET(request) {
  try {
    // Ambil parameter dari URL
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const tableId = searchParams.get('tableId');

    if (!token) {
      return NextResponse.json({ message: 'Token tidak ditemukan.' }, { status: 401 });
    }

    if (!tableId) {
      return NextResponse.json({ message: 'ID tabel tidak ditemukan.' }, { status: 400 });
    }

    // Verifikasi admin token
    const supabase = getSupabase();

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ message: 'Token tidak valid.' }, { status: 401 });
    }

    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!adminUser) {
      return NextResponse.json({ message: 'Akses ditolak.' }, { status: 403 });
    }

    // Ambil data tabel
    const { data: table, error: tableError } = await supabase
      .from('data_tables')
      .select('*')
      .eq('id', tableId)
      .single();

    if (tableError || !table) {
      return NextResponse.json({ message: 'Tabel tidak ditemukan.' }, { status: 404 });
    }

    // Ambil baris data tabel
    const { data: rows, error: rowsError } = await supabase
      .from('data_rows')
      .select('*')
      .eq('table_id', tableId)
      .order('created_at', { ascending: true });

    if (rowsError) {
      return NextResponse.json({ message: 'Gagal mengambil data.' }, { status: 500 });
    }

    // Normalisasi kolom
    const columns = (table.columns || []).map((col) => {
      if (typeof col === 'string') return { name: col, type: 'text' };
      return { name: col.name || '', type: col.type || 'text' };
    });

    // Buat workbook Excel
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Eduwisata Herbal Desa Sukolelo';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet(table.title || 'Data');

    // Jumlah kolom total: No + kolom data
    const totalCols = columns.length + 1;
    const lastCol = String.fromCharCode(64 + totalCols); // A=1, B=2, ...

    // === HEADER JUDUL ===
    sheet.mergeCells(`A1:${lastCol}1`);
    const titleCell = sheet.getCell('A1');
    titleCell.value = `REKAP ${(table.title || 'DATA').toUpperCase()} EDUWISATA HERBAL DESA SUKOLELO`;
    titleCell.font = { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF0D4A28' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    sheet.getRow(1).height = 35;

    // Baris kosong
    sheet.addRow([]);

    // === HEADER KOLOM ===
    const headerValues = ['No', ...columns.map((col) => col.name)];
    const headerRow = sheet.addRow(headerValues);
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
    (rows || []).forEach((row, index) => {
      const values = (row.values || []).map((val, i) => {
        const colType = columns[i]?.type || 'text';
        if (colType === 'date') return formatDate(val);
        if (colType === 'number') return formatNumber(val);
        return val || '';
      });

      const dataRow = sheet.addRow([index + 1, ...values]);

      // Zebra striping
      if (index % 2 === 0) {
        dataRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF0F7F2' },
          };
        });
      }

      dataRow.eachCell((cell) => {
        cell.font = { name: 'Calibri', size: 10 };
        cell.alignment = { vertical: 'middle', wrapText: true };
        cell.border = {
          bottom: { style: 'thin', color: { argb: 'FFE0E0E0' } },
        };
      });

      // Nomor rata tengah
      dataRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // === BARIS TOTAL untuk kolom angka ===
    if (columns.some((c) => c.type === 'number')) {
      sheet.addRow([]);
      const totals = columns.map((col, i) => {
        if (col.type === 'number') {
          const sum = (rows || []).reduce((s, r) => {
            const val = Number(r.values?.[i]);
            return s + (isNaN(val) ? 0 : val);
          }, 0);
          return `Total: ${formatNumber(sum)}`;
        }
        return '';
      });
      const totalRow = sheet.addRow(['', ...totals]);
      totalRow.eachCell((cell) => {
        cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0D4A28' } };
      });
    }

    // === ATUR LEBAR KOLOM ===
    sheet.getColumn(1).width = 8; // No
    columns.forEach((col, i) => {
      const colIndex = i + 2;
      if (col.type === 'date') {
        sheet.getColumn(colIndex).width = 35;
      } else if (col.type === 'number') {
        sheet.getColumn(colIndex).width = 20;
      } else {
        sheet.getColumn(colIndex).width = 30;
      }
    });

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const dateStr = new Date().toISOString().split('T')[0];
    const safeTitle = (table.title || 'Data').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${safeTitle}_Eduwisata_${dateStr}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('[API Data Tables Export] Error:', error);
    return NextResponse.json(
      { message: 'Gagal mengekspor data.' },
      { status: 500 }
    );
  }
}
