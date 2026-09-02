'use client';

import { useState, useEffect } from 'react';
import { X, Warning, SpinnerGap } from '@phosphor-icons/react';
import './RowFormModal.css';

/**
 * RowFormModal — Modal untuk menambah atau mengedit baris data.
 * Form otomatis menyesuaikan tipe kolom:
 * - 'date': menampilkan date picker (kalender)
 * - 'number': menampilkan input angka
 * - 'text': menampilkan input teks biasa
 * Props:
 * - isOpen: boolean
 * - onClose: fungsi untuk menutup modal
 * - onSave: fungsi(values) untuk menyimpan
 * - columns: array kolom tabel [{name, type}] atau string[]
 * - editRow: objek baris yang sedang diedit (null jika buat baru)
 * - tableName: nama tabel (untuk judul modal)
 */
export default function RowFormModal({ isOpen, onClose, onSave, columns, editRow, tableName }) {
  const [values, setValues] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Normalisasi kolom (support format lama string[] dan baru object[])
  const normalizedColumns = (columns || []).map((col) => {
    if (typeof col === 'string') {
      return { name: col, type: 'text' };
    }
    return { name: col.name || '', type: col.type || 'text' };
  });

  // Isi form saat buka modal
  useEffect(() => {
    if (normalizedColumns.length > 0) {
      if (editRow) {
        const currentValues = editRow.values || [];
        setValues(normalizedColumns.map((_, i) => currentValues[i] || ''));
      } else {
        setValues(normalizedColumns.map(() => ''));
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
    const hasValue = values.some((v) => v.toString().trim() !== '');
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

  // Render input berdasarkan tipe kolom
  const renderInput = (col, index) => {
    const commonProps = {
      id: `row-col-${index}`,
      value: values[index] || '',
      onChange: (e) => updateValue(index, e.target.value),
      className: 'row-modal__input',
      disabled: loading,
    };

    switch (col.type) {
      case 'date':
        return (
          <input
            {...commonProps}
            type="date"
          />
        );
      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            placeholder="Masukkan angka..."
            min="0"
          />
        );
      default:
        return (
          <input
            {...commonProps}
            type="text"
            placeholder={`Isi ${col.name}...`}
          />
        );
    }
  };

  // Format label tipe kolom
  const getTypeIcon = (type) => {
    switch (type) {
      case 'date': return '📅';
      case 'number': return '🔢';
      default: return '✏️';
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
          {normalizedColumns.map((col, i) => (
            <div key={i} className="row-modal__group">
              <label className="row-modal__label" htmlFor={`row-col-${i}`}>
                {getTypeIcon(col.type)} {col.name}
              </label>
              {renderInput(col, i)}
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
