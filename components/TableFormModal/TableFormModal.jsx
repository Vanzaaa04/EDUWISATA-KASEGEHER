'use client';

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Warning, SpinnerGap } from '@phosphor-icons/react';
import './TableFormModal.css';

/**
 * TableFormModal — Modal untuk membuat atau mengedit tabel data.
 * Admin bisa menentukan judul tabel dan kolom-kolom beserta tipe datanya.
 * Tipe kolom: 'text' (teks bebas), 'date' (kalender), 'number' (angka)
 * Props:
 * - isOpen: boolean
 * - onClose: fungsi untuk menutup modal
 * - onSave: fungsi(title, columns) untuk menyimpan
 * - editTable: objek tabel yang sedang diedit (null jika buat baru)
 */

// Pilihan tipe kolom
const COLUMN_TYPES = [
  { value: 'text', label: '✏️ Teks' },
  { value: 'date', label: '📅 Tanggal' },
  { value: 'number', label: '🔢 Angka' },
];

export default function TableFormModal({ isOpen, onClose, onSave, editTable }) {
  const [title, setTitle] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: 'text' }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Isi form saat edit tabel yang sudah ada
  useEffect(() => {
    if (editTable) {
      setTitle(editTable.title || '');
      // Support format lama (array string) dan baru (array objek)
      const cols = (editTable.columns || []).map((col) => {
        if (typeof col === 'string') {
          return { name: col, type: 'text' };
        }
        return { name: col.name || '', type: col.type || 'text' };
      });
      setColumns(cols.length > 0 ? cols : [{ name: '', type: 'text' }]);
    } else {
      setTitle('');
      setColumns([{ name: '', type: 'text' }]);
    }
    setError('');
  }, [editTable, isOpen]);

  // Tutup modal saat tekan Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Tambah kolom baru
  const addColumn = () => {
    setColumns([...columns, { name: '', type: 'text' }]);
  };

  // Hapus kolom
  const removeColumn = (index) => {
    if (columns.length <= 1) return;
    setColumns(columns.filter((_, i) => i !== index));
  };

  // Ubah nama kolom
  const updateColumnName = (index, value) => {
    const newCols = [...columns];
    newCols[index] = { ...newCols[index], name: value };
    setColumns(newCols);
  };

  // Ubah tipe kolom
  const updateColumnType = (index, value) => {
    const newCols = [...columns];
    newCols[index] = { ...newCols[index], type: value };
    setColumns(newCols);
  };

  // Handle simpan
  const handleSave = async () => {
    if (!title.trim()) {
      setError('Judul tabel wajib diisi.');
      return;
    }

    const validColumns = columns.filter((c) => c.name.trim() !== '');
    if (validColumns.length === 0) {
      setError('Minimal 1 kolom wajib diisi.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await onSave(title.trim(), validColumns);
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan tabel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table-modal__backdrop" onClick={onClose}>
      <div
        className="table-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={editTable ? 'Edit Tabel' : 'Buat Tabel Baru'}
      >
        {/* Tombol tutup */}
        <button className="table-modal__close" onClick={onClose} aria-label="Tutup modal">
          <X size={20} weight="bold" />
        </button>

        {/* Header */}
        <div className="table-modal__header">
          <h2 className="table-modal__title">
            {editTable ? 'Edit Tabel' : 'Buat Tabel Baru'}
          </h2>
          <p className="table-modal__subtitle">
            {editTable
              ? 'Ubah judul atau kolom tabel Anda.'
              : 'Tentukan judul tabel, judul kolom, dan tipe datanya.'}
          </p>
        </div>

        {/* Body */}
        <div className="table-modal__body">
          {/* Error message */}
          {error && (
            <div className="table-modal__error">
              <Warning size={16} weight="bold" />
              <span>{error}</span>
            </div>
          )}

          {/* Judul tabel */}
          <div className="table-modal__group">
            <label className="table-modal__label" htmlFor="table-title">
              Judul Tabel
            </label>
            <input
              id="table-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Data Pengunjung September 2026"
              className="table-modal__input"
              disabled={loading}
            />
          </div>

          {/* Kolom-kolom */}
          <div className="table-modal__group">
            <div className="table-modal__columns-label">
              <label className="table-modal__label" style={{ marginBottom: 0 }}>
                Kolom Data
              </label>
              <button
                className="table-modal__add-col"
                onClick={addColumn}
                disabled={loading}
                type="button"
              >
                <Plus size={12} weight="bold" />
                Tambah Kolom
              </button>
            </div>

            <div className="table-modal__columns-list">
              {columns.map((col, i) => (
                <div key={i} className="table-modal__column-item">
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => updateColumnName(i, e.target.value)}
                    placeholder={`Nama kolom ${i + 1}`}
                    className="table-modal__column-input"
                    disabled={loading}
                  />
                  <select
                    value={col.type}
                    onChange={(e) => updateColumnType(i, e.target.value)}
                    className="table-modal__column-type"
                    disabled={loading}
                  >
                    {COLUMN_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {columns.length > 1 && (
                    <button
                      className="table-modal__column-remove"
                      onClick={() => removeColumn(i)}
                      aria-label={`Hapus kolom ${i + 1}`}
                      disabled={loading}
                      type="button"
                    >
                      <Minus size={16} weight="bold" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="table-modal__footer">
          <button
            className="table-modal__btn-cancel"
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            Batal
          </button>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={loading}
            type="button"
          >
            {loading ? (
              <>
                <SpinnerGap size={18} weight="bold" className="login-form__spinner" />
                Menyimpan...
              </>
            ) : (
              editTable ? 'Simpan Perubahan' : 'Buat Tabel'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
