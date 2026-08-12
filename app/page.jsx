import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel/HeroCarousel';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import StatCard from '@/components/StatCard/StatCard';
import DestinationCard from '@/components/DestinationCard/DestinationCard';
import ProductCard from '@/components/ProductCard/ProductCard';
import CTABanner from '@/components/CTABanner/CTABanner';
import { sectionContent } from '@/data/siteContent';
import { villageStats } from '@/data/villageStats';
import { destinations } from '@/data/destinations';
import { products } from '@/data/products';
import './page.css';

/**
 * Beranda — Halaman utama (landing page) yang bisa di-scroll.
 * Susunan dari atas ke bawah:
 * 1. HeroCarousel
 * 2. Sekilas Tentang Desa (preview statistik)
 * 3. Highlight Destinasi (3 spot)
 * 4. Highlight Produk (3 produk)
 * 5. CTA Banner (Pesan Tiket)
 */

export const metadata = {
  title: 'Beranda',
  description:
    'Selamat datang di Eduwisata Herbal Desa Sukolelo. Pesona Sukolelo: Inovasi, Edukasi, dan Konservasi. Jelajahi destinasi wisata, produk herbal, dan pesan tiket kunjungan.',
};

// Ambil 3 destinasi dan 3 produk pertama untuk preview
const highlightDestinations = destinations.slice(0, 3);
const highlightProducts = products.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Sekilas Tentang Desa */}
      <section className="home-section home-section--about">
        <div className="container">
          <SectionHeader
            title={sectionContent.aboutPreview.title}
            subtitle={sectionContent.aboutPreview.description}
          />
          <div className="home-stats-grid">
            {villageStats.map((stat, index) => (
              <StatCard
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                delay={index * 100}
              />
            ))}
          </div>
          <div className="home-section__cta" data-aos="fade-up" data-aos-delay="200">
            <Link href={sectionContent.aboutPreview.cta.href} className="btn-secondary">
              {sectionContent.aboutPreview.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Highlight Destinasi */}
      <section className="home-section home-section--destinations">
        <div className="container">
          <SectionHeader
            title={sectionContent.destinationPreview.title}
            subtitle={sectionContent.destinationPreview.subtitle}
          />
          <div className="home-cards-grid home-cards-grid--3">
            {highlightDestinations.map((dest, index) => (
              <DestinationCard
                key={dest.id}
                title={dest.title}
                shortDescription={dest.shortDescription}
                image={dest.image}
                delay={index * 100}
              />
            ))}
          </div>
          <div className="home-section__cta" data-aos="fade-up" data-aos-delay="200">
            <Link href={sectionContent.destinationPreview.cta.href} className="btn-primary">
              {sectionContent.destinationPreview.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Highlight Produk */}
      <section className="home-section home-section--products">
        <div className="container">
          <SectionHeader
            title={sectionContent.productPreview.title}
            subtitle={sectionContent.productPreview.subtitle}
          />
          <div className="home-cards-grid home-cards-grid--3">
            {highlightProducts.map((prod, index) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                emoji={prod.emoji}
                tagline={prod.tagline}
                image={prod.image}
                delay={index * 100}
              />
            ))}
          </div>
          <div className="home-section__cta" data-aos="fade-up" data-aos-delay="200">
            <Link href={sectionContent.productPreview.cta.href} className="btn-primary">
              {sectionContent.productPreview.cta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CTABanner
        title={sectionContent.ctaBanner.title}
        ctaLabel={sectionContent.ctaBanner.cta.label}
        ctaHref={sectionContent.ctaBanner.cta.href}
      />
    </>
  );
}
