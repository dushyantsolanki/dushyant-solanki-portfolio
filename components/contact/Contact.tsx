"use client";

import { useState, FormEvent } from "react";
import { socialLinks } from "@/data/content";
import styles from "./Contact.module.css";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  dribbble: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.18 17.72M19.13 5.09C15.22 9.14 10.93 10.44 2.64 10.96M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      className={`section section--dark ${styles.section}`}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.info}>
          <span className={`section-label section-label--dark ${styles.label}`}>
            LET&apos;S WORK TOGETHER
          </span>
          <h2 className={styles.heading} id="contact-heading">
            HAVE A PROJECT
            <br />
            IN MIND?
          </h2>
          <p className={styles.desc}>
            I&apos;m always excited to work on new projects and help brands bring
            their ideas to life.
          </p>

          <div className={styles.contactDetails}>
            <a href="mailto:hello@owenblake.com" className={styles.contactItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              hello@owenblake.com
            </a>
            <a href="tel:+15551234567" className={styles.contactItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              +1 (555) 123-4567
            </a>
            <span className={styles.contactItem}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Los Angeles, CA
            </span>
          </div>

          <div className={styles.socials}>
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                className={styles.socialBtn}
                aria-label={link.label}
              >
                {socialIcons[link.platform]}
              </a>
            ))}
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-label="Contact form"
        >
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="project-type" className="sr-only">
                Project Type
              </label>
              <select
                id="project-type"
                className={styles.select}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Project Type
                </option>
                <option value="web-design">Web Design</option>
                <option value="web-development">Web Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="branding">Branding</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="budget" className="sr-only">
                Budget Range
              </label>
              <select
                id="budget"
                className={styles.select}
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Budget Range
                </option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-50k">$25,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className="sr-only">
              Tell me about your project
            </label>
            <textarea
              id="message"
              placeholder="Tell me about your project..."
              rows={5}
              required
              className={styles.textarea}
            />
          </div>

          <button
            type="submit"
            className={`btn btn--white-outline ${styles.submitBtn}`}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "SENDING..."
            ) : status === "success" ? (
              "MESSAGE SENT ✓"
            ) : (
              <>
                SEND MESSAGE
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
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
