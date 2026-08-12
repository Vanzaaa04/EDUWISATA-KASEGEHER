import Image from 'next/image';
import Link from 'next/link';
import './ProductCard.css';

/**
 * ProductCard — Card preview produk herbal.
 * Menampilkan foto, emoji, nama, dan tagline produk.
 * Props:
 * - name: nama produk
 * - emoji: emoji produk
 * - tagline: tagline singkat
 * - image: path gambar
 * - href: link ke halaman detail (default /produk)
 * - delay: delay animasi AOS (ms)
 */
export default function ProductCard({ name, emoji, tagline, image, href = '/produk', delay = 0 }) {
  return (
    <div className="product-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="product-card__image-wrapper">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="product-card__image"
        />
      </div>
      <div className="product-card__content">
        <span className="product-card__emoji">{emoji}</span>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__tagline">{tagline}</p>
        <Link href={href} className="product-card__link">
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}
