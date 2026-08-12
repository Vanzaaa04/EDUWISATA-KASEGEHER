/**
 * Data statistik Desa Sukolelo — untuk section "Sekilas Tentang Desa".
 * Nama ikon mengacu ke Phosphor Icons.
 * Sumber: Project Brief (data perkiraan, menunggu koreksi data resmi)
 *
 * villageStats (4 item) — digunakan di Beranda (preview ringkas)
 * villageStatsFull (6 item) — digunakan di halaman Tentang Desa (lengkap)
 */

// 4 statistik untuk preview di Beranda
export const villageStats = [
  {
    id: 1,
    icon: 'UsersThree',
    value: 3500,
    suffix: '',
    label: 'Jiwa Penduduk',
  },
  {
    id: 2,
    icon: 'Mountains',
    value: 600,
    suffix: ' mdpl',
    label: 'Ketinggian',
  },
  {
    id: 3,
    icon: 'MapTrifold',
    value: 350,
    suffix: ' Ha',
    label: 'Luas Wilayah',
  },
  {
    id: 4,
    icon: 'Thermometer',
    value: 25,
    suffix: '°C',
    label: 'Suhu Rata-rata',
  },
];

// 6 statistik lengkap untuk halaman Tentang Desa
export const villageStatsFull = [
  ...villageStats,
  {
    id: 5,
    icon: 'MapPin',
    value: 'Prigen',
    suffix: '',
    label: 'Kecamatan',
    isText: true,
  },
  {
    id: 6,
    icon: 'Buildings',
    value: 'Pasuruan',
    suffix: '',
    label: 'Kabupaten, Jawa Timur',
    isText: true,
  },
];

// Data potensi unggulan desa (untuk halaman Tentang Desa)
export const villagePotentials = [
  {
    id: 1,
    icon: 'Plant',
    title: 'Pertanian & Budidaya Herbal',
    description: 'Tanah subur pegunungan Prigen yang ideal untuk budidaya tanaman herbal dan rempah-rempah berkualitas tinggi.',
  },
  {
    id: 2,
    icon: 'Park',
    title: 'Pariwisata Alam & Edukasi',
    description: 'Destinasi wisata alam yang memadukan rekreasi dengan edukasi lingkungan dan pertanian berkelanjutan.',
  },
  {
    id: 3,
    icon: 'Flask',
    title: 'Produk Olahan Herbal Inovatif',
    description: 'Inovasi produk herbal modern dari bahan baku lokal, dari Kombucha Telang hingga Permen Gummy Immune Booster.',
  },
  {
    id: 4,
    icon: 'Handshake',
    title: 'Kearifan Lokal & Gotong Royong',
    description: 'Semangat kolaborasi masyarakat desa yang menjadi kekuatan utama dalam membangun eduwisata berkelanjutan.',
  },
];
