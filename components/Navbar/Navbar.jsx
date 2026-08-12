'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { List, X } from '@phosphor-icons/react';
import './Navbar.css';

/**
 * Navbar — Komponen navigasi utama website.
 * Fitur:
 * - Logo utama PPK Ormawa HIMATEKPA di kiri
 * - Menu navigasi 7 item
 * - Transparan di atas, solid saat scroll
 * - Hamburger menu untuk mobile
 * - Active link berdasarkan pathname
 */

// Data menu navigasi
const menuItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Desa', href: '/tentang' },
  { label: 'Destinasi', href: '/destinasi' },
  { label: 'Produk Kami', href: '/produk' },
  { label: 'Pesan Tiket', href: '/tiket' },
  { label: 'Rute', href: '/rute' },
  { label: 'Kontak', href: '/kontak' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Cek apakah halaman saat ini adalah Beranda (homepage)
  // Navbar transparan hanya di Beranda, solid di halaman lain
  const isHomePage = pathname === '/';

  // Deteksi scroll untuk mengubah tampilan Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup mobile menu saat pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Mencegah scroll saat mobile menu terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Navbar solid jika: (1) bukan homepage, atau (2) sudah scroll
  const isNavSolid = !isHomePage || isScrolled;

  return (
    <nav className={`navbar ${isNavSolid ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        {/* Logo utama — PPK Ormawa HIMATEKPA */}
        <Link href="/" className="navbar__logo" aria-label="Beranda Eduwisata Herbal Desa Sukolelo">
          <Image
            src="/images/logo/WhatsApp Image 2026-07-19 at 00.22.39.jpeg"
            alt="Logo PPK Ormawa HIMATEKPA - Eduwisata Herbal Desa Sukolelo"
            width={52}
            height={52}
            className="navbar__logo-img"
            priority
          />
          <span className="navbar__logo-text">
            Eduwisata <span className="navbar__logo-highlight">Herbal</span>
          </span>
        </Link>

        {/* Menu navigasi — Desktop */}
        <ul className="navbar__menu">
          {menuItems.map((item) => (
            <li key={item.href} className="navbar__menu-item">
              <Link
                href={item.href}
                className={`navbar__link ${pathname === item.href ? 'navbar__link--active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Tombol hamburger — Mobile */}
        <button
          className="navbar__toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>
      </div>

      {/* Overlay saat mobile menu terbuka */}
      <div
        className={`navbar__overlay ${isMobileMenuOpen ? 'navbar__overlay--visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Menu navigasi — Mobile (slide-in dari kanan) */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <ul className="navbar__mobile-list">
          {menuItems.map((item, index) => (
            <li
              key={item.href}
              className="navbar__mobile-item"
              style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
            >
              <Link
                href={item.href}
                className={`navbar__mobile-link ${pathname === item.href ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
