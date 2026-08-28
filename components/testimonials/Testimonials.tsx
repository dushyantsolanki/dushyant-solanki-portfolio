"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { testimonials } from "@/data/content";
import BaseCard from "../ui/card/BaseCard";
import styles from "./Testimonials.module.css";

function TestimonialCard({
  quote,
  name,
  role,
  avatar,
}: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <BaseCard className={styles.card}>
      <div className={styles.quoteIcon} aria-hidden="true">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="var(--color-accent)"
        >
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </div>
      <blockquote className={styles.quoteText}>{quote}</blockquote>
      <footer className={styles.author}>
        <Image
          src={avatar}
          alt={name}
          width={44}
          height={44}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.authorInfo}>
          <cite className={styles.authorName}>{name}</cite>
          <span className={styles.authorRole}>{role}</span>
        </div>
      </footer>
    </BaseCard>
  );
}

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 768) setSlidesPerView(1);
      else if (w < 1024) setSlidesPerView(2);
      else setSlidesPerView(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return slidesPerView;
}

export default function Testimonials() {
  const slidesPerView = useSlidesPerView();
  const maxIndex = Math.max(0, testimonials.length - slidesPerView);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  // Clamp index when slidesPerView changes (e.g. on resize)
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging.current) {
      touchEndX.current = e.touches[0].clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) goNext();
    else if (diff < -threshold) goPrev();
  }, [goNext, goPrev]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      touchEndX.current = e.clientX;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) goNext();
    else if (diff < -threshold) goPrev();
  }, [goNext, goPrev]);

  const slideWidth = 100 / slidesPerView;
  const gapCompensation = (16 * (slidesPerView - 1)) / slidesPerView;
  const translateX = -(currentIndex * (slideWidth));

  return (
    <section
      className="section"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-label" id="testimonials-heading">
            WHAT CLIENTS SAY
          </h2>
          <div className={styles.navArrows}>
            <button
              className={styles.navBtn}
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={styles.navBtn}
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={styles.slider}
          style={{
            "--current-index": currentIndex,
            "--slides-per-view": slidesPerView,
          } as React.CSSProperties}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={styles.track}>
            {testimonials.map((t) => (
              <div key={t.name} className={styles.slide}>
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  avatar={t.avatar}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className={styles.dots} role="tablist" aria-label="Testimonial slides">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
