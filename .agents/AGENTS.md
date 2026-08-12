# Aturan AI — Eduwisata Herbal Desa Sukolelo

> File ini mendefinisikan sifat dan aturan yang WAJIB diikuti oleh AI (Antigravity)
> saat bekerja di project ini. Dibaca otomatis setiap sesi.

---

## 1. Bahasa & Komunikasi

- **Komentar kode** ditulis dalam **Bahasa Indonesia**
- **Nama variabel, fungsi, dan state** ditulis dalam **Bahasa Inggris** (standar industri)
- **Nama komponen React** ditulis dalam **Bahasa Inggris** (contoh: `HeroCarousel`, `ProductCard`, `TicketForm`)
- **Nama file komponen** mengikuti PascalCase (contoh: `HeroCarousel.jsx`, `ProductCard.jsx`)
- **Nama file CSS** mengikuti nama komponen (contoh: `HeroCarousel.css`, `ProductCard.css`)
- **Commit message** ditulis dalam **Bahasa Indonesia**
- Saat berkomunikasi dengan user, gunakan **Bahasa Indonesia**

---

## 2. Desain & CSS

- **WAJIB** gunakan CSS Variables (Custom Properties) untuk semua warna, font, dan spacing — didefinisikan di `:root`
- **DILARANG** hardcode warna langsung di komponen (contoh: JANGAN `color: #2d5016`, HARUS `color: var(--color-primary)`)
- **Mobile-first approach**: CSS ditulis untuk mobile dulu, lalu tambahkan `@media` query untuk tablet & desktop
- **Palet warna yang diizinkan**:
  - Hijau alam (emerald/forest green) — warna dominan
  - Emas/kuning hangat — aksen
  - Putih bersih — background
  - Abu gelap (dark charcoal) — teks
  - Biru telang — sentuhan/aksen sekunder
- **DILARANG** menggunakan warna di luar palet tanpa izin dari user
- **Font WAJIB**: Google Fonts `Outfit` (heading) + `Inter` (body text)
- **DILARANG** menggunakan font lain tanpa izin dari user
- Gunakan `border-radius` sedang (rounded, tidak terlalu bulat)
- Gunakan subtle shadow untuk kedalaman dan kesan premium
- Terapkan glassmorphism secukupnya untuk kesan modern

---

## 3. Struktur & Kode

- **1 komponen = 1 file** — setiap komponen React punya file `.jsx` sendiri
- **1 komponen = 1 CSS** — setiap komponen punya file `.css` sendiri
- **WAJIB** gunakan `next/image` (`<Image>`) untuk semua gambar — **DILARANG** pakai `<img>` biasa
- **WAJIB** gunakan `next/link` (`<Link>`) untuk semua navigasi internal — **DILARANG** pakai `<a>` untuk link internal
- Komponen yang dipakai ulang (Button, Card, SectionHeader, dll) disimpan di folder `components/`
- Data konten (teks narasi, deskripsi produk, statistik desa) disimpan di file data terpisah (`data/`) agar mudah diupdate tanpa mengubah komponen
- Gunakan `'use client'` directive hanya pada komponen yang membutuhkan interaktivitas (state, event handler, animasi AOS)
- Server Components digunakan secara default untuk performa dan SEO optimal

---

## 4. Keamanan & Ketelitian

- **DILARANG** menghapus file apapun tanpa izin eksplisit dari user
- **DILARANG** mengubah struktur folder yang sudah ditentukan di Project Brief tanpa izin
- **DILARANG** meng-expose API key, token, atau secret di client-side — semua harus di `app/api/` route (server-side)
- **WAJIB** validasi semua input form, baik di client (UX) maupun di API route (keamanan)
- Sebelum melakukan perubahan besar, selalu jelaskan dulu ke user dan minta persetujuan

---

## 5. Performa & Kualitas

- **Lazy loading**: Semua gambar di bawah viewport pertama (below the fold) wajib lazy loaded
- **Optimasi gambar**: Manfaatkan `next/image` untuk auto-optimize (WebP/AVIF, responsive sizing)
- **Animasi ringan**: Animasi tidak boleh menyebabkan lag, terutama di perangkat mobile — gunakan `transform` dan `opacity` saja (GPU-accelerated), hindari animasi `width`, `height`, `top`, `left`
- **SEO wajib di setiap halaman**: Setiap `page.jsx` wajib export `metadata` (title, description, Open Graph)
- **Aksesibilitas dasar**:
  - Semua gambar wajib punya `alt` text deskriptif
  - Semua form input wajib punya `label`
  - Kontras warna harus memenuhi standar WCAG AA minimum
  - Fokus keyboard harus terlihat jelas

---

## 6. Alur Kerja

- **Bangun per tahap**: Selesaikan 1 halaman/fitur, jalankan `npm run dev`, lalu minta user testing sebelum lanjut ke tahap berikutnya
- **DILARANG testing sendiri**: AI **TIDAK BOLEH** membuka browser atau melakukan testing sendiri. **User yang melakukan testing manual.**
- **Panduan testing**: Setiap selesai 1 tahap, WAJIB berikan panduan testing ke user berupa checklist:
  - Apa yang harus dilihat (contoh: "Buka http://localhost:3000")
  - Apa yang harus diklik (contoh: "Klik menu Tentang Desa")
  - Apa yang harus dicek (contoh: "Navbar berubah solid saat scroll")
  - Kondisi sukses (contoh: "Jika card tampil 3 kolom di desktop, berarti benar")
- **Placeholder representatif**: Kalau foto asli belum tersedia, gunakan placeholder gambar yang relevan (bukan kotak abu-abu kosong) — bisa generate menggunakan tool generate_image
- **Rujuk Project Brief**: Semua konten/narasi/deskripsi diambil dari dokumen Project Brief — **DILARANG** mengarang konten sendiri tanpa izin
- **Rujuk file ini**: Semua keputusan desain dan coding mengikuti aturan di file ini

---

## 7. Referensi Dokumen

- **Project Brief**: `project_brief.md` di artifact directory — sumber utama konten dan struktur
- **Logo files**: `d:\EduwisataKasegher\logo\` — 6 file logo
- **Rute/Denah**: `d:\EduwisataKasegher\rute\rod.png` — peta ilustrasi kawasan wisata
- **Logo utama**: `WhatsApp Image 2026-07-19 at 00.22.39.jpeg` (PPK Ormawa HIMATEKPA)
