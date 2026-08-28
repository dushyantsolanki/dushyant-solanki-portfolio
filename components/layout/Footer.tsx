"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.logo}>Dushyant S.</span>

        <div className={styles.center}>
          <span className={styles.copy}>
            © 2025 Dushyant S.. All rights reserved.
          </span>
          <div className={styles.links}>
            <a href="#" className={styles.link}>
              PRIVACY POLICY
            </a>
            <a href="#" className={styles.link}>
              TERMS & CONDITIONS
            </a>
          </div>
        </div>

        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
