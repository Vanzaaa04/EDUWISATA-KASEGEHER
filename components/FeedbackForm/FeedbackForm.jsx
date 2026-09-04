'use client';

import { useState } from 'react';
import {
  Star,
  User,
  MapPin,
  CalendarBlank,
  ChatText,
  PaperPlaneTilt,
  CheckCircle,
  SpinnerGap,
  Warning,
} from '@phosphor-icons/react';
import './FeedbackForm.css';

/**
 * FeedbackForm — Formulir ulasan/feedback untuk pengunjung.
 * Termasuk interaksi rating bintang dan integrasi API /api/feedback.
 */
export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    nama: '',
    asal: '',
    rating: 0,
    tanggal_kunjungan: '',
    komentar: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.nama.trim()) return 'Nama wajib diisi.';
    if (formData.rating === 0) return 'Silakan berikan rating (1-5 bintang).';
    if (!formData.komentar.trim()) return 'Komentar wajib diisi.';
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
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const result = await res.json();
        setStatus('error');
        setErrorMsg(result.message || 'Gagal mengirim feedback. Silakan coba lagi.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Terjadi kesalahan jaringan. Pastikan koneksi Anda stabil.');
    }
  };

  // State sukses
  if (status === 'success') {
    return (
      <div className="feedback-form-card" data-aos="fade-up">
        <div className="feedback-success">
          <div className="feedback-success__icon">
            <CheckCircle size={72} weight="duotone" />
          </div>
          <h3 className="feedback-success__title">Terima Kasih!</h3>
          <p className="feedback-success__desc">
            Ulasan Anda sangat berarti bagi pengembangan Eduwisata Herbal Desa Sukolelo ke depannya.
          </p>
          <div className="feedback-success__rating">
            {'⭐'.repeat(formData.rating)}
          </div>
          <button 
            className="btn-primary" 
            onClick={() => {
              setStatus('idle');
              setFormData({ nama: '', asal: '', rating: 0, tanggal_kunjungan: '', komentar: '' });
              setHoverRating(0);
            }}
          >
            Kirim Ulasan Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-form-card" data-aos="fade-up">
      {/* Header */}
      <div className="feedback-form-card__header">
        <h3 className="feedback-form-card__title">Bagikan Pengalaman Anda</h3>
        <p className="feedback-form-card__subtitle">
          Bantu kami menjadi lebih baik dengan memberikan ulasan Anda.
        </p>
      </div>

      {/* Form */}
      <form className="feedback-form" onSubmit={handleSubmit} noValidate>
        {status === 'error' && (
          <div className="feedback-form__error">
            <Warning size={20} weight="bold" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Rating Bintang */}
        <div className="feedback-rating">
          <label className="feedback-rating__label">
            Seberapa puas Anda dengan pengalaman kunjungan Anda? *
          </label>
          <div 
            className="feedback-rating__stars"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= (hoverRating || formData.rating);
              return (
                <button
                  key={star}
                  type="button"
                  className={`feedback-rating__star ${isActive ? 'feedback-rating__star--active' : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoverRating(star)}
                  aria-label={`Rating ${star} bintang`}
                >
                  <Star 
                    size={36} 
                    weight={isActive ? 'fill' : 'regular'} 
                    color={isActive ? '#d4a843' : '#c0c0c0'} 
                  />
                </button>
              );
            })}
          </div>
          <span className="feedback-rating__text">
            {formData.rating === 0 
              ? 'Pilih bintang untuk memberi rating' 
              : `Anda memberikan rating ${formData.rating} bintang`}
          </span>
        </div>

        {/* Row: Nama & Tanggal Kunjungan */}
        <div className="feedback-form__row">
          <div className="feedback-form__group">
            <label htmlFor="fb-nama" className="feedback-form__label">
              <User size={18} weight="duotone" />
              Nama Lengkap *
            </label>
            <input
              id="fb-nama"
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="feedback-form__input"
              disabled={status === 'loading'}
              required
            />
          </div>
          <div className="feedback-form__group">
            <label htmlFor="fb-tanggal" className="feedback-form__label">
              <CalendarBlank size={18} weight="duotone" />
              Tanggal Kunjungan (Opsional)
            </label>
            <input
              id="fb-tanggal"
              type="date"
              name="tanggal_kunjungan"
              value={formData.tanggal_kunjungan}
              onChange={handleChange}
              className="feedback-form__input"
              disabled={status === 'loading'}
            />
          </div>
        </div>

        {/* Komentar */}
        <div className="feedback-form__group">
          <label htmlFor="fb-komentar" className="feedback-form__label">
            <ChatText size={18} weight="duotone" />
            Komentar & Saran *
          </label>
          <textarea
            id="fb-komentar"
            name="komentar"
            value={formData.komentar}
            onChange={handleChange}
            placeholder="Ceritakan pengalaman Anda, apa yang Anda suka, dan apa yang bisa kami perbaiki..."
            className="feedback-form__input feedback-form__textarea"
            disabled={status === 'loading'}
            required
          />
        </div>

        {/* Submit */}
        <div className="feedback-form__submit">
          <button
            type="submit"
            className="btn-primary feedback-form__btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <SpinnerGap size={20} weight="bold" className="feedback-form__spinner" />
                Mengirim Ulasan...
              </>
            ) : (
              <>
                <PaperPlaneTilt size={20} weight="bold" />
                Kirim Ulasan
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
