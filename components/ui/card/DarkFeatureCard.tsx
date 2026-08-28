import BaseCard from "./BaseCard";
import styles from "./DarkFeatureCard.module.css";

interface DarkFeatureCardProps {
  headline: string;
  description?: string;
  ctaText?: string;
  href?: string;
  className?: string;
}

export default function DarkFeatureCard({
  headline,
  description,
  ctaText,
  href,
  className = "",
}: DarkFeatureCardProps) {
  return (
    <BaseCard variant="dark" className={className}>
      <div className={styles.darkContent}>
        <h2 className={styles.headline}>{headline}</h2>
        
        {description && (
          <p className={styles.description}>{description}</p>
        )}
        
        {href && ctaText && (
          <a href={href} className={styles.cta}>
            {ctaText}
          </a>
        )}
      </div>
    </BaseCard>
  );
}
