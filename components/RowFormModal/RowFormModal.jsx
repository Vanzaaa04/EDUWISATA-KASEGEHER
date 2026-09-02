'use client';

import { useState, useEffect } from 'react';
import { X, Warning, SpinnerGap } from '@phosphor-icons/react';
import './RowFormModal.css';

/**
 * RowFormModal — Modal untuk menambah atau mengedit baris data.
 * Form otomatis menyesuaikan jumlah kolom tabel.
 * Props:
 * - isOpen: boolean
 * - onClose: fungsi untuk menutup modal
 * - onSave: fungsi(values) untuk menyimpan
 * - columns: array judul kolom tabel
 * - editRow: objek baris yang sedang diedit (null jika buat baru)
 * - tableName: nama tabel (untuk judul modal)
 */
export default function RowFormModal({ isOpen, onClose, onSave, columns, editRow, tableName }) {
  const [values, setValues] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Isi form saat buka modal
  useEffect(() => {
    if (columns) {
      if (editRow) {
        // Edit: isi dengan data yang ada, padding jika kolom bertambah
        const currentValues = editRow.values || [];
        setValues(columns.map((_, i) => currentValues[i] || ''));
      } else {
        // Baru: kosongkan semua
        setValues(columns.map(() => ''));
      }
    }
    setError('');
  }, [columns, editRow, isOpen]);

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

  // Ubah nilai kolom
  const updateValue = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  // Handle simpan
  const handleSave = async () => {
    // Validasi: minimal 1 kolom harus terisi
    const hasValue = values.some((v) => v.trim() !== '');
    if (!hasValue) {
      setError('Minimal 1 kolom data wajib diisi.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await onSave(values);
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row-modal__backdrop" onClick={onClose}>
      <div
        className="row-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={editRow ? 'Edit Baris Data' : 'Tambah Baris Data'}
      >
        {/* Tombol tutup */}
        <button className="row-modal__close" onClick={onClose} aria-label="Tutup modal">
          <X size={20} weight="bold" />
        </button>

        {/* Header */}
        <div className="row-modal__header">
          <h2 className="row-modal__title">
            {editRow ? 'Edit Data' : 'Tambah Data Baru'}
          </h2>
          <p className="row-modal__subtitle">
            {tableName && `Tabel: ${tableName}`}
          </p>
        </div>

        {/* Body */}
        <div className="row-modal__body">
          {/* Error message */}
          {error && (
            <div className="row-modal__error">
              <Warning size={16} weight="bold" />
              <span>{error}</span>
            </div>
          )}

          {/* Form input untuk setiap kolom */}
          {(columns || []).map((col, i) => (
            <div key={i} className="row-modal__group">
              <label className="row-modal__label" htmlFor={`row-col-${i}`}>
                {col}
              </label>
              <input
                id={`row-col-${i}`}
                type="text"
                value={values[i] || ''}
                onChange={(e) => updateValue(i, e.target.value)}
                placeholder={`Isi ${col}...`}
                className="row-modal__input"
                disabled={loading}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="row-modal__footer">
          <button
            className="row-modal__btn-cancel"
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
              editRow ? 'Simpan Perubahan' : 'Tambah Data'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
