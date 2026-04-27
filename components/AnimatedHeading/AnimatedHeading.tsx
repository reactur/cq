import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./AnimatedHeading.module.css";

export default function AnimatedHeading() {
  const ref = useRef(null);

  // Track scroll progress relative to the element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const springTransformation = {
    stiffness: 80,
    damping: 20,
    mass: 0.3,
  };

  // Map 0 → 1 progress to scale
  const rawScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Smooth out the scale animation with spring physics
  const scaleY = useSpring(rawScaleY, springTransformation);
  const opacity = useSpring(rawOpacity, springTransformation);

  return (
    <div ref={ref} className={styles.scrollWrapper}>
      <div className={styles.bottomTextContainer}>
        <motion.h2 style={{ opacity, scaleY }} className={styles.heading}>
          Crayon and Quill
        </motion.h2>
        {/* <motion.div style={{ opacity, scaleY }} className={styles.heading}>
          <TextHoverEffect text="Crayon and Quill" />
        </motion.div> */}
      </div>
    </div>
  );
}
