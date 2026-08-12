# Eduwisata Herbal Desa Sukolelo — Project Brief

> Dokumen acuan utama untuk pengembangan website Eduwisata Herbal Desa Sukolelo.
> Semua konten, narasi, struktur, dan keputusan desain tercatat di sini.

---

## 1. Identitas Project

| Item | Detail |
|------|--------|
| **Nama Resmi** | Eduwisata Herbal Desa Sukolelo |
| **Tagline** | Pesona Sukolelo: Inovasi, Edukasi, dan Konservasi |
| **Alamat Lengkap** | Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157 |
| **Jenis Website** | Hybrid multi-page website (Beranda scrollable + halaman terpisah) dengan animasi modern |
| **Target Pengguna** | Wisatawan umum, keluarga, pelajar/sekolah, komunitas |

---

## 2. Struktur Navigasi (Menu)

Website menggunakan konsep **hybrid multi-page**:
- **Beranda** (`/`) adalah landing page scrollable berisi hero carousel + preview/highlight dari section lain
- **Halaman detail** berada di URL terpisah untuk konten lengkap

### Halaman & URL

| No | Menu | URL | Keterangan |
|----|------|-----|------------|
| 1 | **Beranda** | `/` | Landing page: Hero carousel + Sekilas Desa + Highlight Destinasi + Highlight Produk + Banner Tiket + Footer |
| 2 | **Tentang Desa** | `/tentang` | Halaman terpisah: Profil desa lengkap, statistik, potensi |
| 3 | **Destinasi** | `/destinasi` | Halaman terpisah: Semua 5 spot wisata dengan deskripsi lengkap |
| 4 | **Produk Kami** | `/produk` | Halaman terpisah: Katalog 5 produk herbal + komposisi & manfaat |
| 5 | **Pesan Tiket** | `/tiket` | Halaman terpisah: Form booking tiket wisata |
| 6 | **Rute & Lokasi** | `/rute` | Halaman terpisah: Denah wisata + tombol navigasi ke Google Maps |
| 7 | **Kontak** | `/kontak` | Halaman terpisah: Form kirim pesan (kritik, saran, dll) |

### Struktur Folder Next.js (App Router)

```
app/
├── layout.jsx          ← Layout utama (Navbar + Footer)
├── page.jsx            ← Beranda (landing page)
├── tentang/
│   └── page.jsx        ← Tentang Desa
├── destinasi/
│   └── page.jsx        ← Destinasi Wisata
├── produk/
│   └── page.jsx        ← Produk Kami
├── tiket/
│   └── page.jsx        ← Pesan Tiket
├── rute/
│   └── page.jsx        ← Rute & Lokasi
├── kontak/
│   └── page.jsx        ← Kontak
└── api/
    └── telegram/
        └── route.js    ← API Route untuk Telegram Bot (token aman di server)
```

> [!NOTE]
> **Penempatan Logo:**
> - **Navbar:** Logo utama PPK Ormawa HIMATEKPA ditampilkan **sendirian** sebagai identitas website
> - **Beranda (bagian bawah):** Logo utama **bersanding** dengan semua logo mitra dalam satu baris
> - **Footer:** Semua logo ditampilkan kembali dengan ukuran seragam dan rata

---

## 3. Konten Per Section

### 3.1 Beranda (Landing Page — Scrollable)

Beranda adalah halaman utama yang bisa di-scroll ke bawah, berisi **hero carousel** di atas diikuti oleh **preview/highlight** dari section-section utama. Pengunjung langsung mendapat gambaran lengkap, lalu bisa klik ke halaman detail yang diminati.

#### 3.1.1 Hero Carousel (Paling Atas)

Pengunjung disambut dengan **multi-slide hero carousel** yang bisa di-swipe horizontal.

