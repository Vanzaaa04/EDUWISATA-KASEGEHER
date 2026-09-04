import ContactForm from '@/components/ContactForm/ContactForm';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';
import { MapPin, EnvelopeSimple, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import './kontak.css';

/**
 * Halaman Kontak.
 * Form kirim pesan + info kontak pengelola.
 */

export const metadata = {
  title: 'Kontak',
  description:
    'Hubungi tim Eduwisata Herbal Desa Sukolelo. Kirim pertanyaan, kritik, atau saran melalui formulir kontak kami.',
};

export default function KontakPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="kontak-hero">
        <div className="kontak-hero__bg" />
        <div className="kontak-hero__content container">
          <h1 className="kontak-hero__title" data-aos="fade-up">
            Hubungi Kami
          </h1>
          <p className="kontak-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Punya pertanyaan, kritik, atau saran? Kami senang mendengar dari Anda.
          </p>
        </div>
      </section>

      {/* Info Kontak + Form */}
      <section className="kontak-body section-padding">
        <div className="container">
          <div className="kontak-layout">
            {/* Kolom kiri: Info */}
            <div className="kontak-info" data-aos="fade-right">
              <h2 className="kontak-info__title">Informasi Kontak</h2>
              <p className="kontak-info__desc">
                Silakan hubungi kami melalui informasi berikut atau isi formulir di samping.
              </p>

              <div className="kontak-info__item">
                <div className="kontak-info__icon">
                  <MapPin size={24} weight="duotone" />
                </div>
                <div>
                  <h4 className="kontak-info__label">Alamat</h4>
                  <p className="kontak-info__value">
                    Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157
                  </p>
                </div>
              </div>

              <div className="kontak-info__item">
                <div className="kontak-info__icon">
                  <EnvelopeSimple size={24} weight="duotone" />
                </div>
                <div>
                  <h4 className="kontak-info__label">Email</h4>
                  <p className="kontak-info__value">eduwisata.sukolelo@gmail.com</p>
                </div>
              </div>

              <div className="kontak-info__item">
                <div className="kontak-info__icon">
                  <WhatsappLogo size={24} weight="duotone" />
                </div>
                <div>
                  <h4 className="kontak-info__label">WhatsApp</h4>
                  <p className="kontak-info__value">+62 812-xxxx-xxxx</p>
                </div>
              </div>
            </div>

            {/* Kolom kanan: Form */}
            <div className="kontak-form-wrapper" data-aos="fade-left">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Section Feedback */}
      <section className="feedback-section section-padding" style={{ backgroundColor: 'var(--color-primary-bg)' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FeedbackForm />
        </div>
      </section>
    </>
  );
}
