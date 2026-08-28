"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { projects } from "@/data/content";
import styles from "./FeaturedWork.module.css";

function ProjectCard({
  category,
  title,
  image,
}: {
  category: string;
  title: string;
  image: string;
}) {
  return (
    <article className={styles.card}>
      <a href="#" className={styles.cardLink}>
        <div className={styles.cardImageWrapper}>
          <Image
            src={image}
            alt={`${title} project screenshot`}
            width={600}
            height={375}
            className={styles.cardImage}
            loading="lazy"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardMeta}>
            <span className={styles.cardCategory}>{category}</span>
            <h3 className={styles.cardTitle}>{title}</h3>
          </div>
          <svg
            className={styles.cardArrow}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </a>
    </article>
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

export default function FeaturedWork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesPerView = useSlidesPerView();

  const maxIndex = Math.max(0, projects.length - slidesPerView);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

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

  return (
    <section
      className={`section section--dark ${styles.section}`}
      id="work"
      aria-labelledby="featured-work-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-label section-label--dark" id="featured-work-heading">
            FEATURED WORK
          </h2>
          <div className={styles.navArrows}>
            <button
              className={styles.navBtn}
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className={styles.navBtn}
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next project"
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
            {projects.map((project) => (
              <div key={project.title} className={styles.slide}>
                <ProjectCard
                  category={project.category}
                  title={project.title}
                  image={project.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
