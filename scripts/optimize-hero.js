// Script untuk mengoptimasi gambar hero carousel
// Konversi PNG besar (30-47MB) ke JPG terkompres (~200KB)
// Jalankan dari root project: node scripts/optimize-hero.js

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceDir = path.join(__dirname, '..', 'data beranda');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'hero');

// Pastikan folder target ada
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const conversions = [
  // Slide 1-6 (landscape background)
  { src: 'SLide 1.png', dest: 'hero-1.jpg', width: 1920, quality: 80 },
  { src: 'slide 2.png', dest: 'hero-2.jpg', width: 1920, quality: 80 },
  { src: 'slide 4.png', dest: 'hero-4.jpg', width: 1920, quality: 80 },
  { src: 'slide 5.png', dest: 'hero-5.jpg', width: 1920, quality: 80 },
  { src: 'slide 6.png', dest: 'hero-6.jpg', width: 1920, quality: 80 },
  // Poster produk (untuk grid di slide 3)
  { src: 'WhatsApp Image 2026-09-20 at 17.00.42 (1).jpeg', dest: 'product-1.jpg', width: 800, quality: 85 },
  { src: 'WhatsApp Image 2026-09-20 at 17.00.42.jpeg', dest: 'product-2.jpg', width: 800, quality: 85 },
  { src: 'WhatsApp Image 2026-09-20 at 17.00.43.jpeg', dest: 'product-3.jpg', width: 800, quality: 85 },
];

async function optimizeImages() {
  console.log('Memulai optimasi gambar hero carousel...\n');
  
  for (const item of conversions) {
    const srcPath = path.join(sourceDir, item.src);
    const destPath = path.join(targetDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.log(`[SKIP] File tidak ditemukan: ${item.src}`);
      continue;
    }

    try {
      const srcSize = (fs.statSync(srcPath).size / 1024 / 1024).toFixed(1);
      
      await sharp(srcPath)
        .resize(item.width, null, { withoutEnlargement: true })
        .jpeg({ quality: item.quality, mozjpeg: true })
        .toFile(destPath);

      const destSize = (fs.statSync(destPath).size / 1024).toFixed(0);
      console.log(`[OK] ${item.src} (${srcSize}MB) -> ${item.dest} (${destSize}KB)`);
    } catch (err) {
      console.error(`[ERROR] ${item.src}: ${err.message}`);
    }
  }
  console.log('\nSelesai! Semua gambar sudah dioptimasi.');
}

optimizeImages();
