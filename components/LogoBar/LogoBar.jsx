import Image from 'next/image';
import './LogoBar.css';

/**
 * LogoBar — Baris logo mitra/pendukung.
 * Desain: Grayscale default → Full color saat hover + Tooltip nama.
 * Semua 7 logo ukuran sama, tanpa kotak putih.
 * Label: "Didukung Oleh"
 */

const logos = [
  {
    src: '/images/logo/tut-wuri-handayani-ftrd-image.webp',
    alt: 'Logo Tut Wuri Handayani - Kemendikbud',
    name: 'Kemendikbud',
  },
  {
    src: '/images/logo/logo-kemendikbud-dikti.png',
    alt: 'Logo Kemendikbud Dikti',
    name: 'Kemendikbud Dikti',
  },
  {
    src: '/images/logo/logo-belmawa.png',
    alt: 'Logo BELMAWA - Sigap Bersinergi',
    name: 'BELMAWA',
  },
  {
    src: '/images/logo/images (1).jpeg',
    alt: 'Logo PPK Ormawa',
    name: 'PPK Ormawa',
  },
  {
    src: '/images/logo/WhatsApp Image 2026-07-19 at 00.22.39.jpeg',
    alt: 'Logo PPK Ormawa HIMATEKPA - Logo Utama Eduwisata',
    name: 'PPK Ormawa HIMATEKPA',
  },
  {
    src: '/images/logo/images (2).jpeg',
    alt: 'Logo Universitas Muhammadiyah Malang (UMM)',
    name: 'UMM',
  },
  {
    src: '/images/logo/images.jpeg',
    alt: 'Logo HIMATEKPA FPP UMM',
    name: 'HIMATEKPA FPP UMM',
  },
];

export default function LogoBar() {
  return (
    <section className="logo-bar section-padding" data-aos="fade-up">
      <div className="container">
        <p className="logo-bar__label">Didukung Oleh</p>
        <div className="logo-bar__grid">
          {logos.map((logo) => (
            <div key={logo.alt} className="logo-bar__item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={72}
                height={72}
                style={{ width: 'auto', height: 'auto', maxWidth: 72, maxHeight: 72 }}
                className="logo-bar__image"
              />
              {/* Tooltip nama organisasi — muncul saat hover */}
              <span className="logo-bar__tooltip">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
