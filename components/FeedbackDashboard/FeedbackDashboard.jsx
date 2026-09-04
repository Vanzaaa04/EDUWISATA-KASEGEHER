'use client';

import { useState, useEffect } from 'react';
import {
  ChatCenteredText,
  Star,
  DownloadSimple,
  SpinnerGap,
  Warning,
  Trash,
} from '@phosphor-icons/react';
import './FeedbackDashboard.css';

/**
 * FeedbackDashboard — Komponen admin untuk melihat data feedback.
 * Menampilkan ringkasan statistik, tabel data, dan tombol export Excel.
 */
export default function FeedbackDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState({ total: 0, averageRating: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Fetch data feedback
  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      
      if (data.success) {
        setFeedback(data.feedback);
        setStats({
          total: data.total,
          averageRating: data.averageRating,
        });
      } else {
        setError(data.message || 'Gagal mengambil data feedback.');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  // Handler Hapus Feedback
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus feedback ini? Data tidak bisa dikembalikan.')) {
      return;
    }
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        // Refresh data setelah berhasil
        fetchFeedback();
      } else {
        alert(data.message || 'Gagal menghapus feedback');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setDeletingId(null);
    }
  };

  // Helper format tanggal (Indonesia)
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Helper format datetime (untuk created_at)
  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="fb-loading">
        <SpinnerGap size={48} weight="bold" className="fb-loading__spinner" />
        <p>Memuat data feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feedback-form__error" style={{ margin: '2rem 0' }}>
        <Warning size={20} weight="bold" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="feedback-dashboard">
      {/* Stats Header */}
      <div className="fb-stats">
        <div className="fb-stat-card">
          <div className="fb-stat-card__icon">
            <ChatCenteredText size={24} weight="duotone" />
          </div>
          <div className="fb-stat-card__info">
            <span className="fb-stat-card__label">Total Feedback</span>
            <span className="fb-stat-card__value">{stats.total}</span>
          </div>
        </div>
        <div className="fb-stat-card">
          <div className="fb-stat-card__icon">
            <Star size={24} weight="duotone" />
          </div>
          <div className="fb-stat-card__info">
            <span className="fb-stat-card__label">Rata-rata Rating</span>
            <span className="fb-stat-card__value">
              {stats.averageRating} <span style={{ fontSize: '1rem', color: '#d4a843' }}>⭐</span>
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="fb-toolbar">
        <h3 className="fb-toolbar__title">Daftar Feedback Pengunjung</h3>
        
        {/* Tombol Export yang langsung download dari API */}
        <a 
          href={`/api/feedback/export?t=${Date.now()}`} 
          target="_blank"
          rel="noopener noreferrer"
          className="fb-toolbar__btn"
        >
          <DownloadSimple size={18} weight="bold" />
          Download Excel
        </a>
      </div>

      {/* Tabel */}
      <div className="fb-table-container">
        {feedback.length > 0 ? (
          <table className="fb-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                <th>Pengunjung</th>
                <th style={{ textAlign: 'center' }}>Rating</th>
                <th>Tgl Kunjungan</th>
                <th>Komentar</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((fb, index) => (
                <tr key={fb.id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>
                    <strong>{fb.nama}</strong>
                    {fb.tanggal_kunjungan && (
                      <span className="fb-table__date">Diisi: {formatDate(fb.tanggal_kunjungan)}</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="fb-table__rating" title={`Rating: ${fb.rating}/5`}>
                      {'⭐'.repeat(fb.rating)}
                    </div>
                  </td>
                  <td>{formatDate(fb.tanggal_kunjungan)}</td>
                  <td>
                    <div className="fb-table__comment">{fb.komentar}</div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="fb-table__delete-btn"
                      onClick={() => handleDelete(fb.id)}
                      disabled={deletingId === fb.id}
                      title="Hapus Feedback"
                    >
                      {deletingId === fb.id ? (
                        <SpinnerGap size={18} className="fb-loading__spinner" />
                      ) : (
                        <Trash size={18} weight="bold" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="fb-empty">
            <ChatCenteredText size={64} weight="duotone" className="fb-empty__icon" />
            <p>Belum ada data feedback pengunjung.</p>
          </div>
        )}
      </div>
    </div>
  );
}
