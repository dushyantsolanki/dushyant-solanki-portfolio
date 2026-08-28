"use client";

import { useState, useEffect } from "react";
import styles from "./Typewriter.module.css";

export default function Typewriter({ words }: { words: string[] }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const delayAfterWord = 2000;

    const handleType = () => {
      const fullWord = words[currentWordIndex];
      
      if (isDeleting) {
        setCurrentText(fullWord.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullWord.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullWord) {
        setTimeout(() => setIsDeleting(true), delayAfterWord);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    // Fast pause before starting next word
    let nextTick = typeSpeed;
    if (isDeleting && currentText === "") {
        nextTick = 400; 
    }
    
    const timer = setTimeout(handleType, nextTick);
    
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={styles.typewriter}>
      {currentText}
      <span className={styles.cursor} aria-hidden="true">|</span>
    </span>
  );
}
