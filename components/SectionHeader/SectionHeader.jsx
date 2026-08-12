/**
 * SectionHeader — Komponen reusable untuk judul section.
 * Digunakan di semua section Beranda dan halaman detail.
 * Props:
 * - title: judul section
 * - subtitle: deskripsi singkat (opsional)
 * - alignment: 'center' (default) | 'left'
 * - light: true untuk teks putih (di background gelap)
 */

import './SectionHeader.css';

export default function SectionHeader({ title, subtitle, alignment = 'center', light = false }) {
  return (
    <div
      className={`section-header section-header--${alignment} ${light ? 'section-header--light' : ''}`}
      data-aos="fade-up"
    >
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      <div className="section-header__line" />
    </div>
  );
}
