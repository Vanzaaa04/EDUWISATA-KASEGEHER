import Image from 'next/image';
import Link from 'next/link';
import './DestinationCard.css';

/**
 * DestinationCard — Card preview destinasi wisata.
 * Menampilkan foto, judul, dan deskripsi singkat.
 * Props:
 * - title: nama spot wisata
 * - shortDescription: deskripsi 1 kalimat
 * - image: path gambar
 * - href: link ke halaman detail (opsional, default /destinasi)
 * - delay: delay animasi AOS (ms)
 */
export default function DestinationCard({ title, shortDescription, image, href = '/destinasi', delay = 0 }) {
  return (
    <div className="destination-card" data-aos="fade-up" data-aos-delay={delay}>
      <div className="destination-card__image-wrapper">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="destination-card__image"
        />
        <div className="destination-card__image-overlay" />
      </div>
      <div className="destination-card__content">
        <h3 className="destination-card__title">{title}</h3>
        <p className="destination-card__desc">{shortDescription}</p>
        <Link href={href} className="destination-card__link">
          Selengkapnya →
        </Link>
      </div>
    </div>
  );
}
