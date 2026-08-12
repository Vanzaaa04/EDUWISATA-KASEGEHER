/**
 * Data konten umum website — narasi, tagline, teks section.
 * Sumber: Project Brief
 */

export const siteIdentity = {
  name: 'Eduwisata Herbal Desa Sukolelo',
  tagline: 'Pesona Sukolelo: Inovasi, Edukasi, dan Konservasi',
  address: 'Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157',
  googleMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Kebonagung,+Sukolelo,+Prigen,+Pasuruan+Regency,+East+Java+67157',
};

// Narasi hero carousel (3 slide)
export const heroSlides = [
  {
    id: 1,
    title: 'Pesona Sukolelo',
    subtitle: 'Inovasi, Edukasi, dan Konservasi',
    description:
      'Menjelajahi masa depan pariwisata pedesaan. Kami mengajak Anda menyatu dengan alam sekaligus menikmati ragam produk inovasi lokal, mulai dari kesegaran Kombucha Telang hingga teknologi Smart Biodome. Selamat datang di Eduwisata Herbal Desa Sukolelo.',
    cta: [
      { label: 'Jelajahi Destinasi', href: '/destinasi', variant: 'primary' },
      { label: 'Pesan Tiket Sekarang', href: '/tiket', variant: 'secondary' },
    ],
    image: '/images/hero/hero-1.jpg',
  },
  {
    id: 2,
    title: 'Smart Biodome',
    subtitle: 'Teknologi Pertanian Masa Depan',
    description:
      'Rumah kaca geodesik berteknologi modern yang menjadi pusat budidaya tanaman herbal dan edukasi pertanian cerdas.',
    cta: [{ label: 'Lihat Semua Destinasi', href: '/destinasi', variant: 'primary' }],
    image: '/images/hero/hero-2.jpg',
  },
  {
    id: 3,
    title: 'Inovasi Sehat dari Tangan Kami',
    subtitle: 'Produk Herbal Unggulan',
    description:
      'Produk herbal unggulan yang diracik dari kekayaan alam Desa Sukolelo, dibuat dengan cinta dan kearifan lokal.',
    cta: [{ label: 'Lihat Produk Kami', href: '/produk', variant: 'primary' }],
    image: '/images/hero/hero-3.jpg',
  },
];

// Narasi section di Beranda
export const sectionContent = {
  aboutPreview: {
    title: 'Mengenal Desa Sukolelo',
    subtitle: 'Tersembunyi di lereng pegunungan Prigen',
    description:
      'Tersembunyi di lereng pegunungan Prigen, Desa Sukolelo menyimpan kekayaan alam dan budaya yang luar biasa. Dengan udara sejuk pegunungan dan tanah yang subur, desa ini telah berkembang menjadi pusat inovasi herbal dan destinasi eduwisata unggulan di Kabupaten Pasuruan.',
    cta: { label: 'Selengkapnya', href: '/tentang' },
  },
  destinationPreview: {
    title: 'Jelajahi Setiap Sudut',
    subtitle:
      'Setiap destinasi di kawasan kami dirancang untuk memberikan pengalaman edukasi dan rekreasi yang tak terlupakan.',
    cta: { label: 'Lihat Semua Destinasi', href: '/destinasi' },
  },
  productPreview: {
    title: 'Inovasi Sehat dari Tangan Kami',
    subtitle:
      'Produk herbal unggulan yang diracik dari kekayaan alam Desa Sukolelo, dibuat dengan cinta dan kearifan lokal.',
    cta: { label: 'Lihat Semua Produk', href: '/produk' },
  },
  ctaBanner: {
    title: 'Siap Menjelajahi Eduwisata Herbal Desa Sukolelo?',
    cta: { label: 'Pesan Tiket Sekarang', href: '/tiket' },
  },
  logoBar: {
    title: 'Didukung Oleh',
  },
};
