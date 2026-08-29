import { processSteps } from "@/data/content";
import styles from "./Process.module.css";
import HowItWorks from "@/components/ui/how-it-works";

export default function Process() {
  // Map your existing process data into the format HowItWorks expects
  const howItWorksFeatures = processSteps.map((step, index) => {
    // Cycle through the available color themes for each step
    const themes: ("orange" | "blue" | "purple")[] = ["orange", "blue", "purple"];
    const colorTheme = themes[index % themes.length];
    
    return {
      title: step.title,
      description: step.description,
      colorTheme,
    };
  });

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

        <div style={{ marginTop: "2rem" }}>
          <HowItWorks features={howItWorksFeatures} />
        </div>
      </div>
    </section>
  );
}
