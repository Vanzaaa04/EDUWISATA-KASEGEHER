import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import StatCard from '@/components/StatCard/StatCard';
import { villageStatsFull, villagePotentials } from '@/data/villageStats';
import {
  Plant,
  Park,
  Flask,
  Handshake,
} from '@phosphor-icons/react/dist/ssr';
import './tentang.css';

/**
 * Halaman Tentang Desa — Profil lengkap Desa Sukolelo.
 * Menampilkan:
 * 1. Hero banner dengan foto desa
 * 2. Narasi pembuka
 * 3. Grid 6 StatCard (statistik lengkap)
 * 4. Section Potensi Unggulan (icon badges)
 */

export const metadata = {
  title: 'Tentang Desa',
  description:
    'Mengenal Desa Sukolelo, tersembunyi di lereng pegunungan Prigen, menyimpan kekayaan alam dan budaya yang luar biasa. Pusat inovasi herbal dan eduwisata di Kabupaten Pasuruan.',
};

// Mapping nama ikon ke komponen untuk Server Component
const potentialIconMap = {
  Plant: Plant,
  Park: Park,
  Flask: Flask,
  Handshake: Handshake,
};

export default function TentangDesaPage() {
  return (
    <>
      {/* 1. Hero Banner */}
      <section className="tentang-hero">
        <div className="tentang-hero__image-wrapper">
          <Image
            src="/images/tentang/desa-sukolelo.jpg"
            alt="Panorama Desa Sukolelo di lereng pegunungan Prigen"
            fill
            priority
            sizes="100vw"
            className="tentang-hero__image"
            quality={85}
          />
          <div className="tentang-hero__overlay" />
        </div>
        <div className="tentang-hero__content container">
          <h1 className="tentang-hero__title" data-aos="fade-up">
            Mengenal Desa Sukolelo
          </h1>
          <p className="tentang-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Tersembunyi di lereng pegunungan Prigen, Kabupaten Pasuruan
          </p>
        </div>
      </section>

      {/* 2. Narasi Pembuka */}
      <section className="tentang-narasi section-padding">
        <div className="container">
          <div className="tentang-narasi__content" data-aos="fade-up">
            <p className="tentang-narasi__text">
              Tersembunyi di lereng pegunungan Prigen, Desa Sukolelo menyimpan kekayaan alam dan
              budaya yang luar biasa. Dengan udara sejuk pegunungan dan tanah yang subur, desa ini
              telah berkembang menjadi pusat inovasi herbal dan destinasi eduwisata unggulan
              di Kabupaten Pasuruan.
            </p>
            <p className="tentang-narasi__text" data-aos="fade-up" data-aos-delay="100">
              Masyarakat Desa Sukolelo telah lama memanfaatkan kekayaan alam sekitar untuk kehidupan
              sehari-hari. Kini, dengan sentuhan inovasi dan semangat gotong royong, potensi tersebut
              ditransformasikan menjadi produk-produk herbal unggulan dan destinasi wisata edukasi
              yang menarik bagi wisatawan dari berbagai kalangan.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Statistik Desa (6 card lengkap) */}
      <section className="tentang-stats section-padding">
        <div className="container">
          <SectionHeader
            title="Data Desa Sukolelo"
            subtitle="Gambaran umum kondisi geografis dan demografis desa."
          />
          <div className="tentang-stats__grid">
            {villageStatsFull.map((stat, index) => (
              <StatCard
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 80}
                isText={stat.isText || false}
              />
            ))}
          </div>
          <p className="tentang-stats__note" data-aos="fade-up">
            * Data bersifat perkiraan. Akan diperbarui dengan data resmi desa.
          </p>
        </div>
      </section>

      {/* 4. Potensi Unggulan */}
      <section className="tentang-potensi section-padding">
        <div className="container">
          <SectionHeader
            title="Potensi Unggulan"
            subtitle="Empat pilar kekuatan yang menjadi fondasi pengembangan eduwisata herbal."
          />
          <div className="tentang-potensi__grid">
            {villagePotentials.map((item, index) => {
              const IconComp = potentialIconMap[item.icon];
              return (
                <div
                  key={item.id}
                  className="tentang-potensi__card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="tentang-potensi__icon">
                    {IconComp && <IconComp size={40} weight="duotone" />}
                  </div>
                  <h3 className="tentang-potensi__title">{item.title}</h3>
                  <p className="tentang-potensi__desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
