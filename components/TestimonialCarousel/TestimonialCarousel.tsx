import { TestimonialType } from "@/utils/types";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Testimonial from "../Testimonial/Testimonial";
import styles from "./TestimonialCarousel.module.css";

const TestimonialCarousel: React.FC<{
  testimonials: TestimonialType[];
  speed?: number;
}> = ({ testimonials, speed = 30 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalWidth = testimonials.length * 420; // ~width per card

  // track scroll position of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // map scrollYProgress (0 → 1) into a "playhead" for animation
  const playhead = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const smoothPlayhead = useSpring(playhead, { stiffness: 60, damping: 20 });

  // convert playhead into x translation
  const x = useTransform(smoothPlayhead, (v) => -v * totalWidth);

  return (
    <div className={styles.carouselWrapper} ref={containerRef}>
      <motion.div className={styles.testimonialsInner} style={{ x }}>
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            scrollYProgress={scrollYProgress}
            testimonial={testimonial}
            testimonialIndex={index}
            animated={index == 0}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialCarousel;
