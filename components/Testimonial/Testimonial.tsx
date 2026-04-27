import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import styles from "./Testimonial.module.css";
import { TestimonialType } from "@/utils/types";

const Testimonial: React.FC<{
  testimonialIndex: number;
  testimonial: TestimonialType;
  animated?: boolean;
  scrollYProgress: MotionValue<number>;
}> = ({ testimonial, testimonialIndex, animated, scrollYProgress }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const animationPoints = [0.2, 0.3];

  //   const { scrollYProgress } =  useScroll({
  //     target: sectionRef,
  //     offset: ["start end", "end start"],
  //   });

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };

  // Animate properties with scroll
  const background = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["#00ffef", "#202020"]
  );
  const borderRadiusRaw = useTransform(
    scrollYProgress,
    animationPoints,
    [0, 32]
  );
  const widthRaw = useTransform(scrollYProgress, animationPoints, [
    "100rem",
    "40rem",
  ]);

  //const background = useSpring(backgroundRaw, springConfig);
  const borderRadius = useSpring(borderRadiusRaw, springConfig);
  const width = useSpring(widthRaw, springConfig);

  const getTestimonialContainer = () => {
    const testimonialItem = (
      <>
        <div className={styles.left}>
          <div className={styles.userDetailsContainer}>
            <Image
              src={`/images/reviewers/user${testimonialIndex + 1}.jpg`}
              alt={testimonial.name}
              width={80}
              height={80}
              className={styles.avatar}
            />
            <div className={styles.designationContainer}>
              <h3 className={styles.name}>{testimonial.name}</h3>
              <p className={styles.role}>{testimonial.role}</p>
            </div>
          </div>
          <div className={styles.divider} />
        </div>

        <div className={styles.right}>
          <p className={styles.text}>{testimonial.message}</p>
          <div className={styles.rating}>
            <span>{testimonial.rating}/5</span>
            <Star size={20} fill="#00ffef" color="var(--primary-blue)" />
          </div>
        </div>
      </>
    );

    if (animated) {
      return (
        <motion.div
          className={`${styles.wrapper} ${styles.animated}`}
          style={{
            background,
            borderRadius,
            width,
          }}
        >
          {testimonialItem}
        </motion.div>
      );
    }

    return <div className={styles.wrapper}>{testimonialItem}</div>;
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      {getTestimonialContainer()}
    </section>
  );
};

export default Testimonial;
