"use client";

import { useState, FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { socialLinks } from "@/data/content";
import styles from "./Contact.module.css";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  ),

  twitter: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),

  dribbble: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M8.56 2.75c4.37 6.03 6.02 9.42 8.18 17.72M19.13 5.09C15.22 9.14 10.93 10.44 2.64 10.96M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),

  instagram: (
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
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1.5"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
};

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const projectType = String(formData.get("projectType") || "");
    const budget = String(formData.get("budget") || "");
    const message = String(formData.get("message") || "").trim();

    // Honeypot field.
    // Normal users never see or fill this.
    const website = String(formData.get("website") || "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectType,
          budget,
          message,
          website,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setTurnstileToken(null);

      form.reset();

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      className={`section section--dark ${styles.section}`}
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className={`container ${styles.inner}`}>
        {/* LEFT SIDE */}
        <div className={styles.info}>
          <span
            className={`section-label section-label--dark ${styles.label}`}
          >
            LET&apos;S WORK TOGETHER
          </span>

          <h2 className={styles.heading} id="contact-heading">
            HAVE A PROJECT
            <br />
            IN MIND?
          </h2>

          <p className={styles.desc}>
            I&apos;m always excited to work on new projects and help brands
            bring their ideas to life.
          </p>

          <div className={styles.contactDetails}>
            <a
              href="mailto:dushyantsolanki.dev@gmail.com"
              className={styles.contactItem}
            >
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

              dushyantsolanki.dev@gmail.com
            </a>

            <a
              href="tel:+917623057936"
              className={styles.contactItem}
            >
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

              +91 7623057936
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

              Ahmedabad, Gujarat, India
            </span>
          </div>

          <div className={styles.socials}>
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                className={styles.socialBtn}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {socialIcons[link.platform]}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-label="Contact form"
        >
          {/* Honeypot */}
          <div
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <label htmlFor="website">Website</label>

            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* NAME + EMAIL */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                className={styles.input}
                disabled={status === "loading"}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                maxLength={254}
                autoComplete="email"
                className={styles.input}
                disabled={status === "loading"}
              />
            </div>
          </div>

          {/* PROJECT TYPE + BUDGET */}
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="project-type" className="sr-only">
                Project Type
              </label>

              <select
                id="project-type"
                name="projectType"
                className={styles.select}
                defaultValue=""
                required
                disabled={status === "loading"}
              >
                <option value="" disabled>
                  Project Type
                </option>

                <option value="web-design">Web Design</option>
                <option value="web-development">
                  Web Development
                </option>
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
                name="budget"
                className={styles.select}
                defaultValue=""
                required
                disabled={status === "loading"}
              >
                <option value="" disabled>
                  Budget Range
                </option>

                <option value="5k-10k">
                  $5,000 - $10,000
                </option>

                <option value="10k-25k">
                  $10,000 - $25,000
                </option>

                <option value="25k-50k">
                  $25,000 - $50,000
                </option>

                <option value="50k+">
                  $50,000+
                </option>
              </select>
            </div>
          </div>

          {/* MESSAGE */}
          <div className={styles.formGroup}>
            <label htmlFor="message" className="sr-only">
              Tell me about your project
            </label>

            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              rows={5}
              required
              minLength={10}
              maxLength={5000}
              className={styles.textarea}
              disabled={status === "loading"}
            />
          </div>

          {/* TURNSTILE */}
          <div className={styles.turnstile}>
            <Turnstile
              siteKey={
                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
              }
              onSuccess={(token) => {
                setTurnstileToken(token);

                if (status === "error") {
                  setStatus("idle");
                }
              }}
              onExpire={() => {
                setTurnstileToken(null);
              }}
              onError={() => {
                setTurnstileToken(null);
                setStatus("error");
              }}
            />
          </div>

          {/* STATUS MESSAGE */}
          {status === "error" && (
            <p
              role="alert"
              className={styles.errorMessage}
            >
              Something went wrong. Please complete the CAPTCHA
              and try again.
            </p>
          )}

          {status === "success" && (
            <p
              role="status"
              className={styles.successMessage}
            >
              Thanks! Your message has been sent successfully.
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className={`btn btn--white-outline ${styles.submitBtn}`}
            disabled={
              status === "loading" ||
              !turnstileToken
            }
          >
            {status === "loading" ? (
              "SENDING..."
            ) : status === "success" ? (
              "MESSAGE SENT ✓"
            ) : status === "error" ? (
              "TRY AGAIN"
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