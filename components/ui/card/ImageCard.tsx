import Image from "next/image";
import BaseCard from "./BaseCard";
import styles from "./ImageCard.module.css";

interface ImageCardProps {
  category: string;
  title: string;
  description: string;
  image: string;
  metadata?: string;
  href?: string;
  className?: string;
}

export default function ImageCard({
  category,
  title,
  description,
  image,
  metadata,
  href,
  className = "",
}: ImageCardProps) {
  return (
    <BaseCard href={href} className={className} aria-label={title}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>
      
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {(metadata || href) && (
          <div className={styles.footer}>
            {metadata ? (
              <span className={styles.metadata}>{metadata}</span>
            ) : (
              <span /> /* spacer */
            )}
            
            {href && (
              <svg
                className={styles.arrow}
                width="20"
                height="20"
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
            )}
          </div>
        )}
      </div>
    </BaseCard>
  );
}
