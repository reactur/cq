import React from "react";
import styles from "./AnimatedLine.module.css";

interface AnimatedLineProps {
  width?: string;
  height?: string;
  duration?: number;
  className?: string;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  width = "100%",
  height = "4px",
  duration = 10,
  className = "",
}) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={
        {
          "--width": width,
          "--height": height,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div className={styles.lineWrapper}>
        <div className={styles.waveLine}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default AnimatedLine;
