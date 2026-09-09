'use client';

import { useState, useEffect, useRef } from 'react';
import { Eye } from '@phosphor-icons/react';
import './VisitorCounter.css';

/**
 * VisitorCounter — Komponen counter animasi yang menampilkan jumlah pengunjung website.
 * Menampilkan total kunjungan dan pengunjung unik dengan efek counting up.
 * Digunakan di halaman Beranda.
 */
export default function VisitorCounter() {
  const [totalVisits, setTotalVisits] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Fetch statistik dari API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/visits');
        const data = await res.json();
        if (data.success) {
          setTotalVisits(data.totalVisits || 0);
        }
      } catch (err) {
        console.warn('[VisitorCounter] Gagal fetch statistik:', err);
      }
    };

    fetchStats();
  }, []);

  // Animasi counting up saat elemen masuk viewport
  useEffect(() => {
    if (hasAnimated || totalVisits === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount(totalVisits);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [totalVisits, hasAnimated]);

  // Fungsi animasi counting up
  const animateCount = (target) => {
    const duration = 2000; // 2 detik
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div className="visitor-counter" ref={counterRef} data-aos="fade-up">
      <div className="visitor-counter__icon">
        <Eye size={28} weight="duotone" />
      </div>
      <div className="visitor-counter__info">
        <span className="visitor-counter__number">
          {displayCount > 0 ? `${displayCount}+` : '...'}
        </span>
        <span className="visitor-counter__label">
          Pengunjung Telah Mengunjungi Website Ini
        </span>
      </div>
    </div>
  );
}
