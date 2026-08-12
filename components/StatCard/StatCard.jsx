'use client';

import { useState, useEffect, useRef } from 'react';
import {
  UsersThree,
  Mountains,
  MapTrifold,
  Thermometer,
  MapPin,
  Buildings,
} from '@phosphor-icons/react';
import './StatCard.css';

/**
 * Mapping nama ikon ke komponen Phosphor Icons.
 * Digunakan untuk render ikon dinamis berdasarkan data.
 */
const iconMap = {
  UsersThree,
  Mountains,
  MapTrifold,
  Thermometer,
  MapPin,
  Buildings,
};

/**
 * StatCard — Card statistik dengan counter animation.
 * Angka naik dari 0 ke target saat masuk viewport.
 * Mendukung juga tipe teks (isText=true) untuk data non-numerik.
 * Props:
 * - icon: nama ikon Phosphor (string)
 * - value: angka target atau teks
 * - suffix: teks setelah angka (contoh: " mdpl", "°C")
 * - label: label deskripsi
 * - delay: delay animasi AOS (ms)
 * - isText: true jika value berupa teks (bukan angka)
 */
export default function StatCard({ icon, value, suffix = '', label, delay = 0, isText = false }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer untuk trigger counter saat masuk viewport
  useEffect(() => {
    // Jika tipe teks, hanya deteksi visibility tanpa counter
    if (isText) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setIsVisible(true);
          // Animasi counter naik dari 0 ke target
          const duration = 2000; // 2 detik
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing: ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated, isText]);

  // Render ikon dari mapping
  const IconComponent = iconMap[icon];

  return (
    <div
      className="stat-card"
      ref={cardRef}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="stat-card__icon">
        {IconComponent && <IconComponent size={36} weight="duotone" />}
      </div>
      <div className="stat-card__value">
        {isText ? (
          // Tampilkan teks langsung (bukan counter)
          <>{value}</>
        ) : (
          // Tampilkan angka dengan counter animation
          <>
            {count.toLocaleString('id-ID')}
            <span className="stat-card__suffix">{suffix}</span>
          </>
        )}
      </div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}