**Slide 1 — Pembuka Utama (Default/Landing)**
- Background: Foto panorama utama kawasan wisata (ken burns zoom effect)
- Konten:
  > ### Pesona Sukolelo: Inovasi, Edukasi, dan Konservasi.
  >
  > Menjelajahi masa depan pariwisata pedesaan. Kami mengajak Anda menyatu dengan alam
  > sekaligus menikmati ragam produk inovasi lokal, mulai dari kesegaran Kombucha Telang
  > hingga teknologi Smart Biodome. Selamat datang di Eduwisata Herbal Desa Sukolelo.
- Tombol CTA: `Jelajahi Destinasi` dan `Pesan Tiket Sekarang`

**Slide 2 — Highlight Destinasi**
- Background: Foto salah satu spot wisata unggulan (misal Smart Biodome)
- Konten: Judul spot + tagline singkat 1 kalimat
- Tombol CTA: `Lihat Semua Destinasi`

**Slide 3 — Highlight Produk**
- Background: Foto kolase/produk unggulan
- Konten: "Inovasi Sehat dari Tangan Kami" + tagline singkat
- Tombol CTA: `Lihat Produk Kami`

**Interaksi Carousel:**
- Bisa di-swipe (mobile) atau di-scroll horizontal (desktop)
- Ada indikator dot/titik di bawah untuk menunjukkan posisi slide
- Auto-slide setiap 5-6 detik dengan transisi smooth
- Ada tombol panah kiri/kanan (subtle, modern) untuk navigasi manual

#### 3.1.2 Sekilas Tentang Desa (Scroll ke bawah dari Hero)

Preview singkat profil desa dengan beberapa statistik utama (3-4 data saja, bukan semua).
- Narasi 2-3 kalimat ringkas
- Beberapa angka statistik dengan counter animation
- Tombol: `Selengkapnya` → menuju `/tentang`

#### 3.1.3 Highlight Destinasi

Menampilkan **2-3 spot wisata unggulan** dalam card preview (bukan semua 5 spot).
- Foto + nama spot + 1 kalimat deskripsi
- Tombol: `Lihat Semua Destinasi` → menuju `/destinasi`

#### 3.1.4 Highlight Produk

Menampilkan **2-3 produk unggulan** dalam card preview (bukan semua 5 produk).
- Foto + nama produk + tagline
- Tombol: `Lihat Semua Produk` → menuju `/produk`

#### 3.1.5 Banner Pesan Tiket

Banner CTA besar dan menarik dengan background visual.
- Teks: "Siap Menjelajahi Eduwisata Herbal Desa Sukolelo?"
- Tombol besar: `Pesan Tiket Sekarang` → menuju `/tiket`

#### 3.1.6 Baris Logo Mitra

Semua logo ditampilkan berdampingan dalam satu baris horizontal, dengan logo utama PPK Ormawa HIMATEKPA di tengah/menonjol:
- Tut Wuri Handayani
- BELMAWA
- **PPK Ormawa HIMATEKPA** (sedikit lebih besar)
- UMM
- HIMATEKPA FPP UMM
- PPK Ormawa

Label di atas: "Didukung Oleh" atau "Kolaborasi"

#### 3.1.7 Footer

(Sama dengan Section 3.8 di bawah)

---

### 3.2 Tentang Desa (Profil Desa)

**Judul Section:** "Mengenal Desa Sukolelo"

**Narasi Pembuka:**
> Tersembunyi di lereng pegunungan Prigen, Desa Sukolelo menyimpan kekayaan alam dan
> budaya yang luar biasa. Dengan udara sejuk pegunungan dan tanah yang subur, desa ini
> telah berkembang menjadi pusat inovasi herbal dan destinasi eduwisata unggulan
> di Kabupaten Pasuruan.

**Data Statistik (ditampilkan dalam card/infografis interaktif):**

| Data | Nilai | Ikon (Phosphor Icons) |
|------|-------|------|
| Jumlah Penduduk | ±3.500 Jiwa | `UsersThree` |
| Ketinggian | ±600 mdpl | `Mountains` |
| Luas Wilayah | ±350 Ha | `MapTrifold` |
| Suhu Rata-rata | 22-28°C | `Thermometer` |
| Kecamatan | Sukolelo, Prigen | `MapPin` |
| Kabupaten | Pasuruan, Jawa Timur | `Buildings` |

