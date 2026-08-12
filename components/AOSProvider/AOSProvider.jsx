'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * AOSProvider — Komponen wrapper untuk inisialisasi AOS (Animate on Scroll).
 * Menggunakan 'use client' karena membutuhkan useEffect dan window object.
 * Diletakkan di root layout agar animasi AOS aktif di semua halaman.
 */
export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,        // Durasi animasi (ms)
      easing: 'ease-out',   // Jenis easing
      once: true,           // Animasi hanya muncul sekali (tidak repeat saat scroll balik)
      offset: 80,           // Jarak dari viewport sebelum animasi trigger
      delay: 0,             // Delay default
    });
  }, []);

  return <>{children}</>;
}
