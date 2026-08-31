import { brands } from "@/data/content";
import styles from "./TrustBrands.module.css";

/* Static imports – tree-shaken, only what we use ships to the client */
import nextdotjs from "thesvg/nextdotjs";
import react from "thesvg/react";
import nodedotjs from "thesvg/nodedotjs";
import aws from "thesvg/amazon-web-services";
import docker from "thesvg/docker";
import vercel from "thesvg/vercel";
import mongodb from "thesvg/mongodb";
import typescript from "thesvg/typescript";
import github from "thesvg/github";

type IconData = { svg: string; title: string; variants?: Record<string, string> };

const iconMap: Record<string, IconData> = {
  nextdotjs,
  react,
  nodedotjs,
  "amazon-web-services": aws,
  docker,
  vercel,
  mongodb,
  typescript,
  github,
};

function BrandLogo({ name, icon }: { name: string; icon: string }) {
  const iconData = iconMap[icon];
  if (!iconData) return null;

  /* Prefer the mono variant so the SVG respects currentColor / CSS fill */
  const svgMarkup = iconData.variants?.mono ?? iconData.svg;

  return (
    <div className={styles.brand} aria-label={name} title={name}>
      <div
        className={styles.brandIcon}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
      <span className={styles.brandLabel}>{name}</span>
    </div>
  );
}

export default function TrustBrands() {
  return (
    <section
      className={styles.section}
      aria-label="Technologies and Expertise"
    >
      <div className="container">
        <p className={styles.heading}>TECHNOLOGIES &amp; EXPERTISE</p>

        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {/* First set */}
            {brands.map((brand, index) => (
              <BrandLogo key={`brand-1-${index}`} name={brand.name} icon={brand.icon} />
            ))}
            {/* Duplicate set for seamless infinite loop */}
            {brands.map((brand, index) => (
              <BrandLogo key={`brand-2-${index}`} name={brand.name} icon={brand.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