**Potensi Unggulan (ditampilkan sebagai icon badges dengan Phosphor Icons):**
- `Plant` Pertanian & Budidaya Herbal
- `Park` Pariwisata Alam & Edukasi
- `Flask` Produk Olahan Herbal Inovatif
- `Handshake` Kearifan Lokal & Gotong Royong

> [!IMPORTANT]
> **Untuk Pemilik Project:** Angka-angka di atas adalah data perkiraan. Mohon dikoreksi dengan data resmi desa yang akurat sebelum website go-live.

---

### 3.3 Destinasi Wisata

**Judul Section:** "Jelajahi Setiap Sudut"
**Sub-judul:** "Setiap destinasi di kawasan kami dirancang untuk memberikan pengalaman edukasi dan rekreasi yang tak terlupakan."

**Konsep Tampilan:**
- Setiap spot ditampilkan dalam **card interaktif** dengan foto, judul, dan deskripsi singkat
- Saat di-hover atau di-klik, card mengembang (expand) menampilkan deskripsi lengkap dengan animasi smooth
- Micro-animation: parallax scroll, fade-in saat masuk viewport

#### Spot 1: Kolam Ikan Terapi
> Rasakan sensasi unik terapi alami dari ikan-ikan kecil yang lembut membersihkan
> kulit kaki Anda. Dikelilingi suasana alam yang asri, Kolam Ikan Terapi kami
> menawarkan pengalaman relaksasi yang menyegarkan sekaligus menyehatkan.
> Aktivitas ini dipercaya mampu melancarkan peredaran darah dan mengangkat
> sel kulit mati secara alami. Cocok untuk segala usia!

#### Spot 2: Kolam Renang Alami
> Berenang dengan pemandangan hijau pegunungan Prigen yang memanjakan mata.
> Kolam renang kami dirancang dengan konsep semi-alami, menghadirkan kesegaran
> air pegunungan yang jernih dan bersih. Tersedia area khusus yang aman untuk
> anak-anak dan area terpisah untuk dewasa, menjadikannya destinasi sempurna
> untuk rekreasi keluarga.

#### Spot 3: Smart Biodome
> Jantung inovasi Eduwisata Herbal Desa Sukolelo. Smart Biodome adalah rumah
> kaca geodesik berteknologi modern yang menjadi pusat budidaya tanaman herbal
> dan edukasi pertanian cerdas. Di dalam kubah futuristik ini, pengunjung dapat
> belajar langsung tentang sistem hidroponik, aquaponik, dan teknik pertanian
> berkelanjutan yang ramah lingkungan. Dilengkapi sensor IoT untuk monitoring
> suhu, kelembapan, dan nutrisi tanaman secara real-time.

#### Spot 4: Taman Herbal Interaktif
> Jelajahi beragam jenis tanaman herbal nusantara yang ditanam dan dirawat oleh
> masyarakat lokal. Lebih dari 50 jenis tanaman obat tersedia di sini, mulai dari
> kunyit, jahe, temulawak, hingga bunga telang. Setiap tanaman dilengkapi papan
> edukasi tentang nama ilmiah, khasiat, dan cara pengolahannya. Pengunjung juga
> dapat mengikuti workshop singkat membuat ramuan herbal tradisional. Sempurna
> untuk wisata edukasi sekolah!

#### Spot 5: Area Outbound & Playground
> Tantang adrenalin dan kekompakan tim di area outbound kami! Dilengkapi berbagai
> wahana permainan yang aman dan seru untuk anak-anak hingga dewasa, termasuk
> flying fox mini, jembatan tali, dan taman bermain tematik. Cocok untuk kegiatan
> team building, family gathering, atau sekadar bermain bebas di alam terbuka.

---

### 3.4 Produk Kami

**Judul Section:** "Inovasi Sehat dari Tangan Kami"
**Sub-judul:** "Produk herbal unggulan yang diracik dari kekayaan alam Desa Sukolelo, dibuat dengan cinta dan kearifan lokal."

