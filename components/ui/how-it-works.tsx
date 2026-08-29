"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";
import styles from "./how-it-works.module.css";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className,
  rotate,
  colors: customColors,
}: CardProps) => {
  const defaultColors = {
    orange: { bg: "#fff7ed", text: "#f97316", border: "#ffedd5" },
    blue: { bg: "#eff6ff", text: "#3b82f6", border: "#dbeafe" },
    purple: { bg: "#faf5ff", text: "#a855f7", border: "#f3e8ff" },
  };

  const activeColors = customColors || defaultColors[colorTheme];
  const rotationStyle = rotate ? { transform: rotate.includes("-") ? "rotate(-8deg)" : "rotate(8deg)" } : {};

  return (
    <div
      className={`${styles.cardWrapper} ${className || ""}`}
      style={rotationStyle}
    >
      <div className={styles.cardInner}>
        <Pin className={styles.pinIcon} style={{ color: activeColors.text }} />
        <div
          className={styles.cardContent}
          style={{
            backgroundColor: activeColors.bg,
            borderColor: activeColors.border,
          }}
        >
          <span
            className={styles.cardNumber}
            style={{ color: activeColors.text }}
          >
            {number}
          </span>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
  style?: React.CSSProperties;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: styles.pos_md_absolute, style: { "--md-top": "0px", "--md-left": "15%" } as React.CSSProperties, rotate: "rotate-8" },
  { className: styles.pos_md_absolute, style: { "--md-top": "120px", "--md-right": "15%" } as React.CSSProperties, rotate: "-rotate-8" },
  { className: styles.pos_md_absolute, style: { "--md-top": "450px", "--md-left": "15%" } as React.CSSProperties, rotate: "rotate-8" },
  { className: styles.pos_md_absolute, style: { "--md-top": "570px", "--md-right": "10%" } as React.CSSProperties, rotate: "-rotate-8" },
  { className: styles.pos_md_absolute, style: { "--md-top": "850px", "--md-left": "15%" } as React.CSSProperties, rotate: "rotate-8" },
];

export default function HowItWorks({
  features,
  className,
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Create Account",
      description: "Sign up in minutes. Enter your details and verify your email to get started.",
      colorTheme: "orange",
    },
    {
      title: "Verify Identity",
      description: "Complete your profile verification to ensure secure transactions and compliance.",
      colorTheme: "blue",
    },
    {
      title: "Select Plan",
      description: "Choose from a variety of investment plans tailored to your financial goals.",
      colorTheme: "purple",
    },
    {
      title: "Analyze & Invest",
      description: "Review returns and make your first investment with confidence.",
      colorTheme: "orange",
    },
    {
      title: "Track Growth",
      description: "Monitor your portfolio in real-time and watch your wealth grow over time.",
      colorTheme: "blue",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1130;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 450;
  else if (data.length === 3) height = 800;
  else if (data.length === 4) height = 900;
  else height = 1130;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`${styles.mainContainer} ${className || ""}`}>
        <div className={styles.bgGrid1}></div>
        <div className={styles.bgGrid2}></div>
        <div className={styles.gradientLeft}></div>
        <div className={styles.gradientRight}></div>

        <div className={styles.contentContainer}>
          <div
            className={styles.stepsContainer}
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className={styles.svgLine}
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0) return "M 290 150 C 500 150, 550 270, 710 270";
                    if (index === 1) return acc + " C 850 270, 500 350, 290 450";
                    if (index === 2) return acc + " C 290 600, 550 720, 750 720";
                    if (index === 3) return acc + " C 950 720, 500 800, 290 850";
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -140 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];
              
              // We merge the static position (top/left) with the dynamic position logic.
              // We pass down rotation logic dynamically via styles instead of Tailwind classes.
              return (
                <div 
                  key={step.title}
                  className={position.className}
                  style={position.style}
                >
                  <Card
                    number={`0${index + 1}`}
                    title={step.title}
                    description={step.description}
                    colorTheme={step.colorTheme || "blue"}
                    colors={step.colors}
                    rotate={position.rotate}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
