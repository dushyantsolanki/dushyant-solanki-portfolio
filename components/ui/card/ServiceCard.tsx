import { ReactNode } from "react";
import BaseCard from "./BaseCard";
import styles from "./ServiceCard.module.css";

interface ServiceCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  className = "",
}: ServiceCardProps) {
  return (
    <BaseCard className={className}>
      <div className={styles.content}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </BaseCard>
  );
}
