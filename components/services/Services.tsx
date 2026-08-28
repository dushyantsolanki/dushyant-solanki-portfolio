"use client";

import { useState } from "react";
import { services } from "@/data/content";
import styles from "./Services.module.css";

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="section"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-label" id="services-heading">
            SERVICES
          </h2>
        </div>

        <div className={styles.accordionContainer}>
          {services.map((service, idx) => {
            const isOpen = openIndex === idx;
            const number = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={service.title}
                className={`${styles.accordionItem} ${isOpen ? styles.open : ""}`}
              >
                <button
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`service-desc-${idx}`}
                >
                  <span className={styles.number}>{number}</span>
                  <h3 className={styles.title}>{service.title}</h3>
                  <div className={styles.iconWrapper}>
                    <svg
                      className={styles.plusIcon}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line className={styles.horizontalLine} x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </button>
                
                <div
                  id={`service-desc-${idx}`}
                  className={styles.accordionContent}
                  role="region"
                >
                  <div className={styles.accordionContentInner}>
                    <p className={styles.description}>{service.description}</p>
                    <a href="#" className={styles.learnMore}>
                      LEARN MORE
                      <svg
                        className="arrow"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
