import Image from 'next/image';
import { MapPin, NavigationArrow } from '@phosphor-icons/react/dist/ssr';
import './rute.css';

/**
 * Halaman Rute & Lokasi.
 * Menampilkan denah kawasan wisata + tombol navigasi ke Google Maps.
 */

export const metadata = {
  title: 'Rute & Lokasi',
  description:
    'Temukan lokasi dan rute menuju Eduwisata Herbal Desa Sukolelo, Kebonagung, Prigen, Pasuruan, Jawa Timur.',
};

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/9n1MT4FE6C4tH9LL6';

export default function RutePage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="rute-hero">
        <div className="rute-hero__bg" />
        <div className="rute-hero__content container">
          <h1 className="rute-hero__title" data-aos="fade-up">
            Rute Menuju Kami
          </h1>
          <p className="rute-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Temukan jalan termudah menuju Eduwisata Herbal Desa Sukolelo.
          </p>
        </div>
      </section>

      {/* Denah Wisata */}
      <section className="rute-denah section-padding">
        <div className="container">
          <div className="rute-denah__card" data-aos="fade-up">
            <div className="rute-denah__image-wrapper">
              <Image
                src="/images/rute/rod.png"
                alt="Denah kawasan Eduwisata Herbal Desa Sukolelo"
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto' }}
                className="rute-denah__image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Info Alamat + Tombol Google Maps */}
      <section className="rute-info section-padding">
        <div className="container">
          <div className="rute-info__card" data-aos="fade-up">
            <div className="rute-info__icon">
              <MapPin size={48} weight="duotone" />
            </div>
            <h2 className="rute-info__title">Alamat Lengkap</h2>
            <p className="rute-info__address">
              Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157
            </p>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rute-info__btn"
            >
              <NavigationArrow size={22} weight="bold" />
              Buka di Google Maps
            </a>

            <p className="rute-info__hint">
              Atau{' '}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rute-info__link"
              >
                klik di sini
              </a>{' '}
              untuk langsung membuka lokasi kami di Google Maps. Setelah terbuka,
              tekan tombol <strong>Rute</strong> atau <strong>Mulai</strong> untuk mendapatkan
              panduan navigasi langsung dari lokasi Anda.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
