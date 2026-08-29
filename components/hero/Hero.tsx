"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { stats } from "@/data/content";
import Typewriter from "./Typewriter";
import CalButton from "../ui/CalButton";
import styles from "./Hero.module.css";
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const typewriterWords = [
    "FULL STACK DEVELOPER",
    "DESIGNING",
    "FRONTEND",
    "BACKEND",
    "AI INTEGRATION",
    "MODEL TRAINING & DEPLOYMENT",
    "DEVOPS"
  ];

  return (
    <section className={styles.hero} id="home" aria-label="Hero" ref={containerRef}>
      <div className={`container ${styles.heroInner}`}>
        {/* Left: Text content */}
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="var(--color-accent)"
              aria-hidden="true"
            >
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
            </svg>
            <Typewriter words={typewriterWords} />
          </div>

          <h1 className={styles.headline}>
            ENGINEERING
            <br />
            <span className={styles.highlight}>CREATIVE</span> SOLUTIONS.
          </h1>

          <p className={styles.description}>
            I&apos;m Dushyant S., a full-stack developer helping businesses innovate through robust architectures, AI integrations, and seamless user experiences.
          </p>

          <div className={styles.actions}>
            <a href="#work" className="btn btn--primary">
              VIEW MY WORK
              <svg
                className="arrow"
                width="16"
                height="16"
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
            </a>
            <CalButton
              buttonText="SCHEDULE A MEETING"
              calLink="dushyant-solanki-nou63k"
              className="btn btn--outline"
            >
              <svg
                className="arrow"
                width="16"
                height="16"
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
            </CalButton>
          </div>

          <div className={styles.stats}>
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>

        {/* Right: Image + Signature */}
        <div className={styles.imageCol}>
          <motion.div className={styles.imageWrapper} style={{ y }}>
            <div className={styles.portrait} aria-label="Founder portrait">
              <Image
                src="/images/image.png"
                alt="Dushyant S."
                width={1000}
                height={1000}
                className={styles.heroImg}
                priority
              />
            </div>
          </motion.div>
          <div className={styles.signature}>
            <span className={styles.signatureText}>Dushyant S.</span>
            <div className={styles.available}>
              <span className={styles.availableDot} />
              <span className={styles.availableLabel}>
                AVAILABLE
                <br />
                FOR PROJECTS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
