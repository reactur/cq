"use client";

import { motion, MotionValue } from "framer-motion";
import React, { CSSProperties, useEffect, useState } from "react";
import styles from "./SegmentedCircle.module.css";

type SegmentedCircleProps = {
  parts?: number;
  gap?: number; // gap in degrees
  size?: number; // px diameter
  thickness?: number; // fraction of radius (0–1)
  colors?: string[];
  onSegmentClick?: (index: number) => void;
  className?: string; // optional class for SVG
  style?: CSSProperties; // optional inline styles
  activeIndex?: number;
  rotation?: MotionValue<number>;
};

const defaultColors = [
  "#B71C1C",
  "#FF8F00",
  "#2E7D32",
  "#1565C0",
  "#6A1B9A",
  "#FF6F00",
  "#00838F",
];

// const defaultColors = [
//   "#ffffff",
//   "#ffffff",
//   "#ffffff",
//   "#ffffff",
//   "#ffffff",
//   "#ffffff",
//   "#ffffff",
// ];
const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const arcPath = (
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) => {
  const p1 = polarToCartesian(cx, cy, outerR, startAngle);
  const p2 = polarToCartesian(cx, cy, outerR, endAngle);
  const p3 = polarToCartesian(cx, cy, innerR, endAngle);
  const p4 = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${p1.x} ${p1.y}
    A ${outerR} ${outerR} 0 ${largeArc} 1 ${p2.x} ${p2.y}
    L ${p3.x} ${p3.y}
    A ${innerR} ${innerR} 0 ${largeArc} 0 ${p4.x} ${p4.y}
    Z
  `;
};

const SegmentedCircle: React.FC<SegmentedCircleProps> = ({
  parts = 7,
  gap = 6,
  size = 300,
  thickness = 0.05,
  colors = defaultColors,
  activeIndex,
  onSegmentClick,
  className = "",
  style = {},
  rotation,
}) => {
  const [selected, setSelected] = useState<number | null>(activeIndex ?? null);

  useEffect(() => {
    setSelected(activeIndex ?? null);
  }, [activeIndex]);

  const handleSegmentClick = (index: number) => {
    const newSelected = selected === index ? null : index;
    setSelected(newSelected);
    onSegmentClick?.(newSelected !== null ? newSelected : -1);
  };

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2;
  const innerR = outerR * (1 - thickness);
  const slice = 360 / parts;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${styles.circle} ${className}`}
      style={{
        rotate: rotation, // now works because motion.svg supports MotionValue
        ...style,
      }}
    >
      {Array.from({ length: parts }).map((_, i) => {
        const start = i * slice + gap / 2;
        const end = (i + 1) * slice - gap / 2;
        const path = arcPath(cx, cy, innerR, outerR, start, end);

        return (
          <path
            key={i}
            d={path}
            fill={selected === i ? colors[i % colors.length] : "white"}
            className={`${styles.slice} ${
              selected === i
                ? styles.active
                : selected !== null
                ? styles.inactive
                : ""
            }`}
            onClick={() => handleSegmentClick(i)}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              color: selected === i ? colors[i % colors.length] : "white",
            }}
          />
        );
      })}
    </motion.svg>
  );
};

export default SegmentedCircle;
