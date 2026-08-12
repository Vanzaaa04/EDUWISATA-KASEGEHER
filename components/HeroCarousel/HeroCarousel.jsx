'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { heroSlides } from '@/data/siteContent';
import './HeroCarousel.css';

/**
 * HeroCarousel — Carousel utama di paling atas Beranda.
 * Fitur:
 * - 3 slide dengan background foto + Ken Burns zoom effect
 * - Auto-slide setiap 6 detik
 * - Dot indicator + tombol panah navigasi
 * - Swipe support di mobile (touch events)
 * - Pause auto-slide saat hover
 */
export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Pindah ke slide berikutnya
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  // Pindah ke slide sebelumnya
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Auto-slide setiap 6 detik
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Swipe support untuk mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.touches[0].clientX);
  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      // Swipe ke kiri → slide berikutnya, swipe ke kanan → slide sebelumnya
      diff > 0 ? nextSlide() : prevSlide();
    }
  };

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Hero carousel"
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-carousel__slide ${index === currentSlide ? 'hero-carousel__slide--active' : ''}`}
        >
          {/* Background image dengan Ken Burns effect */}
          <div className="hero-carousel__image-wrapper">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-carousel__image"
              quality={85}
            />
          </div>

          {/* Overlay gelap untuk kontras teks */}
          <div className="hero-carousel__overlay" />

          {/* Konten teks */}
          <div className="hero-carousel__content container">
            <h1 className="hero-carousel__title">{slide.title}</h1>
            <p className="hero-carousel__subtitle">{slide.subtitle}</p>
            <p className="hero-carousel__description">{slide.description}</p>
            <div className="hero-carousel__actions">
              {slide.cta.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={action.variant === 'primary' ? 'btn-primary' : 'btn-secondary hero-carousel__btn-outline'}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Tombol panah navigasi */}
      <button
        className="hero-carousel__arrow hero-carousel__arrow--left"
        onClick={prevSlide}
        aria-label="Slide sebelumnya"
      >
        <CaretLeft size={24} weight="bold" />
      </button>
      <button
        className="hero-carousel__arrow hero-carousel__arrow--right"
        onClick={nextSlide}
        aria-label="Slide berikutnya"
      >
        <CaretRight size={24} weight="bold" />
      </button>

      {/* Dot indicator */}
      <div className="hero-carousel__dots">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`hero-carousel__dot ${index === currentSlide ? 'hero-carousel__dot--active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
