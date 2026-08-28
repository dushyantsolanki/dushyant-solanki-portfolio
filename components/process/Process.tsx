import { processSteps } from "@/data/content";
import { Playfair_Display } from "next/font/google";
import styles from "./Process.module.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "700"] });

function ProcessStep({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className={`${styles.step} ${isEven ? styles.stepLeft : styles.stepRight}`}>
      <div className={styles.timelineNode}>
        <div className={styles.timelineDot} />
      </div>
      <div className={styles.stepContent}>
        <span className={`${styles.stepNumber} ${playfair.className}`}>{number}</span>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDesc}>{description}</p>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section
      className={`section section--muted ${styles.section}`}
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-label" id="process-heading">
            MY PROCESS
          </h2>
        </div>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine} aria-hidden="true" />
          <div className={styles.timeline}>
            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.number}
                index={index}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
