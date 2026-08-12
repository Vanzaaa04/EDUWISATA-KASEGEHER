'use client';

import { useState } from 'react';
import {
  User,
  ChatDots,
  Tag,
  PaperPlaneTilt,
  CheckCircle,
  SpinnerGap,
  Warning,
} from '@phosphor-icons/react';
import './ContactForm.css';

/**
 * ContactForm — Formulir kirim pesan (kritik, saran, pertanyaan).
 * Mengirim data ke API route /api/telegram (type: 'contact').
 */

const JENIS_OPTIONS = ['Pertanyaan', 'Kritik', 'Saran', 'Lainnya'];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nama: '',
    kontak: '',
    jenis: '',
    pesan: '',
  });

  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.nama.trim()) return 'Nama wajib diisi.';
    if (!formData.kontak.trim()) return 'WhatsApp atau Email wajib diisi.';
    if (!formData.jenis) return 'Jenis pesan wajib dipilih.';
    if (!formData.pesan.trim()) return 'Pesan wajib diisi.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        body: JSON.stringify({ type: 'contact', data: formData }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ nama: '', kontak: '', jenis: '', pesan: '' });
      } else {
        const result = await res.json();
        setStatus('error');
        setErrorMsg(result.message || 'Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Terjadi kesalahan jaringan. Pastikan koneksi Anda stabil.');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-success" data-aos="zoom-in">
        <div className="contact-success__icon">
          <CheckCircle size={72} weight="duotone" />
        </div>
        <h3 className="contact-success__title">Pesan Berhasil Terkirim!</h3>
        <p className="contact-success__desc">
          Terima kasih sudah menghubungi kami. Tim kami akan segera merespons pesan Anda.
        </p>
        <button className="btn-primary" onClick={() => setStatus('idle')}>
          Kirim Pesan Lagi
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div className="contact-form__error">
          <Warning size={20} weight="bold" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Nama */}
      <div className="contact-form__group" data-aos="fade-up">
        <label htmlFor="contact-nama" className="contact-form__label">
          <User size={18} weight="duotone" />
          Nama *
        </label>
        <input
          id="contact-nama"
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          placeholder="Masukkan nama Anda"
          className="contact-form__input"
          required
        />
      </div>

      {/* Kontak + Jenis (2 kolom) */}
      <div className="contact-form__row" data-aos="fade-up" data-aos-delay="50">
        <div className="contact-form__group">
          <label htmlFor="contact-kontak" className="contact-form__label">
            <ChatDots size={18} weight="duotone" />
            WhatsApp / Email *
          </label>
          <input
            id="contact-kontak"
            type="text"
            name="kontak"
            value={formData.kontak}
            onChange={handleChange}
            placeholder="08xxx atau email@contoh.com"
            className="contact-form__input"
            required
          />
        </div>
        <div className="contact-form__group">
          <label htmlFor="contact-jenis" className="contact-form__label">
            <Tag size={18} weight="duotone" />
            Jenis Pesan *
          </label>
          <select
            id="contact-jenis"
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            className="contact-form__input contact-form__select"
            required
          >
            <option value="" disabled>Pilih jenis</option>
            {JENIS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pesan */}
      <div className="contact-form__group" data-aos="fade-up" data-aos-delay="100">
        <label htmlFor="contact-pesan" className="contact-form__label">
          <PaperPlaneTilt size={18} weight="duotone" />
          Pesan *
        </label>
        <textarea
          id="contact-pesan"
          name="pesan"
          value={formData.pesan}
          onChange={handleChange}
          placeholder="Tulis pesan, pertanyaan, kritik, atau saran Anda di sini..."
          className="contact-form__input contact-form__textarea"
          rows={5}
          required
        />
      </div>

      {/* Submit */}
      <div className="contact-form__submit" data-aos="fade-up" data-aos-delay="150">
        <button
          type="submit"
          className="btn-primary contact-form__btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <SpinnerGap size={20} weight="bold" className="contact-form__spinner" />
              Mengirim...
            </>
          ) : (
            <>
              <PaperPlaneTilt size={20} weight="bold" />
              Kirim Pesan
            </>
          )}
        </button>
      </div>
    </form>
  );
}
