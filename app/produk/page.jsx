'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import ProductModal from '@/components/ProductModal/ProductModal';
import { products } from '@/data/products';
import './produk.css';

/**
 * Halaman Produk Kami, menampilkan semua 5 produk herbal.
 * Klik card akan membuka modal detail dengan komposisi dan manfaat.
 */
export default function ProdukPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      {/* Hero Banner */}
      <section className="produk-hero">
        <div className="produk-hero__bg" />
        <div className="produk-hero__content container">
          <h1 className="produk-hero__title" data-aos="fade-up">
            Inovasi Sehat dari Tangan Kami
          </h1>
          <p className="produk-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Produk herbal unggulan yang diracik dari kekayaan alam Desa Sukolelo,
            dibuat dengan cinta dan kearifan lokal.
          </p>
        </div>
      </section>

      {/* Grid Semua Produk */}
      <section className="produk-list section-padding">
        <div className="container">
          <div className="produk-grid">
            {products.map((product, index) => (
              <article
                key={product.id}
                className="produk-card"
                data-aos="fade-up"
                data-aos-delay={index * 80}
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                aria-label={`Lihat detail ${product.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedProduct(product);
                }}
              >
                {/* Gambar */}
                <div className="produk-card__image-wrapper">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="produk-card__image"
                  />
                  <div className="produk-card__overlay">
                    <span className="produk-card__view">Lihat Detail</span>
                  </div>
                </div>

                {/* Konten */}
                <div className="produk-card__content">
                  <span className="produk-card__emoji">{product.emoji}</span>
                  <h2 className="produk-card__name">{product.name}</h2>
                  <p className="produk-card__tagline">{product.tagline}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Detail Produk */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
