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

// Narasi hero carousel (6 slide dengan foto asli)
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
    title: 'Smart Biodome & Kebun Herbal',
    subtitle: 'Pusat Budidaya Tanaman Herbal Modern',
    description:
      'Greenhouse berteknologi Smart Biodome menjadi pusat budidaya tanaman herbal dan edukasi pertanian cerdas. Nikmati pengalaman belajar langsung di tengah kebun herbal Desa Sukolelo.',
    cta: [
      { label: 'Lihat Semua Destinasi', href: '/destinasi', variant: 'primary' },
    ],
    image: '/images/hero/hero-2.jpg',
  },
  {
    id: 3,
    title: 'Produk Herbal Unggulan',
    subtitle: 'Inovasi Sehat dari Desa Sukolelo',
    description:
      'Kombucha Bunga Telang, Aserehe, dan Gummy Kunyit. Produk herbal yang diracik dari kekayaan alam lokal, dibuat dengan cinta dan kearifan desa.',
    cta: [
      { label: 'Lihat Produk Kami', href: '/produk', variant: 'primary' },
    ],
    // Slide tipe khusus: tampilkan grid 3 poster produk
    type: 'product-grid',
    products: [
      '/images/hero/product-1.jpg',
      '/images/hero/product-2.jpg',
      '/images/hero/product-3.jpg',
    ],
    image: null, // Tidak pakai background foto, pakai gradient
  },
  {
    id: 4,
    title: 'Keindahan Alam Sukolelo',
    subtitle: 'Hamparan Sawah di Lereng Prigen',
    description:
      'Panorama sawah terasering yang memukau, terbentang hijau keemasan di bawah sinar matahari pagi. Keindahan alam autentik lereng Pegunungan Prigen.',
    cta: [
      { label: 'Tentang Desa', href: '/tentang', variant: 'primary' },
      { label: 'Pesan Tiket Sekarang', href: '/tiket', variant: 'secondary' },
    ],
    image: '/images/hero/hero-4.jpg',
  },
  {
    id: 5,
    title: 'Desa Mandiri Energi',
    subtitle: 'Infrastruktur Modern Berbasis Energi Terbarukan',
    description:
      'Panel surya dan jalan desa yang asri menunjukkan semangat Desa Sukolelo menuju kemandirian energi. Inovasi dan kearifan lokal berjalan beriringan.',
    cta: [
      { label: 'Jelajahi Destinasi', href: '/destinasi', variant: 'primary' },
    ],
    image: '/images/hero/hero-5.jpg',
  },
  {
    id: 6,
    title: 'Pertanian Berkelanjutan',
    subtitle: 'Kekayaan Alam yang Terus Dijaga',
    description:
      'Hamparan lahan pertanian yang subur dan hijau, menggambarkan komitmen masyarakat Desa Sukolelo dalam menjaga kelestarian alam dan tradisi bertani.',
    cta: [
      { label: 'Tentang Desa', href: '/tentang', variant: 'primary' },
      { label: 'Pesan Tiket Sekarang', href: '/tiket', variant: 'secondary' },
    ],
    image: '/images/hero/hero-6.jpg',
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
