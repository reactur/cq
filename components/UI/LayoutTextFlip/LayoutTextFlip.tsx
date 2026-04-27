"use client";
import React, { useState, useEffect } from "react";
import styles from "./LayoutTextFlip.module.css";
import { motion, AnimatePresence } from "framer-motion";

const LayoutTextFlip: React.FC<{
  text: string;
  words: string[];
  textIndex?: number;
}> = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  textIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(textIndex ?? 0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  //   }, duration);

  //   return () => clearInterval(interval);
  // }, [words.length, duration]);

  useEffect(() => {
    setCurrentIndex(textIndex ?? 0);
  }, [textIndex]);

  return (
    <>
      <motion.span layoutId="subtext" className={styles.subtext}>
        {text}
      </motion.span>

      <motion.span layout className={styles.wordWrapper}>
        <AnimatePresence mode="popLayout">
          <motion.h2
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.word}
          >
            {words[currentIndex]}
          </motion.h2>
        </AnimatePresence>
      </motion.span>
    </>
  );
};

export default LayoutTextFlip;
