import { ReactNode } from "react";
import styles from "./BaseCard.module.css";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "light" | "dark";
  "aria-label"?: string;
}

export default function BaseCard({ 
  children, 
  className = "", 
  href, 
  variant = "light",
  "aria-label": ariaLabel 
}: BaseCardProps) {
  const combinedClassName = `${styles.card} ${variant === "dark" ? styles.darkCard : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <div className={combinedClassName} aria-label={ariaLabel}>
      {children}
    </div>
  );
}