**Konsep Tampilan:**
- Setiap produk ditampilkan dalam **product card** premium dengan foto produk, nama, dan tagline singkat
- Saat di-klik, muncul **modal/popup** yang menampilkan detail komposisi dan manfaat
- Animasi: card muncul satu per satu saat scroll (staggered animation)

---

#### Produk 1: Kombucha Bunga Telang 🫐

**Tagline:** "Kesegaran Alami, Kaya Antioksidan"

**Deskripsi:**
Minuman fermentasi probiotik premium dengan sentuhan keindahan bunga telang. Warna biru keunguan yang cantik bukan sekadar estetika, melainkan bukti kandungan antioksidan tinggi yang baik untuk tubuh Anda.

**Komposisi:**
- Teh hijau organik
- Bunga telang segar (*Clitoria ternatea*)
- Kultur SCOBY (*Symbiotic Culture of Bacteria and Yeast*)
- Gula aren alami
- Air pegunungan murni

**Manfaat:**
- Kaya antioksidan alami (antosianin dari bunga telang)
- Menjaga kesehatan sistem pencernaan berkat probiotik
- Membantu menurunkan tekanan darah tinggi
- Mendukung kesehatan dan kecerahan kulit
- Meningkatkan metabolisme tubuh

---

#### Produk 2: Permen Gummy Immune Booster 🍬

**Tagline:** "Jaga Imun, Rasa Menyenangkan"

**Deskripsi:**
Siapa bilang menjaga kesehatan harus pahit? Permen gummy kami mengemas kekuatan herbal nusantara dalam bentuk camilan kenyal yang disukai anak-anak maupun dewasa. Solusi praktis untuk meningkatkan daya tahan tubuh setiap hari.

**Komposisi:**
- Ekstrak jahe merah
- Ekstrak kunyit
- Madu hutan asli
- Gelatin halal
- Vitamin C
- Zinc
- Perisa buah alami

**Manfaat:**
- Meningkatkan daya tahan tubuh (immune booster)
- Sifat anti-inflamasi dari jahe merah dan kunyit
- Sumber vitamin C dan zinc untuk kesehatan harian
- Membantu meredakan gejala flu dan batuk ringan
- Aman dan disukai anak-anak

---

#### Produk 3: Ice Cream Kunyit Asam 🍦

**Tagline:** "Tradisi Nusantara dalam Setiap Sendokan"

**Deskripsi:**
Perpaduan unik antara kelezatan es krim premium dan resep jamu kunyit asam warisan nenek moyang. Sensasi manis, sedikit asam, dan hangat kunyit yang lembut menciptakan pengalaman rasa yang benar-benar baru dan tak terlupakan.

**Komposisi:**
- Susu segar lokal
- Kunyit pilihan
- Asam jawa
- Gula aren
- Vanili alami
- Krim segar

**Manfaat:**
- Menyegarkan dan menghilangkan dahaga
- Anti-inflamasi alami dari kunyit
- Melancarkan pencernaan berkat asam jawa
- Kaya antioksidan kurkumin
- Alternatif jajanan sehat untuk keluarga

---

#### Produk 4: Spray Anti Nyamuk Herbal 🌿

**Tagline:** "Perlindungan Alami, Tanpa Bahan Kimia Berbahaya"

**Deskripsi:**
Lindungi keluarga dari gigitan nyamuk dengan cara yang alami dan ramah lingkungan. Spray anti nyamuk herbal kami diformulasikan dari kombinasi minyak atsiri pilihan yang efektif mengusir nyamuk tanpa kandungan DEET atau bahan kimia sintetis berbahaya.

**Komposisi:**
- Minyak sereh wangi (*Citronella*)
- Minyak lavender
- Minyak kayu putih (*Eucalyptus*)
- Ekstrak daun mint
- Air murni
- Emulsifier alami

