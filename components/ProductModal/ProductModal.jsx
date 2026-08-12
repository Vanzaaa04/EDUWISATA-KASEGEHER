'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle, Leaf } from '@phosphor-icons/react';
import './ProductModal.css';

/**
 * ProductModal — Modal popup detail produk herbal.
 * Menampilkan foto besar, deskripsi, komposisi, dan manfaat.
 * Props:
 * - product: objek produk dari data/products.js (atau null)
 * - onClose: fungsi untuk menutup modal
 */
export default function ProductModal({ product, onClose }) {
  // Tutup modal saat tekan Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    // Mencegah scroll body saat modal terbuka
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="product-modal__backdrop" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detail produk ${product.name}`}
      >
        {/* Tombol close */}
        <button
          className="product-modal__close"
          onClick={onClose}
          aria-label="Tutup modal"
        >
          <X size={24} weight="bold" />
        </button>

        {/* Konten modal */}
        <div className="product-modal__body">
          {/* Gambar produk */}
          <div className="product-modal__image-wrapper">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="product-modal__image"
            />
          </div>

          {/* Detail produk */}
          <div className="product-modal__details">
            <span className="product-modal__emoji">{product.emoji}</span>
            <h2 className="product-modal__name">{product.name}</h2>
            <p className="product-modal__tagline">{product.tagline}</p>
            <p className="product-modal__description">{product.description}</p>

            {/* Komposisi */}
            <div className="product-modal__section">
              <h3 className="product-modal__section-title">
                <Leaf size={20} weight="duotone" />
                Komposisi
              </h3>
              <ul className="product-modal__list">
                {product.composition.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Manfaat */}
            <div className="product-modal__section">
              <h3 className="product-modal__section-title">
                <CheckCircle size={20} weight="duotone" />
                Manfaat
              </h3>
              <ul className="product-modal__list product-modal__list--benefits">
                {product.benefits.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
