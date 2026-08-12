import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from '@phosphor-icons/react/dist/ssr';
import './Footer.css';

/**
 * Footer — Komponen footer global untuk seluruh halaman.
 * Menampilkan logo mitra, link navigasi, alamat, dan copyright.
 */

const footerLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Desa', href: '/tentang' },
  { label: 'Destinasi', href: '/destinasi' },
  { label: 'Produk', href: '/produk' },
  { label: 'Pesan Tiket', href: '/tiket' },
  { label: 'Rute & Lokasi', href: '/rute' },
  { label: 'Kontak', href: '/kontak' },
];

const footerLogos = [
  { src: '/images/logo/tut-wuri-handayani-ftrd-image.webp', alt: 'Kemendikbud' },
  { src: '/images/logo/logo-kemendikbud-dikti.png', alt: 'Kemendikbud Dikti' },
  { src: '/images/logo/logo-belmawa.png', alt: 'BELMAWA' },
  { src: '/images/logo/images (1).jpeg', alt: 'PPK Ormawa' },
  { src: '/images/logo/WhatsApp Image 2026-07-19 at 00.22.39.jpeg', alt: 'PPK Ormawa HIMATEKPA' },
  { src: '/images/logo/images (2).jpeg', alt: 'UMM' },
  { src: '/images/logo/images.jpeg', alt: 'HIMATEKPA FPP UMM' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Logo mitra */}
        <div className="footer__logos">
          {footerLogos.map((logo) => (
            <div key={logo.alt} className="footer__logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={48}
                height={48}
                style={{ width: 'auto', height: 'auto', maxWidth: 48, maxHeight: 48 }}
                className="footer__logo-image"
              />
            </div>
          ))}
        </div>

        {/* Link navigasi */}
        <nav className="footer__nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Alamat */}
        <div className="footer__address">
          <MapPin size={18} weight="duotone" />
          <span>Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157</span>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Copyright */}
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Eduwisata Herbal Desa Sukolelo. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