**Manfaat:**
- Mengusir nyamuk secara efektif dan alami
- Aman untuk kulit sensitif dan anak-anak
- Bebas DEET dan paraben
- Aroma menyegarkan dan menenangkan
- Ramah lingkungan dan biodegradable

---

#### Produk 5: Lulur Badan Herbal 🧴

**Tagline:** "Sentuhan Alam untuk Kulit Bercahaya"

**Deskripsi:**
Perawatan kulit tradisional yang telah digunakan turun-temurun oleh masyarakat Jawa, kini diracik dengan formulasi modern. Lulur badan herbal kami menggabungkan bahan-bahan alami terbaik dari kebun desa untuk memberikan pengalaman spa mewah di rumah Anda.

**Komposisi:**
- Tepung beras organik
- Kunyit segar
- Bengkoang
- Minyak zaitun murni
- Susu kambing etawa
- Aroma bunga melati alami

**Manfaat:**
- Mengangkat sel kulit mati secara lembut (eksfoliasi alami)
- Mencerahkan dan meratakan warna kulit
- Melembapkan kulit secara mendalam
- Aroma alami yang menenangkan dan mewah
- Cocok untuk semua jenis kulit

---

### 3.5 Pesan Tiket

**Judul Section:** "Pesan Tiket Kunjungan"
**Sub-judul:** "Rencanakan petualangan edukasi Anda sekarang. Isi formulir di bawah ini untuk memesan tiket kunjungan ke Eduwisata Herbal Desa Sukolelo."

**Konsep Tampilan:**
- Form booking yang clean dan modern
- Animasi: form fields muncul berurutan saat section masuk viewport

**Field Form:**

| Field | Tipe | Wajib? |
|-------|------|--------|
| Nama Lengkap | Text input | Ya |
| Nomor WhatsApp | Tel input | Ya |
| Email | Email input | Ya |
| Tanggal Kunjungan | Date picker | Ya |
| Jumlah Pengunjung | Number input | Ya |
| Kategori | Dropdown: Umum / Pelajar / Rombongan | Ya |
| Catatan Tambahan | Textarea | Tidak |

**Setelah Submit:**
- Tampilkan pesan konfirmasi dengan animasi checkmark
- Data dikirim ke Email dan/atau Telegram pengelola secara otomatis

> [!NOTE]
> Integrasi pengiriman form: menggunakan **EmailJS** (gratis untuk volume kecil) untuk email, dan **Telegram Bot API** untuk notifikasi instan ke grup Telegram pengelola.

---

### 3.6 Rute & Lokasi

**Judul Section:** "Rute Menuju Kami"
**Sub-judul:** "Temukan jalan termudah menuju Eduwisata Herbal Desa Sukolelo."

**Konsep Tampilan:**
- Menampilkan gambar **denah/peta ilustrasi** kawasan wisata (file gambar akan dikirim oleh pemilik project)
- Di bawah/samping denah, terdapat tombol besar dan jelas:
  > 🗺️ **Buka di Google Maps**
  > *Klik untuk mendapatkan rute navigasi langsung ke lokasi kami*
- Saat tombol diklik: membuka Google Maps dengan pin di alamat Kebonagung, Sukolelo, Prigen, Pasuruan
- URL Google Maps: `https://www.google.com/maps/search/?api=1&query=Kebonagung,+Sukolelo,+Prigen,+Pasuruan+Regency,+East+Java+67157`

**Alamat Lengkap (ditampilkan juga sebagai teks):**
> 📍 Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157

**Instruksi Pendukung:**
> "Klik tombol di atas untuk membuka peta lokasi kami. Setelah Google Maps terbuka, tekan tombol **Rute** atau **Mulai** untuk mendapatkan panduan navigasi langsung dari lokasi Anda."

---

### 3.7 Kontak

**Judul Section:** "Hubungi Kami"
**Sub-judul:** "Punya pertanyaan, kritik, atau saran? Kami senang mendengar dari Anda."

**Field Form:**

