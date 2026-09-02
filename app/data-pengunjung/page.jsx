import DataDashboard from '@/components/DataDashboard/DataDashboard';
import './data-pengunjung.css';

/**
 * Halaman Data Pengunjung.
 * Menampilkan dashboard tabel-tabel data yang dikelola admin.
 * Pengunjung biasa melihat data saja, admin bisa menambah/edit/hapus.
 */

export const metadata = {
  title: 'Data Pengunjung',
  description:
    'Data statistik pengunjung Eduwisata Herbal Desa Sukolelo. Lihat rekapitulasi jumlah kunjungan, pendapatan, dan informasi terkait lainnya.',
};

export default function DataPengunjungPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="data-hero">
        <div className="data-hero__bg" />
        <div className="data-hero__content container">
          <h1 className="data-hero__title" data-aos="fade-up">
            Data Pengunjung
          </h1>
          <p className="data-hero__subtitle" data-aos="fade-up" data-aos-delay="100">
            Rekapitulasi data kunjungan dan informasi terkait
            Eduwisata Herbal Desa Sukolelo.
          </p>
        </div>
      </section>

      {/* Konten Dashboard */}
      <section className="data-content section-padding">
        <div className="container">
          <DataDashboard />
        </div>
      </section>
    </>
  );
}
