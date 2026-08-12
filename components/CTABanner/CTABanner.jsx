import Link from 'next/link';
import './CTABanner.css';

/**
 * CTABanner — Banner ajakan aksi (Call to Action) yang besar dan menarik.
 * Digunakan di Beranda sebelum LogoBar/Footer.
 * Props:
 * - title: teks ajakan
 * - ctaLabel: label tombol
 * - ctaHref: link tombol
 */
export default function CTABanner({ title, ctaLabel, ctaHref }) {
  return (
    <section className="cta-banner" data-aos="fade-up">
      <div className="cta-banner__bg" />
      <div className="container cta-banner__content">
        <h2 className="cta-banner__title">{title}</h2>
        <Link href={ctaHref} className="btn-accent cta-banner__button">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
