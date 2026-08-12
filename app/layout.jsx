import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import AOSProvider from '@/components/AOSProvider/AOSProvider';

/**
 * Metadata global — SEO default untuk seluruh website.
 * Setiap halaman bisa override metadata ini dengan export metadata sendiri.
 */
export const metadata = {
  title: {
    default: 'Eduwisata Herbal Desa Sukolelo',
    template: '%s | Eduwisata Herbal Desa Sukolelo',
  },
  description:
    'Pesona Sukolelo: Inovasi, Edukasi, dan Konservasi. Menjelajahi masa depan pariwisata pedesaan di lereng pegunungan Prigen, Pasuruan.',
  keywords: [
    'eduwisata',
    'wisata herbal',
    'desa sukolelo',
    'prigen',
    'pasuruan',
    'wisata edukasi',
    'smart biodome',
    'kombucha telang',
    'wisata alam',
  ],
  openGraph: {
    title: 'Eduwisata Herbal Desa Sukolelo',
    description:
      'Pesona Sukolelo: Inovasi, Edukasi, dan Konservasi. Menjelajahi masa depan pariwisata pedesaan.',
    locale: 'id_ID',
    type: 'website',
  },
};

/**
 * RootLayout — Layout utama yang membungkus semua halaman.
 * Berisi Navbar (di atas) dan children (konten halaman).
 * Footer akan ditambahkan di Tahap 9.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AOSProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AOSProvider>
      </body>
    </html>
  );
}
