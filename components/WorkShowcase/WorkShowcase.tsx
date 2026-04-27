import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./WorkShowcase.module.css";
import Image from "next/image";
import FullBgCard from "../UI/FullBgCard/FullBgCard";

interface WorkShowcaseProps {
  images: string[];
}

const WorkShowcase = ({ images }: WorkShowcaseProps) => {
  const workSectionRef = useRef<HTMLDivElement>(null);
  const circleSegments = 2;

  const { scrollYProgress } = useScroll({
    target: workSectionRef,
    offset: ["start start", "end end"],
  });

  const [activeSegment, setActiveSegment] = useState(0);

  // Track scroll and update active segment
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const stepSize = 1 / circleSegments;
      const newIndex = Math.min(
        circleSegments - 1,
        Math.floor(latest / stepSize)
      );
      setActiveSegment(newIndex);
    });
  }, [scrollYProgress, circleSegments]);

  return (
    <section ref={workSectionRef} className={styles.section}>
      {/* <FullBgCard imgLink={images[activeSegment]} /> */}
      {/* <FullBgCard imgLink={images[0]} key={0} />
      <FullBgCard imgLink={images[1]} key={1} />
      <FullBgCard imgLink={images[2]} key={2} /> */}
      {/* <FullBgCard imgLink={images[1]} /> */}
      {/* <div className={styles.outerFrame}>
        <Image
          src={images[0]}
          alt="Background"
          fill
          className={styles.backgroundImage}
          priority
        />
        <div className={styles.centerImageWrapper}>
          <Image
            src={images[0]}
            alt="Center"
            width={300} // adjust portrait size
            height={450} // adjust portrait size
            className={styles.centerImage}
          />
        </div>
        <div className={styles.projectDetailsContainer}>
          <h2>Dark Ocean</h2>
          <p>Immersive Underwater Journey</p>
        </div>
      </div> */}
    </section>
  );
};

export default WorkShowcase;
