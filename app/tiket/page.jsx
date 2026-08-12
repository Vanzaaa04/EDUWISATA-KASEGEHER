import TicketForm from '@/components/TicketForm/TicketForm';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import './tiket.css';

/**
 * Halaman Pesan Tiket Kunjungan.
 * Menampilkan form booking yang dikirim ke API Telegram.
 */

export const metadata = {
  title: 'Pesan Tiket',
  description:
    'Pesan tiket kunjungan ke Eduwisata Herbal Desa Sukolelo. Isi formulir dan tim kami akan menghubungi Anda untuk konfirmasi.',
};

export default function TiketPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="tiket-hero">
        <div className="tiket-hero__bg" />
        <div className="tiket-hero__content container">
          <h1 className="tiket-hero__title" data-aos="fade-up">
            Pesan Tiket Kunjungan
          </h1>
          <p className="tiket-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Rencanakan petualangan edukasi Anda sekarang. Isi formulir di bawah ini
            untuk memesan tiket kunjungan ke Eduwisata Herbal Desa Sukolelo.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="tiket-form-section section-padding">
        <div className="container">
          <TicketForm />
        </div>
      </section>
    </>
  );
}
