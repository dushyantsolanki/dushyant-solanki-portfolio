import Image from "next/image";
import BaseCard from "./BaseCard";
import imageStyles from "./ImageCard.module.css"; // Reuse some typography
import styles from "./FeaturedCard.module.css";

interface FeaturedCardProps {
  category: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
}

export default function FeaturedCard({
  category,
  title,
  description,
  image,
  href,
  className = "",
}: FeaturedCardProps) {
  return (
    <BaseCard href={href} className={className} aria-label={title}>
      <div className={styles.horizontalContent}>
        <div className={styles.horizontalImageWrapper}>
          <Image
            src={image}
            alt={title}
            fill
            className={imageStyles.image}
            sizes="(max-width: 1023px) 100vw, 55vw"
          />
        </div>
        
        <div className={styles.textContent}>
          <span className={imageStyles.category}>{category}</span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          
          {href && (
            <div className={styles.explore}>
              EXPLORE
              <svg
                className={styles.arrow}
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
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
