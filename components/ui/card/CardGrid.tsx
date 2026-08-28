import { ReactNode } from "react";
import styles from "./CardGrid.module.css";

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function CardGrid({ children, columns = 3, className = "" }: CardGridProps) {
  let gridClass = styles.grid3Col;
  
  if (columns === 2) gridClass = styles.grid2Col;
  if (columns === 4) gridClass = styles.grid;

  return (
    <div className={`${styles.grid} ${gridClass} ${className}`}>
      {children}
    </div>
  );
}
