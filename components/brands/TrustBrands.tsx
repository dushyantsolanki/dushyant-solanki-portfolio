import { brands } from "@/data/content";
import styles from "./TrustBrands.module.css";

function BrandLogo({ name }: { name: string }) {
  return (
    <div className={styles.brand} aria-label={name}>
      <span className={styles.brandText}>{name}</span>
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
        <p className={styles.heading}>TECHNOLOGIES & EXPERTISE</p>

        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            {/* First set */}
            {brands.map((brand, index) => (
              <BrandLogo key={`brand-1-${index}`} name={brand.name} />
            ))}
            {/* Duplicate set for seamless infinite loop */}
            {brands.map((brand, index) => (
              <BrandLogo key={`brand-2-${index}`} name={brand.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