| Field | Tipe | Wajib? |
|-------|------|--------|
| Nama | Text input | Ya |
| WhatsApp / Email | Text input | Ya |
| Jenis Pesan | Dropdown: Pertanyaan / Kritik / Saran / Lainnya | Ya |
| Pesan | Textarea | Ya |

**Setelah Submit:**
- Pesan otomatis terkirim ke Email pengelola dan bot Telegram
- Tampilkan notifikasi sukses: "Pesan Anda berhasil terkirim! Tim kami akan segera merespons."

---

### 3.8 Footer

**Konten Footer:**
- Semua logo mitra (ukuran seragam, rata tengah)
- Alamat lengkap: Kebonagung, Sukolelo, Prigen, Pasuruan Regency, East Java 67157
- Link cepat ke semua halaman
- Copyright: `© 2026 Eduwisata Herbal Desa Sukolelo. Hak cipta dilindungi.`

---

## 4. Panduan Desain

### 4.1 Gaya Visual
| Aspek | Keputusan |
|-------|-----------|
| **Gaya Umum** | Modern, profesional, premium |
| **Mood** | Alami namun futuristik (Nature meets Technology) |
| **Warna Dominan** | Hijau alam (emerald/forest green) + Aksen emas/kuning hangat |
| **Warna Pendukung** | Putih bersih, abu gelap (dark charcoal), sentuhan biru telang |
| **Mode** | Light mode utama dengan elemen glassmorphism |
| **Tipografi** | Google Fonts: **Outfit** (heading) + **Inter** (body text) |
| **Sudut Elemen** | Rounded (border-radius sedang, tidak terlalu bulat) |
| **Bayangan** | Subtle shadow untuk kedalaman dan kesan premium |

### 4.2 Animasi & Interaktivitas
- **Scroll Animations:** Elemen muncul dengan fade-in + slide-up saat masuk viewport
- **Hero Slideshow:** Transisi foto otomatis dengan efek Ken Burns (zoom perlahan)
- **Product Cards:** Hover effect dengan elevasi dan shadow yang membesar
- **Destinasi Cards:** Expand/collapse dengan animasi smooth
- **Statistik Desa:** Counter animation (angka naik dari 0 ke angka sebenarnya)
- **Parallax:** Efek parallax ringan pada beberapa background section
- **Navbar:** Transparan di atas, berubah solid saat scroll ke bawah
- **Page Transition:** Transisi halus antar halaman menggunakan Next.js built-in transitions

### 4.3 Responsivitas
- **Desktop:** Layout penuh dengan grid multi-kolom
- **Tablet:** Menyesuaikan ke 2 kolom
- **Mobile:** Layout single-column, hamburger menu, touch-friendly

---

## 5. Tech Stack yang Direncanakan

| Komponen | Teknologi | Alasan |
|----------|-----------|--------|
| **Framework** | Next.js (App Router) | SSR/SSG untuk SEO, file-based routing, API routes, image optimization |
| **Routing** | File-based (bawaan Next.js) | Otomatis berdasarkan struktur folder `app/`, tanpa library tambahan |
| **Styling** | Vanilla CSS (Custom Properties) | Fleksibel, performa tinggi, kontrol penuh |
| **Animasi** | CSS Animations + AOS Library | Ringan, performa bagus di semua device (pakai `'use client'`) |
| **Ikon** | Phosphor Icons (`@phosphor-icons/react`) | Modern, premium, konsisten, mendukung 6 gaya (thin/light/regular/bold/fill/duotone) |
| **Gambar** | next/image (bawaan Next.js) | Auto-optimize, lazy loading, responsive sizing, format modern (WebP/AVIF) |
| **Form → Email** | EmailJS | Gratis, tanpa backend tambahan, mudah setup |
| **Form → Telegram** | Telegram Bot API + Next.js API Route (`app/api/telegram/route.js`) | Token aman di server, tidak terekspos di browser |
| **Maps** | Link ke Google Maps | Simpel, tidak perlu API key |
| **Hosting** | Vercel | Dibuat oleh tim Next.js, integrasi paling mulus, gratis, CDN global, HTTPS otomatis |

