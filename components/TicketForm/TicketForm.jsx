'use client';

import { useState } from 'react';
import {
  User,
  WhatsappLogo,
  EnvelopeSimple,
  CalendarBlank,
  UsersThree,
  Tag,
  Notepad,
  PaperPlaneTilt,
  CheckCircle,
  SpinnerGap,
  Warning,
} from '@phosphor-icons/react';
import './TicketForm.css';

/**
 * TicketForm — Formulir pemesanan tiket kunjungan.
 * Mengirim data ke API route /api/telegram.
 * Menampilkan animasi sukses setelah submit berhasil.
 */

const KATEGORI_OPTIONS = ['Umum', 'Pelajar', 'Rombongan'];

export default function TicketForm() {
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    email: '',
    tanggal: '',
    jumlah: '',
    kategori: '',
    catatan: '',
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validasi form sebelum submit
  const validateForm = () => {
    if (!formData.nama.trim()) return 'Nama lengkap wajib diisi.';
    if (!formData.whatsapp.trim()) return 'Nomor WhatsApp wajib diisi.';
    if (!formData.email.trim()) return 'Email wajib diisi.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Format email tidak valid.';
    if (!formData.tanggal) return 'Tanggal kunjungan wajib dipilih.';
    if (!formData.jumlah || Number(formData.jumlah) < 1) return 'Jumlah pengunjung minimal 1.';
    if (!formData.kategori) return 'Kategori pengunjung wajib dipilih.';
    return null;
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    const validationError = validateForm();
    if (validationError) {
      setStatus('error');
      setErrorMsg(validationError);
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ticket', data: formData }),
      });

      if (res.ok) {
        setStatus('success');
        // Reset form setelah sukses
        setFormData({
          nama: '',
          whatsapp: '',
          email: '',
          tanggal: '',
          jumlah: '',
          kategori: '',
          catatan: '',
        });
      } else {
        const result = await res.json();
        setStatus('error');
        setErrorMsg(result.message || 'Gagal mengirim data. Silakan coba lagi.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Terjadi kesalahan jaringan. Pastikan koneksi Anda stabil.');
    }
  };

  // Tampilan sukses
  if (status === 'success') {
    return (
      <div className="ticket-success" data-aos="zoom-in">
        <div className="ticket-success__icon">
          <CheckCircle size={72} weight="duotone" />
        </div>
        <h3 className="ticket-success__title">Tiket Berhasil Dipesan!</h3>
        <p className="ticket-success__desc">
          Data pemesanan Anda telah terkirim ke tim pengelola.
          Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
        </p>
        <button
          className="btn-primary"
          onClick={() => setStatus('idle')}
        >
          Pesan Tiket Lagi
        </button>
      </div>
    );
  }

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate>
      {/* Pesan error */}
      {status === 'error' && (
        <div className="ticket-form__error" data-aos="shake">
          <Warning size={20} weight="bold" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Nama Lengkap */}
      <div className="ticket-form__group" data-aos="fade-up" data-aos-delay="0">
        <label htmlFor="ticket-nama" className="ticket-form__label">
          <User size={18} weight="duotone" />
          Nama Lengkap *
        </label>
        <input
          id="ticket-nama"
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap Anda"
          className="ticket-form__input"
          required
        />
      </div>

      {/* WhatsApp + Email (2 kolom) */}
      <div className="ticket-form__row" data-aos="fade-up" data-aos-delay="50">
        <div className="ticket-form__group">
          <label htmlFor="ticket-wa" className="ticket-form__label">
            <WhatsappLogo size={18} weight="duotone" />
            Nomor WhatsApp *
          </label>
          <input
            id="ticket-wa"
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="ticket-form__input"
            required
          />
        </div>
        <div className="ticket-form__group">
          <label htmlFor="ticket-email" className="ticket-form__label">
            <EnvelopeSimple size={18} weight="duotone" />
            Email *
          </label>
          <input
            id="ticket-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@contoh.com"
            className="ticket-form__input"
            required
          />
        </div>
      </div>

      {/* Tanggal + Jumlah + Kategori (3 kolom) */}
      <div className="ticket-form__row ticket-form__row--3" data-aos="fade-up" data-aos-delay="100">
        <div className="ticket-form__group">
          <label htmlFor="ticket-tanggal" className="ticket-form__label">
            <CalendarBlank size={18} weight="duotone" />
            Tanggal Kunjungan *
          </label>
          <input
            id="ticket-tanggal"
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="ticket-form__input"
            required
          />
        </div>
        <div className="ticket-form__group">
          <label htmlFor="ticket-jumlah" className="ticket-form__label">
            <UsersThree size={18} weight="duotone" />
            Jumlah Pengunjung *
          </label>
          <input
            id="ticket-jumlah"
            type="number"
            name="jumlah"
            value={formData.jumlah}
            onChange={handleChange}
            placeholder="1"
            min="1"
            className="ticket-form__input"
            required
          />
        </div>
        <div className="ticket-form__group">
          <label htmlFor="ticket-kategori" className="ticket-form__label">
            <Tag size={18} weight="duotone" />
            Kategori *
          </label>
          <select
            id="ticket-kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="ticket-form__input ticket-form__select"
            required
          >
            <option value="" disabled>Pilih kategori</option>
            {KATEGORI_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Catatan Tambahan */}
      <div className="ticket-form__group" data-aos="fade-up" data-aos-delay="150">
        <label htmlFor="ticket-catatan" className="ticket-form__label">
          <Notepad size={18} weight="duotone" />
          Catatan Tambahan
        </label>
        <textarea
          id="ticket-catatan"
          name="catatan"
          value={formData.catatan}
          onChange={handleChange}
          placeholder="Informasi tambahan (opsional, contoh: ada anak kecil, butuh guide, dll)"
          className="ticket-form__input ticket-form__textarea"
          rows={4}
        />
      </div>

      {/* Tombol Submit */}
      <div className="ticket-form__submit" data-aos="fade-up" data-aos-delay="200">
        <button
          type="submit"
          className="btn-primary ticket-form__btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <SpinnerGap size={20} weight="bold" className="ticket-form__spinner" />
              Mengirim...
            </>
          ) : (
            <>
              <PaperPlaneTilt size={20} weight="bold" />
              Pesan Tiket Sekarang
            </>
          )}
        </button>
      </div>
    </form>
  );
}
