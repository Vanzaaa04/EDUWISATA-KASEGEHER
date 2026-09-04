'use client';

import { useState } from 'react';
import { Table, PencilSimple, Trash, Plus, Package } from '@phosphor-icons/react';
import './DataTable.css';

/**
 * DataTable — Komponen untuk menampilkan 1 tabel data.
 * Mendukung tipe kolom (text, date, number) untuk format tampilan.
 * Props:
 * - table: objek tabel { id, title, columns, rows }
 * - isAdmin: boolean, apakah user adalah admin
 * - onEditTable: fungsi untuk membuka modal edit tabel
 * - onDeleteTable: fungsi untuk menghapus tabel
 * - onAddRow: fungsi untuk membuka modal tambah baris
 * - onEditRow: fungsi untuk membuka modal edit baris
 * - onDeleteRow: fungsi untuk menghapus baris
 */

// Helper: format tanggal menjadi tampilan Indonesia
function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

// Helper: normalisasi kolom (support format lama string[] dan baru object[])
function normalizeColumns(columns) {
  return (columns || []).map((col) => {
    if (typeof col === 'string') {
      return { name: col, type: 'text' };
    }
    return { name: col.name || '', type: col.type || 'text' };
  });
}

// Helper: format value berdasarkan tipe kolom
function formatValue(value, type) {
  if (!value && value !== 0) return '-';
  switch (type) {
    case 'date':
      return formatDate(value);
    case 'number':
      return formatNumber(value);
    default:
      return value;
  }
}

export default function DataTable({
  table,
  isAdmin,
  onEditTable,
  onDeleteTable,
  onAddRow,
  onEditRow,
  onDeleteRow,
}) {
  const [confirmDeleteTable, setConfirmDeleteTable] = useState(false);
  const [confirmDeleteRowId, setConfirmDeleteRowId] = useState(null);

  const normalizedCols = normalizeColumns(table.columns);

  // Handle hapus tabel setelah konfirmasi
  const handleDeleteTable = () => {
    onDeleteTable(table.id);
    setConfirmDeleteTable(false);
  };

  // Handle hapus baris setelah konfirmasi
  const handleDeleteRow = (rowId) => {
    onDeleteRow(rowId);
    setConfirmDeleteRowId(null);
  };

  return (
    <div className="data-table" data-aos="fade-up">
      {/* Header tabel */}
      <div className="data-table__header">
        <h3 className="data-table__title">
          <Table size={22} weight="duotone" className="data-table__title-icon" />
          {table.title}
        </h3>

        {/* Tombol admin di header tabel */}
        {isAdmin && (
          <div className="data-table__admin-actions">
            <button
              className="data-table__admin-btn data-table__admin-btn--edit"
              onClick={() => onEditTable(table)}
              aria-label="Edit tabel"
            >
              <PencilSimple size={14} weight="bold" />
              Edit
            </button>
            <button
              className="data-table__admin-btn data-table__admin-btn--delete"
              onClick={() => setConfirmDeleteTable(true)}
              aria-label="Hapus tabel"
            >
              <Trash size={14} weight="bold" />
              Hapus
            </button>
          </div>
        )}
      </div>

      {/* Konfirmasi hapus tabel */}
      {confirmDeleteTable && (
        <div className="data-table__confirm">
          <span className="data-table__confirm-text">Yakin hapus tabel ini?</span>
          <button
            className="data-table__confirm-btn data-table__confirm-btn--yes"
            onClick={handleDeleteTable}
          >
            Ya, Hapus
          </button>
          <button
            className="data-table__confirm-btn data-table__confirm-btn--no"
            onClick={() => setConfirmDeleteTable(false)}
          >
            Batal
          </button>
        </div>
      )}

      {/* Konten tabel */}
      {table.rows && table.rows.length > 0 ? (
        <div className="data-table__wrapper">
          <table className="data-table__table">
            <thead>
              <tr>
                <th className="data-table__th data-table__th--number">No</th>
                {normalizedCols.map((col, i) => (
                  <th key={i} className="data-table__th">{col.name}</th>
                ))}
                {isAdmin && (
                  <th className="data-table__th data-table__th--actions">Aksi</th>
                )}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={row.id} className="data-table__tr">
                  <td className="data-table__td data-table__td--number">{rowIndex + 1}</td>
                  {(row.values || []).map((val, i) => (
                    <td key={i} className="data-table__td">
                      {formatValue(val, normalizedCols[i]?.type)}
                    </td>
                  ))}
                  {isAdmin && (
                    <td className="data-table__td data-table__td--actions">
                      {confirmDeleteRowId === row.id ? (
                        <>
                          <button
                            className="data-table__confirm-btn data-table__confirm-btn--yes"
                            onClick={() => handleDeleteRow(row.id)}
                            style={{ marginRight: '4px', fontSize: '0.7rem', padding: '4px 8px' }}
                          >
                            Ya
                          </button>
                          <button
                            className="data-table__confirm-btn data-table__confirm-btn--no"
                            onClick={() => setConfirmDeleteRowId(null)}
                            style={{ fontSize: '0.7rem', padding: '4px 8px' }}
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="data-table__row-btn data-table__row-btn--edit"
                            onClick={() => onEditRow(table, row)}
                            aria-label="Edit baris"
                          >
                            <PencilSimple size={16} weight="bold" />
                          </button>
                          <button
                            className="data-table__row-btn data-table__row-btn--delete"
                            onClick={() => setConfirmDeleteRowId(row.id)}
                            aria-label="Hapus baris"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </>
                      )}
                    </td>
                  )}
                </tr>
              ))}
              {/* Baris total otomatis untuk kolom angka */}
              {normalizedCols.some((c) => c.type === 'number') && (
                <tr className="data-table__tr data-table__tr--total">
                  <td className="data-table__td data-table__td--total-label" colSpan={1}>
                    <strong>Total</strong>
                  </td>
                  {normalizedCols.map((col, i) => (
                    <td key={i} className="data-table__td data-table__td--total">
                      {col.type === 'number' ? (
                        <strong>
                          {formatNumber(
                            table.rows.reduce((sum, r) => {
                              const val = Number(r.values?.[i]);
                              return sum + (isNaN(val) ? 0 : val);
                            }, 0)
                          )}
                        </strong>
                      ) : ''}
                    </td>
                  ))}
                  {isAdmin && <td className="data-table__td" />}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="data-table__empty">
          <Package size={48} weight="duotone" className="data-table__empty-icon" />
          <p>Belum ada data dalam tabel ini.</p>
        </div>
      )}

      {/* Tombol tambah baris (admin) */}
      {isAdmin && (
        <button
          className="data-table__add-row"
          onClick={() => onAddRow(table)}
        >
          <Plus size={16} weight="bold" />
          Tambah Baris Data
        </button>
      )}
    </div>
  );
}
