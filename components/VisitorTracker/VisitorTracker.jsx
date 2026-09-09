'use client';

import { useEffect } from 'react';

/**
 * VisitorTracker — Komponen invisible untuk tracking kunjungan website.
 * Dipasang di layout.jsx.
 * Mencatat HANYA 1 kali per sesi browser (saat pertama kali masuk website).
 * Jika user buka banyak halaman, tetap dihitung 1 kunjungan.
 */
export default function VisitorTracker() {
  useEffect(() => {
    // Cek apakah sudah pernah dicatat dalam sesi ini
    if (sessionStorage.getItem('visit_tracked')) return;

    // Kirim data kunjungan ke API (1x saja)
    const trackVisit = async () => {
      try {
        await fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || null,
          }),
        });

        // Tandai sudah dicatat — tidak akan kirim lagi selama tab masih terbuka
        sessionStorage.setItem('visit_tracked', 'true');
      } catch (err) {
        // Gagal tracking tidak boleh mengganggu user experience
        console.warn('[VisitorTracker] Gagal mencatat kunjungan:', err);
      }
    };

    trackVisit();
  }, []);

  // Komponen invisible — tidak me-render apapun
  return null;
}
