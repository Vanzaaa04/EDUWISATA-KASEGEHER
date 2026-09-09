'use client';

import { useState, useEffect } from 'react';
import {
  Eye,
  CalendarBlank,
  ChartLineUp,
  DownloadSimple,
  SpinnerGap,
  Warning,
  TrendUp,
} from '@phosphor-icons/react';
import './VisitsDashboard.css';

/**
 * VisitsDashboard — Dashboard admin untuk melihat statistik kunjungan website.
 * Menampilkan: statistik ringkasan dan tabel kunjungan (No, Pengunjung ke-X, IP, Waktu).
 */
export default function VisitsDashboard({ adminToken }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data kunjungan dari API admin
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await fetch('/api/visits/admin', {
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        });
        const result = await res.json();

        if (result.success) {
          setData(result);
        } else {
          setError(result.message || 'Gagal mengambil data kunjungan.');
        }
      } catch (err) {
        setError('Terjadi kesalahan jaringan.');
      } finally {
        setLoading(false);
      }
    };

    if (adminToken) {
      fetchVisits();
    }
  }, [adminToken]);

  // Helper: Format tanggal (Indonesia)
  const formatDateTime = (dateStr) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="vd-loading">
        <SpinnerGap size={48} weight="bold" className="vd-loading__spinner" />
        <p>Memuat data kunjungan website...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="feedback-form__error" style={{ margin: '2rem 0' }}>
        <Warning size={20} weight="bold" />
        <span>{error}</span>
      </div>
    );
  }

  if (!data) return null;

  const { stats, visits } = data;

  return (
    <div className="visits-dashboard">
      {/* Kartu Statistik */}
      <div className="vd-stats">
        <div className="vd-stat-card">
          <div className="vd-stat-card__icon vd-stat-card__icon--primary">
            <Eye size={24} weight="duotone" />
          </div>
          <div className="vd-stat-card__info">
            <span className="vd-stat-card__label">Total Kunjungan</span>
            <span className="vd-stat-card__value">{stats.total}</span>
          </div>
        </div>

        <div className="vd-stat-card">
          <div className="vd-stat-card__icon vd-stat-card__icon--green">
            <CalendarBlank size={24} weight="duotone" />
          </div>
          <div className="vd-stat-card__info">
            <span className="vd-stat-card__label">Hari Ini</span>
            <span className="vd-stat-card__value">{stats.today}</span>
          </div>
        </div>

        <div className="vd-stat-card">
          <div className="vd-stat-card__icon vd-stat-card__icon--blue">
            <ChartLineUp size={24} weight="duotone" />
          </div>
          <div className="vd-stat-card__info">
            <span className="vd-stat-card__label">7 Hari Terakhir</span>
            <span className="vd-stat-card__value">{stats.week}</span>
          </div>
        </div>

        <div className="vd-stat-card">
          <div className="vd-stat-card__icon vd-stat-card__icon--accent">
            <TrendUp size={24} weight="duotone" />
          </div>
          <div className="vd-stat-card__info">
            <span className="vd-stat-card__label">30 Hari Terakhir</span>
            <span className="vd-stat-card__value">{stats.month}</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="vd-toolbar">
        <h3 className="vd-toolbar__title">Riwayat Kunjungan Website</h3>
        <a
          href={`/api/visits/export?token=${adminToken}&t=${Date.now()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="vd-toolbar__btn"
        >
          <DownloadSimple size={18} weight="bold" />
          Download Excel
        </a>
      </div>

      {/* Tabel Kunjungan */}
      <div className="vd-table-container">
        {visits && visits.length > 0 ? (
          <table className="vd-table">
            <thead>
              <tr>
                <th style={{ width: '50px', textAlign: 'center' }}>No</th>
                <th>Pengunjung</th>
                <th>IP Address</th>
                <th>Waktu Kunjungan</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, index) => (
                <tr key={visit.id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td>
                    <span className="vd-table__page">Pengunjung ke-{stats.total - index}</span>
                  </td>
                  <td className="vd-table__ip">{visit.visitor_hash || '-'}</td>
                  <td className="vd-table__time">{formatDateTime(visit.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="vd-empty">
            <Eye size={64} weight="duotone" className="vd-empty__icon" />
            <p>Belum ada data kunjungan website.</p>
          </div>
        )}
      </div>
    </div>
  );
}
