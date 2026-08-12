'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import { destinations } from '@/data/destinations';
import {
  Fish,
  SwimmingPool,
  Globe,
  Plant,
  PersonSimpleRun,
  CaretDown,
  MapPin,
} from '@phosphor-icons/react';
import './destinasi.css';

/**
 * Halaman Destinasi — Semua 5 spot wisata dengan deskripsi lengkap.
 * Fitur:
 * - Hero banner kecil dengan judul
 * - 5 card destinasi alternating layout (gambar kiri-kanan)
 * - Expand/collapse deskripsi saat diklik
 * - Animasi staggered: card muncul satu per satu
 */

// Mapping ikon Phosphor berdasarkan nama string dari data
const iconMap = {
  Fish,
  SwimmingPool,
  Globe,
  Plant,
  PersonSimpleRun,
};

export default function DestinasiPage() {
  const [expandedId, setExpandedId] = useState(null);

  // Toggle expand/collapse deskripsi
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="dest-hero">
        <div className="dest-hero__bg" />
        <div className="dest-hero__content container">
          <h1 className="dest-hero__title" data-aos="fade-up">
            Jelajahi Setiap Sudut
          </h1>
          <p className="dest-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Setiap destinasi di kawasan kami dirancang untuk memberikan pengalaman
            edukasi dan rekreasi yang tak terlupakan.
          </p>
        </div>
      </section>

      {/* Daftar Semua Destinasi */}
      <section className="dest-list section-padding">
        <div className="container">
          {destinations.map((dest, index) => {
            const IconComp = iconMap[dest.icon];
            const isExpanded = expandedId === dest.id;
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={dest.id}
                className={`dest-card ${isReversed ? 'dest-card--reversed' : ''}`}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                {/* Gambar destinasi */}
                <div className="dest-card__image-wrapper">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="dest-card__image"
                  />
                </div>

                {/* Konten teks */}
                <div className="dest-card__content">
                  <div className="dest-card__header">
                    {IconComp && (
                      <div className="dest-card__icon">
                        <IconComp size={32} weight="duotone" />
                      </div>
                    )}
                    <h2 className="dest-card__title">{dest.title}</h2>
                  </div>

                  <p className="dest-card__short">{dest.shortDescription}</p>

                  {/* Deskripsi lengkap — expand/collapse */}
                  <div className={`dest-card__full ${isExpanded ? 'dest-card__full--expanded' : ''}`}>
                    <p>{dest.description}</p>
                  </div>

                  <button
                    className={`dest-card__toggle ${isExpanded ? 'dest-card__toggle--expanded' : ''}`}
                    onClick={() => toggleExpand(dest.id)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Sembunyikan deskripsi' : 'Lihat deskripsi lengkap'}
                  >
                    <span>{isExpanded ? 'Sembunyikan' : 'Baca Selengkapnya'}</span>
                    <CaretDown size={18} weight="bold" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA ke Pesan Tiket */}
      <section className="dest-cta section-padding" data-aos="fade-up">
        <div className="container dest-cta__content">
          <MapPin size={40} weight="duotone" className="dest-cta__icon" />
          <h2 className="dest-cta__title">Tertarik untuk berkunjung?</h2>
          <p className="dest-cta__desc">
            Pesan tiket kunjungan Anda sekarang dan rasakan langsung pengalaman eduwisata yang tak terlupakan.
          </p>
          <Link href="/tiket" className="btn-primary">
            Pesan Tiket Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
