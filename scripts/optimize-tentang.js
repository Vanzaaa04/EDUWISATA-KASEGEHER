// Script untuk optimasi foto desa untuk halaman Tentang Desa
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceDir = path.join(__dirname, '..', 'data beranda');
const targetDir = path.join(__dirname, '..', 'public', 'images', 'tentang');

const conversions = [
  // Foto desa untuk galeri di halaman Tentang
  { src: 'SLide 1.png', dest: 'desa-panorama.jpg', width: 800, quality: 80 },
  { src: 'slide 4.png', dest: 'desa-sawah.jpg', width: 800, quality: 80 },
  { src: 'slide 5.png', dest: 'desa-jalan.jpg', width: 800, quality: 80 },
  { src: 'slide 6.png', dest: 'desa-pertanian.jpg', width: 800, quality: 80 },
];

async function optimizeImages() {
  console.log('Memulai optimasi foto desa untuk halaman Tentang...\n');
  
  for (const item of conversions) {
    const srcPath = path.join(sourceDir, item.src);
    const destPath = path.join(targetDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.log(`[SKIP] ${item.src}`);
      continue;
    }

    try {
      await sharp(srcPath)
        .resize(item.width, null, { withoutEnlargement: true })
        .jpeg({ quality: item.quality, mozjpeg: true })
        .toFile(destPath);

      const destSize = (fs.statSync(destPath).size / 1024).toFixed(0);
      console.log(`[OK] ${item.src} -> ${item.dest} (${destSize}KB)`);
    } catch (err) {
      console.error(`[ERROR] ${item.src}: ${err.message}`);
    }
  }
  console.log('\nSelesai!');
}

optimizeImages();