---

## 6. Aset (Inventaris File)

File aset yang sudah tersedia di folder project:

### Logo (`/logo/`)
| No | File | Isi | Status |
|----|------|-----|--------|
| 1 | `WhatsApp Image 2026-07-19 at 00.22.39.jpeg` | **PPK Ormawa HIMATEKPA** (Logo Utama) | ✅ Tersedia |
| 2 | `tut-wuri-handayani-ftrd-image.webp` | Tut Wuri Handayani (terpisah, bersih) | ✅ Tersedia |
| 3 | `1.-Logo-BELMAWA.png` | Tut Wuri + Kemendikbud + BELMAWA (3-in-1) | ✅ Tersedia |
| 4 | `images (1).jpeg` | PPK Ormawa (versi hijau) | ✅ Tersedia |
| 5 | `images (2).jpeg` | UMM (Universitas Muhammadiyah Malang) | ✅ Tersedia |
| 6 | `images.jpeg` | HIMATEKPA FPP UMM | ✅ Tersedia |

### Rute (`/rute/`)
| File | Isi | Status |
|------|-----|--------|
| `rod.png` | Denah Garden Sidequest (peta ilustrasi kawasan wisata) | ✅ Tersedia |

### Belum Tersedia
- [ ] **Foto-foto destinasi wisata** (Kolam Ikan, Kolam Renang, Smart Biodome, Taman Herbal, Area Outbound)
- [ ] **Foto-foto produk** (5 produk herbal)
- [ ] **Data desa yang akurat** (jumlah penduduk, luas wilayah, ketinggian, dll)
- [ ] **Harga tiket** (jika sudah ada: umum, pelajar, rombongan)
- [ ] **Harga produk** (jika ingin ditampilkan)
- [ ] **Kontak pengelola** (email tujuan dan username Telegram/grup Telegram)

---

## 7. Alur Kerja Pengembangan

Pengembangan dilakukan **satu halaman per tahap** menggunakan arsitektur Next.js App Router. Setelah setiap tahap selesai, server development (`npm run dev`) dinyalakan dan AI memberikan **checklist panduan testing** ke pemilik project. **Pemilik project yang melakukan testing manual sendiri** (AI tidak testing sendiri via browser). Setelah pemilik project memberikan feedback, baru lanjut ke tahap berikutnya.

| Tahap | Halaman / Fitur | File Next.js | Testing Focus |
|-------|----------------|-------------|---------------|
| 1 | Setup project Next.js + Layout (Navbar) | `app/layout.jsx` | Navigasi menu, responsif, logo placement |
| 2 | Beranda (Hero Carousel + Preview sections) | `app/page.jsx` | Carousel swipe, preview cards, CTA buttons, scroll animasi |
| 3 | Tentang Desa | `app/tentang/page.jsx` | Data statistik, animasi counter, layout |
| 4 | Destinasi Wisata | `app/destinasi/page.jsx` | Card interaktif, expand/collapse, animasi scroll |
| 5 | Produk Kami | `app/produk/page.jsx` | Product cards, modal detail, animasi |
| 6 | Pesan Tiket + API Telegram | `app/tiket/page.jsx` + `app/api/telegram/route.js` | Form validation, pengiriman ke Email/Telegram |
| 7 | Rute & Lokasi | `app/rute/page.jsx` | Gambar denah, tombol Google Maps, link benar |
| 8 | Kontak | `app/kontak/page.jsx` | Form kontak, pengiriman pesan |
| 9 | Footer + Polish & Optimasi | Komponen global | Logo placement, responsif keseluruhan, performa, animasi akhir, cross-browser |

---

> [!IMPORTANT]
> **Status Dokumen: DRAFT — Menunggu Review dan Persetujuan**
>
> Silakan review seluruh isi dokumen ini. Beri tahu bagian mana yang perlu diubah, ditambah, atau dihapus.
> Setelah disetujui, kita akan lanjut membuat **Implementation Plan** teknis dan mulai membangun website!
