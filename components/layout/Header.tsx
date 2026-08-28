"use client";

import { useState, useEffect, useCallback } from "react";
import { navLinks } from "@/data/content";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navLinks[0].href.replace('#', ''));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections that are in navLinks
    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    },
    [closeMenu]
  );

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      onKeyDown={handleKeyDown}
    >
      <div className={`container ${styles.headerInner}`}>
        <a href="#home" className={styles.logo} aria-label="Dushyant S. - Home">
          Dushyant S.
        </a>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Main navigation"
          id="main-nav"
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a href="#contact" className={`${styles.cta} btn btn--primary`}>
          LET&apos;S TALK
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

        <button
          className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>

        {menuOpen && (
          <div
            className={styles.overlay}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}
